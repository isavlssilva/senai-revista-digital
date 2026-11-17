export const IMAGE_UPLOAD_LIMIT_BYTES = 10 * 1024 * 1024;
export const VIDEO_UPLOAD_LIMIT_BYTES = 100 * 1024 * 1024;

export type MediaKind = "image" | "video";

export type UploadProgressCallback = (progress: number) => void;

export function createMediaUploadRequest(
  file: File,
  kind: MediaKind,
  onProgress?: UploadProgressCallback,
  signal?: AbortSignal,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const endpoint = process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT;

    if (!endpoint) {
      reject(
        new Error(
          "Serviço de upload não configurado. Defina NEXT_PUBLIC_UPLOAD_ENDPOINT no ambiente.",
        ),
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("kind", kind);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.min(100, Math.round((event.loaded / event.total) * 100));
        onProgress(progress);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const payload = JSON.parse(xhr.responseText) as { url?: string };
          if (!payload.url) {
            throw new Error("A resposta do upload não retornou uma URL válida.");
          }
          resolve(payload.url);
          return;
        } catch {
          reject(new Error("Resposta inválida do servidor de upload."));
          return;
        }
      }

      reject(new Error(xhr.responseText || "Falha ao enviar o arquivo."));
    };

    xhr.onerror = () => reject(new Error("Falha ao conectar ao servidor de upload."));
    xhr.onabort = () => reject(new DOMException("Upload cancelado.", "AbortError"));

    if (signal) {
      if (signal.aborted) {
        xhr.abort();
        return;
      }

      const abortHandler = () => {
        xhr.abort();
      };

      signal.addEventListener("abort", abortHandler, { once: true });
    }

    xhr.send(formData);
  });
}

export async function uploadMediaFile(
  file: File,
  kind: MediaKind,
  onProgress?: UploadProgressCallback,
  signal?: AbortSignal,
): Promise<string> {
  return createMediaUploadRequest(file, kind, onProgress, signal);
}
