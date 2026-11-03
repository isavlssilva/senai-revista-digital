import { Send } from "lucide-react";

type ContactFormProps = {
  onSubmitSuccess: (message: string) => void;
};

export default function ContactForm({ onSubmitSuccess }: ContactFormProps) {
  return (
    <div className="bg-[#18181B] p-6 rounded-3xl border border-zinc-800 space-y-4">
      <h3 className="text-base font-bold text-white">Fale com a gente</h3>
      <p className="text-xs text-zinc-400">
        Tem sugestões, dúvidas ou quer compartilhar uma história? Entre em
        contato com a nossa equipe.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitSuccess("Sua mensagem foi enviada!");
        }}
        className="space-y-3 text-xs"
      >
        <div>
          <label className="block text-zinc-400 font-medium mb-1">
            Seu Nome
          </label>
          <input
            type="text"
            required
            placeholder="Digite seu nome..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E51937]"
          />
        </div>
        <div>
          <label className="block text-zinc-400 font-medium mb-1">E-mail</label>
          <input
            type="email"
            required
            placeholder="seu.email@exemplo.com"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E51937]"
          />
        </div>
        <div>
          <label className="block text-zinc-400 font-medium mb-1">
            Mensagem
          </label>
          <textarea
            rows={3}
            required
            placeholder="Escreva sua mensagem aqui..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E51937]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2.5 bg-[#E51937] hover:bg-red-700 font-bold text-white rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-3.5 h-3.5" /> Enviar mensagem
        </button>
      </form>
    </div>
  );
}
