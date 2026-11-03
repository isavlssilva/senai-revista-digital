type SenaMascotProps = {
  className?: string;
  glow?: boolean;
};

export default function SenaMascot({
  className = "w-8 h-8",
  glow = true,
}: SenaMascotProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {glow && (
        <div
          className="absolute inset-0 bg-red-600/40 blur-md animate-pulse"
          style={{ borderRadius: 0 }}
        />
      )}
      <div
        className="relative bg-gradient-to-br from-[#E51937] to-[#990B1E] p-1.5 flex items-center justify-center shadow-lg overflow-hidden border-0"
        style={{ borderRadius: 0 }}
      >
        <img
          src="/img/favicon.ico"
          alt="SENAI Revista Digital"
          className="w-full h-full object-cover"
          style={{ borderRadius: 0 }}
        />
      </div>
    </div>
  );
}
