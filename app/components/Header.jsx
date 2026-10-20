import { Menu, Search, Bell, ChevronDown } from "lucide-react";

export default function Header({ onOpenMenu }) {
  return (
    <header className="sticky top-0 z-30 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Lado Esquerdo: Botão Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenMenu}
            className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
            title="Abrir Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-[#E3262E] rounded-lg flex items-center justify-center font-bold italic text-white text-sm">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-wider text-sm leading-none">
                SENAI
              </span>
              <span className="text-[10px] text-zinc-400 font-medium leading-none">
                REVISTA DIGITAL
              </span>
            </div>
          </div>
        </div>

        {/* Centro: Links de Navegação (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#" className="text-white border-b-2 border-[#E3262E] pb-1">
            Início
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Notícias
          </a>
          <button className="flex items-center gap-1 hover:text-white transition-colors">
            Categorias <ChevronDown className="w-4 h-4" />
          </button>
          <a href="#" className="hover:text-white transition-colors">
            Sobre
          </a>
        </nav>

        {/* Lado Direito: Ações (Busca e Notificações) */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E3262E] rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
