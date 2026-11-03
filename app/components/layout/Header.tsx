"use client";

import { Search, Bell, Menu } from "lucide-react";
import SenaMascot from "../ui/SenaMascot";

type HeaderProps = {
  activeTab: string;
  isSearchExpanded: boolean;
  searchQuery: string;
  notificationsOpen: boolean;
  setActiveTab?: (value: string) => void;
  setIsDrawerOpen?: (value: boolean) => void;
  setSearchQuery?: (value: string) => void;
  setIsSearchExpanded?: (value: boolean) => void;
  setNotificationsOpen?: (value: boolean) => void;
  showSplash?: boolean;
  setShowSplash?: (value: boolean) => void;
  onOpenMenu?: () => void;
  onNavigate?: (tab: string) => void;
  onToggleSearch?: () => void;
  onToggleNotifications?: () => void;
  onSearchChange?: (value: string) => void;
  onResetSplash?: () => void;
};

const navItems = [
  { id: "home", label: "Início" },
  { id: "noticias", label: "Notícias" },
  { id: "categorias", label: "Categorias" },
  { id: "sobre", label: "Sobre Nós" },
  { id: "admin", label: "Painel Admin" },
];

export default function Header({
  activeTab,
  isSearchExpanded,
  searchQuery,
  notificationsOpen,
  setActiveTab,
  setIsDrawerOpen,
  setSearchQuery,
  setIsSearchExpanded,
  setNotificationsOpen,
  setShowSplash,
  onOpenMenu,
  onNavigate,
  onToggleSearch,
  onToggleNotifications,
  onSearchChange,
  onResetSplash,
}: HeaderProps) {
  const handleNavigate = (tab: string) => {
    setActiveTab?.(tab);
    onNavigate?.(tab);
    if (tab === "categorias") setActiveTab?.("categorias");
  };

  const handleOpenMenu = () => {
    setIsDrawerOpen?.(true);
    onOpenMenu?.();
  };

  const handleToggleSearch = () => {
    setIsSearchExpanded?.(!isSearchExpanded);
    onToggleSearch?.();
  };

  const handleToggleNotifications = () => {
    setNotificationsOpen?.(!notificationsOpen);
    onToggleNotifications?.();
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0D0D0D]/90 backdrop-blur-md px-0 md:px-2 py-3 transition-all border-0">
      <div
        className="w-full flex items-center justify-between gap-4 px-3 md:px-4"
        style={{ maxWidth: "100%", margin: 0 }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={handleOpenMenu}
            className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#E51937]"
            title="Abrir Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <SenaMascot className="w-9 h-9" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-extrabold tracking-tight text-white text-lg leading-none group-hover:text-[#E51937] transition-colors">
                  SENAI
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-zinc-400 font-semibold uppercase leading-tight">
                REVISTA DIGITAL
              </span>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1 rounded-xl border border-zinc-800/50">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleNavigate(tab.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                activeTab === tab.id
                  ? "text-white bg-[#E51937] shadow-md shadow-red-900/30"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className={`relative flex items-center transition-all ${isSearchExpanded ? "w-48 md:w-64" : "w-9 md:w-9"}`}
          >
            <button
              onClick={handleToggleSearch}
              className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800/60 transition-colors z-10"
              title="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
            {isSearchExpanded && (
              <input
                type="text"
                placeholder="Buscar na revista..."
                value={searchQuery}
                onChange={(e) => setSearchQuery?.(e.target.value)}
                autoFocus
                className="absolute inset-0 pl-9 pr-3 bg-zinc-900 text-white text-xs rounded-xl border border-zinc-700 focus:outline-none focus:border-[#E51937] transition-all"
              />
            )}
          </div>

          <div className="relative">
            <button
              onClick={handleToggleNotifications}
              className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800/60 transition-colors relative"
              title="Notificações"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E51937] rounded-full ring-2 ring-[#0D0D0D] animate-pulse"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#18181B] border border-zinc-700/80 rounded-2xl shadow-2xl p-4 z-40 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="font-semibold text-sm text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#E51937]" /> Notificações
                  </span>
                  <span className="text-[10px] bg-red-500/20 text-[#E51937] px-2 py-0.5 rounded-full font-bold">
                    2 Novas
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="p-2.5 bg-zinc-900/80 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer">
                    <p className="font-medium text-white">
                      Nova matéria publicada!
                    </p>
                    <p className="text-zinc-400 text-[11px] mt-0.5">
                      Tecnologia e inovação que transformam o futuro.
                    </p>
                    <span className="text-[9px] text-zinc-500 mt-1 block">
                      Há 10 minutos
                    </span>
                  </div>
                  <div className="p-2.5 bg-zinc-900/80 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer">
                    <p className="font-medium text-white">
                      Quiz de interesse atualizado
                    </p>
                    <p className="text-zinc-400 text-[11px] mt-0.5">
                      Responda para receber recomendações de projetos.
                    </p>
                    <span className="text-[9px] text-zinc-500 mt-1 block">
                      Há 1 hora
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowSplash?.(true)}
            className="hidden lg:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
            title="Visualizar Tela Splash"
          >
            <span className="w-2 h-2 rounded-full bg-[#E51937] inline-block" />{" "}
            Splash
          </button>
        </div>
      </div>
    </header>
  );
}
