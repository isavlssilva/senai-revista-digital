import { CheckCircle2 } from "lucide-react";

type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white border border-[#E51937] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
      <CheckCircle2 className="w-5 h-5 text-[#E51937]" />
      <span className="text-xs font-semibold">{message}</span>
    </div>
  );
}
