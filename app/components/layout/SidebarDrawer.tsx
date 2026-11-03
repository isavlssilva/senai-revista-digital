"use client";

import {
  X,
  User,
  BookOpen,
  Flame,
  Bookmark,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  Accessibility,
  LogOut,
  ChevronRight,
} from "lucide-react";
import SenaMascot from "../ui/SenaMascot";

type SidebarDrawerProps = {
  isOpen: boolean;
  activeTab: string;
  onClose: () => void;
  onNavigate: (tab: string) => void;
  onToggleNotifications: () => void;
  onToast: (message: string) => void;
  onCategorySelect: (category: string) => void;
};

export default function SidebarDrawer({
  isOpen,
  activeTab,
  onClose,
  onNavigate,
  onToggleNotifications,
  onToast,
  onCategorySelect,
}: SidebarDrawerProps) {
  if (!isOpen) return null;

  const menuItems = [
    {
      icon: BookOpen,
      label: "Início",
      action: () => {
        onNavigate("home");
        onClose();
      },
    },
    {
      icon: Flame,
      label: "Em alta",
      action: () => {
        onNavigate("home");
        onClose();
      },
    },
    {
      icon: Bookmark,
      label: "Salvos",
      action: () => {
        onToast("Abrindo seus artigos salvos");
        onClose();
      },
    },
    {
      icon: MessageSquare,
      label: "Entre em contato",
      action: () => {
        onNavigate("sobre");
        onClose();
      },
    },
    {
      icon: Bell,
      label: "Notificações",
      action: () => {
        onToggleNotifications();
        onClose();
      },
    },
  ];

  const categories = [
    "Projetos de extensão",
    "Tecnologias",
    "Banners",
    "Artigos",
    "Veja mais",
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="relative w-80 max-w-full bg-[#18181B] border-r border-zinc-800 h-full flex flex-col justify-between shadow-2xl z-10 overflow-y-auto animate-in slide-in-from-left duration-300 p-5">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <SenaMascot className="w-8 h-8" />
              <span className="font-bold text-white text-base">
                SENAI Revista
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="my-5 p-4 bg-zinc-900/90 rounded-2xl border border-zinc-800/80 flex flex-col items-center text-center">
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E51937] to-red-800 p-0.5 shadow-lg shadow-red-900/30">
                <img
                  src="/img/avatar.svg"
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-zinc-900"></div>
            </div>
            <h3 className="font-bold text-white text-sm">Isabelle Souza</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Curso: Eletrônica - SENAI SP
            </p>
            <span className="text-[10px] bg-red-500/10 text-[#E51937] px-2 py-0.5 rounded-full font-semibold mt-1">
              OUTRO - SP / SÃO PAULO
            </span>

            <button
              onClick={() => {
                onClose();
                onNavigate("admin");
              }}
              className="mt-3 w-full py-1.5 text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors border border-zinc-700/50"
            >
              VER SEU PERFIL
            </button>
          </div>

          <div className="space-y-1">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all"
              >
                <item.icon className="w-4 h-4 text-zinc-400" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800">
            <span className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase px-3 block mb-2">
              CATEGORIAS
            </span>
            <div className="space-y-1">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onCategorySelect(cat.split(" ")[0]);
                    onNavigate("home");
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E51937]"></span>
                    {cat}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => {
                onToast("Redirecionando para login do SENAI...");
                onClose();
              }}
              className="w-full py-2.5 bg-[#E51937] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" /> ENTRAR / CADASTRAR
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800 space-y-1">
          {[
            { icon: Settings, label: "Configurações" },
            { icon: HelpCircle, label: "Ajuda" },
            { icon: Accessibility, label: "Acessibilidade" },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => onToast(`Abrindo ${item.label}...`)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/40"
            >
              <item.icon className="w-4 h-4 text-zinc-500" />
              <span>{item.label}</span>
            </button>
          ))}

          <button
            onClick={() => {
              onToast("Sessão encerrada.");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#E51937] hover:bg-red-950/30 mt-2 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}
