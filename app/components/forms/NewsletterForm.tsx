type NewsletterFormProps = {
  onSubmitSuccess: (message: string) => void;
};

export default function NewsletterForm({
  onSubmitSuccess,
}: NewsletterFormProps) {
  return (
    <div className="bg-[#18181B] p-6 rounded-3xl border border-zinc-800 flex flex-col justify-between space-y-4">
      <div>
        <h3 className="text-base font-bold text-white">Receba novidades</h3>
        <p className="text-xs text-zinc-400 mt-1">
          Assine nossa newsletter e fique por dentro das principais notícias e
          lançamentos tecnológicos do SENAI.
        </p>

        <div className="mt-6 space-y-3">
          <input
            type="email"
            placeholder="Seu e-mail profissional"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E51937]"
          />
          <button
            onClick={() =>
              onSubmitSuccess("Inscrição realizada na newsletter!")
            }
            className="w-full py-2.5 bg-[#E51937] hover:bg-red-700 font-bold text-xs text-white rounded-xl transition-colors"
          >
            Assinar Revista
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-800 text-[11px] text-zinc-500 text-center">
        © 2026 SENAI - Todos os direitos reservados.
      </div>
    </div>
  );
}
