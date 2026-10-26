export default function Preloader() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D0D]"
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        border: 0,
        borderRadius: 0,
        overflow: "hidden",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E3262E]/25 via-transparent to-transparent blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center animate-pulse px-4 text-center">
        <div
          className="w-[220px] h-[140px] sm:w-[260px] sm:h-[160px] bg-[#121212] p-0 shadow-2xl shadow-[#E3262E]/30 flex items-center justify-center overflow-hidden"
          style={{
            borderRadius: 0,
            border: 0,
            boxShadow: "none",
          }}
        >
          <img
            src="/img/favicon.ico"
            alt="SENAI Revista Digital"
            className="w-full h-full object-contain bg-white/5"
            style={{ borderRadius: 0, display: "block" }}
          />
        </div>

        <p className="mt-6 text-zinc-400 text-sm font-medium tracking-wide">
          Carregando a Revista...
        </p>
      </div>
    </div>
  );
}
