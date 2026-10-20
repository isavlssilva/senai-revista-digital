import { useEffect } from "react";

export default function Preloader({ onFinish }) {
  useEffect(() => {
    // Simula o tempo de carregamento de 2.5 segundos antes de sumir
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D0D]">
      {/* Luz Radial Vermelha no Fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E3262E]/25 via-transparent to-transparent blur-2xl pointer-events-none" />

      {/* Cartão Central com Logo SENAI */}
      <div className="relative z-10 flex flex-col items-center animate-pulse">
        <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-b from-[#FF4D4D] to-[#D31018] rounded-3xl p-6 shadow-2xl shadow-[#E3262E]/30 flex flex-col items-center justify-between">
          <img
            src="/img/favicon.ico"
            alt="SENAI Revista Digital"
            className="w-[120px] h-[70px] sm:w-[140px] sm:h-[82px] object-contain bg-white/10 p-2"
            style={{ borderRadius: 0 }}
          />
          <div className="text-center mt-2">
            <h1 className="text-white font-black italic text-2xl tracking-wider">
              SENAI
            </h1>
            <p className="text-white/90 text-xs font-semibold tracking-widest uppercase">
              Revista Digital
            </p>
          </div>

          {/* Elemento de iluminação central/mascote */}
          <div className="flex gap-2 mb-4">
            <div className="w-5 h-8 bg-white/90 rounded-full rotate-[-12deg]" />
            <div className="w-5 h-8 bg-white/90 rounded-full rotate-[12deg]" />
          </div>
        </div>

        <p className="mt-6 text-zinc-400 text-sm font-medium tracking-wide">
          Carregando a Revista...
        </p>
      </div>
    </div>
  );
}
