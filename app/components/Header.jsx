"use client";

import { Menu, Search, Bell, ChevronDown } from "lucide-react";

// 📍 ONDE ALTERAR: ajuste os itens do menu principal do topo e os textos visíveis.
const navItems = [
  { id: "home", label: "Início" },
  { id: "noticias", label: "Notícias" },
  { id: "categorias", label: "Categorias" },
  { id: "sobre", label: "Sobre" },
];

export default function Header({
  onOpenMenu,
  onNavigate,
  activeTab = "home",
  onToggleSearch,
  onToggleNotifications,
}) {
  // 📍 ONDE ALTERAR: se quiser trocar o comportamento do botão de busca/notificações,
  // edite as props passadas pelo componente pai (App / page) sem mexer na estrutura do layout.
  return (
    <header className="sticky top-0 z-30 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* 📍 ONDE ALTERAR: aqui está o gatilho do menu lateral. */}
          <button
            type="button"
            onClick={onOpenMenu}
            className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E3262E]"
            title="Abrir Menu"
            aria-label="Abrir menu lateral"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* 📍 ONDE ALTERAR: logotipo e texto principal do projeto. */}
          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90"
            aria-label="Voltar para a página inicial"
          >
            <div className="w-8 h-8 bg-[#E3262E] rounded-lg flex items-center justify-center font-bold italic text-white text-sm">
              S
            </div>
            <div className="flex flex-col text-left">
              <span className="text-white font-bold tracking-wider text-sm leading-none">
                SENAI
              </span>
              <span className="text-[10px] text-zinc-400 font-medium leading-none">
                REVISTA DIGITAL
              </span>
            </div>
          </button>
        </div>

        {/* 📍 ONDE ALTERAR: navegação principal do topo; aqui o estado ativo é calculado com activeTab. */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          {navItems.map(({ id, label }) => {
            const isActive = activeTab === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate?.(id)}
                className={[
                  "transition-colors",
                  isActive
                    ? "text-white border-b-2 border-[#E3262E] pb-1"
                    : "hover:text-white",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </button>
            );
          })}

          <button
            type="button"
            className="flex items-center gap-1 hover:text-white transition-colors"
            onClick={() => onNavigate?.("categorias")}
          >
            Categorias <ChevronDown className="w-4 h-4" />
          </button>
        </nav>

        <div className="flex items-center gap-2">
          {/* 📍 ONDE ALTERAR: botão de busca. Se quiser ação real, passe onToggleSearch do componente pai. */}
          <button
            type="button"
            onClick={onToggleSearch}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E3262E]"
            aria-label="Buscar na revista"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* 📍 ONDE ALTERAR: botão de notificações. A lógica pode ser customizada no App. */}
          <button
            type="button"
            onClick={onToggleNotifications}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-[#E3262E]"
            aria-label="Abrir notificações"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E3262E] rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
