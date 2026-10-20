import {
  X,
  User,
  Home,
  TrendingUp,
  Bookmark,
  Mail,
  Bell,
  Folder,
  LogOut,
  Settings,
  HelpCircle,
  Eye,
} from "lucide-react";

export default function SidebarDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Fundo escurecido (clique para fechar) */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Painel do Menu Lateral */}
      <aside className="relative z-10 w-80 max-w-[85vw] bg-[#141414] border-r border-zinc-800 h-full flex flex-col justify-between overflow-y-auto p-5 text-zinc-300">
        <div>
          {/* Cabeçalho do Drawer: Usuário */}
          <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#E3262E] rounded-full flex items-center justify-center text-white font-bold">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">
                  Nome do usuário
                </h3>
                <p className="text-xs text-zinc-500">Outro - UF/Cidade-UF</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button className="w-full mt-4 bg-zinc-800/80 hover:bg-zinc-800 text-xs font-semibold py-2 px-3 rounded-lg text-zinc-300 flex items-center justify-between transition-colors">
            <span>VER SEU PERFIL</span>
            <span>&gt;</span>
          </button>

          {/* Navegação Principal */}
          <nav className="mt-6 space-y-1 text-sm">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-800/50 text-white font-medium"
            >
              <Home className="w-4 h-4 text-[#E3262E]" /> Início
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/40 transition-colors"
            >
              <TrendingUp className="w-4 h-4" /> Em alta
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/40 transition-colors"
            >
              <Bookmark className="w-4 h-4" /> Salvos
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/40 transition-colors"
            >
              <Mail className="w-4 h-4" /> Entre em contato
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/40 transition-colors"
            >
              <Bell className="w-4 h-4" /> Notificações
            </a>
          </nav>

          {/* Seção Categorias */}
          <div className="mt-6 pt-4 border-t border-zinc-800/60">
            <span className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase px-3">
              Categorias
            </span>
            <div className="mt-2 space-y-1 text-sm">
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/40 transition-colors"
              >
                <Folder className="w-4 h-4 text-zinc-400" /> Projetos de
                extensão
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/40 transition-colors"
              >
                <Folder className="w-4 h-4 text-zinc-400" /> Tecnologias
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/40 transition-colors"
              >
                <Folder className="w-4 h-4 text-zinc-400" /> Artigos
              </a>
            </div>
          </div>

          {/* Botão de Destaque Entrar */}
          <div className="mt-6">
            <button className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl tracking-wider transition-colors">
              ENTRAR / CADASTRAR
            </button>
          </div>
        </div>

        {/* Rodapé do Menu */}
        <div className="pt-6 border-t border-zinc-800/60 space-y-1 text-sm">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/40 transition-colors text-xs text-zinc-400"
          >
            <Settings className="w-4 h-4" /> Configurações
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/40 transition-colors text-xs text-zinc-400"
          >
            <HelpCircle className="w-4 h-4" /> Ajuda
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/40 transition-colors text-xs text-zinc-400"
          >
            <Eye className="w-4 h-4" /> Acessibilidade
          </a>
          <button className="w-full flex items-center gap-3 px-3 py-2 mt-2 rounded-lg text-xs font-semibold text-[#E3262E] hover:bg-[#E3262E]/10 transition-colors">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>
    </div>
  );
}
