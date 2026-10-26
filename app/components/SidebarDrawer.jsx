"use client";

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

// EDITÁVEL: array de itens do menu principal da sidebar. Aqui ficam os textos visíveis, os ícones e os identificadores usados para navegação.
// O que a linha faz: define cada opção exibida na sidebar e o valor que será enviado para o estado `activeTab` quando o botão for clicado.
// Como personalizar: troque `label` por outro texto, mude o `id` para refletir outra rota ou página, ou substitua o ícone do Lucide pelo que desejar.
const menuItems = [
  { id: "home", label: "Início", icon: Home },
  { id: "alta", label: "Em alta", icon: TrendingUp },
  { id: "salvos", label: "Salvos", icon: Bookmark },
  { id: "contato", label: "Entre em contato", icon: Mail },
  { id: "notificacoes", label: "Notificações", icon: Bell },
];

// EDITÁVEL: lista de categorias exibidas na seção de categorias.
// O que a linha faz: define o conjunto de rótulos exibidos na parte inferior do drawer.
// Como personalizar: troque os textos, inclua ou remova categorias e adicione novos nomes conforme o conteúdo do site.
const categoryItems = ["Projetos de extensão", "Tecnologias", "Artigos"];

export default function SidebarDrawer({
  // EDITÁVEL: prop que controla a visibilidade do drawer.
  // O que a linha faz: quando `isOpen` é `true`, o menu aparece; quando é `false`, o componente retorna `null` e não renderiza o painel.
  // Como personalizar: troque o nome da prop ou a regra de visibilidade para utilizar estado local ou dados vindos do backend.
  isOpen,

  // EDITÁVEL: função para fechar o drawer quando o usuário clica fora, no X ou em qualquer ação interna.
  // O que a linha faz: comunica com o componente pai para fechar o menu lateral.
  // Como personalizar: além de fechar, você pode limpar filtros, resetar estados, ou disparar uma chamada para API.
  onClose,

  // EDITÁVEL: estado atual da página/aba selecionada.
  // O que a linha faz: usa o valor de `activeTab` para destacar o item ativo na sidebar.
  // Como personalizar: troque o valor padrão para `"noticias"`, `"sobre"`, `"admin"` ou qualquer outra aba do projeto.
  activeTab = "home",

  // EDITÁVEL: função externa para navegação entre abas ou páginas.
  // O que a linha faz: delega a mudança de rota/estado para o componente pai.
  // Como personalizar: substitua por `router.push('/rota')` em Next.js ou por uma chamada de API para carregar conteúdos.
  onNavigate,

  // EDITÁVEL: callback usado para abrir o painel de notificações.
  // O que a linha faz: quando o item “Notificações” é clicado, executa uma ação específica em vez da navegação padrão.
  // Como personalizar: troque por `setNotificationsOpen(true)`, `router.push('/notificacoes')` ou uma ação real do backend.
  onToggleNotifications,
}) {
  // EDITÁVEL: controle da renderização do drawer.
  // O que a linha faz: se `isOpen` for falso, o menu não existe na árvore de renderização.
  // Como personalizar: em vez de `return null`, você pode aplicar uma transição com `translate-x-full` para animação.
  if (!isOpen) return null;

  // EDITÁVEL: função centralizada para processar ações da sidebar.
  // O que a linha faz: chama `onNavigate` com o alvo escolhido e depois fecha o drawer.
  // Como personalizar: adicione logs, toast, análise de permissões, ou chamadas para API antes de fechar o menu.
  const handleAction = (target) => {
    if (onNavigate) onNavigate(target);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* EDITÁVEL: overlay escurecido para fechar o menu ao clicar fora. */}
      {/* O que a linha faz: cria um fundo semitransparente cobrindo a tela inteira e fecha o drawer ao clicar nele. */}
      {/* Como personalizar: mude `bg-black/70` para outra cor, ajuste o `blur` ou remova o overlay caso queira manter o drawer sempre visível. */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-label="Fechar menu lateral"
      />

      {/* EDITÁVEL: painel lateral principal. */}
      {/* O que a linha faz: define largura, cor de fundo, borda, espaçamento e layout geral da sidebar. */}
      {/* Como personalizar: altere `w-80`, `max-w-[85vw]`, `bg-[#141414]`, `p-5` e as classes de borda e hover conforme o design do sistema. */}
      <aside className="relative z-10 w-80 max-w-[85vw] bg-[#141414] border-r border-zinc-800 h-full flex flex-col justify-between overflow-y-auto p-5 text-zinc-300">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              {/* EDITÁVEL: avatar do usuário no topo da sidebar. */}
              {/* O que a linha faz: exibe um ícone do usuário e uma unidade visual para identificação do perfil. */}
              {/* Como personalizar: troque a cor do fundo, substitua o ícone ou use uma imagem de perfil real. */}
              <div className="w-12 h-12 bg-[#E3262E] rounded-full flex items-center justify-center text-white font-bold">
                <User className="w-6 h-6" />
              </div>
              <div>
                {/* EDITÁVEL: textos do perfil do usuário exibidos no cabeçalho. */}
                {/* O que a linha faz: mostra nome e descrição do perfil do usuário na sidebar. */}
                {/* Como personalizar: substitua por nome real, unidade, curso ou cidade/estado do aluno. */}
                <h3 className="text-white font-bold text-sm">
                  Nome do usuário
                </h3>
                <p className="text-xs text-zinc-500">Outro - UF/Cidade-UF</p>
              </div>
            </div>

            {/* EDITÁVEL: botão para fechar o drawer. */}
            {/* O que a linha faz: fecha o painel lateral rapidamente sem recarregar a página. */}
            {/* Como personalizar: modifique o ícone, cor, tamanho ou remova esse botão se quiser layout mais limpo. */}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#E3262E]"
              aria-label="Fechar menu lateral"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* EDITÁVEL: botão destaque do perfil / painel do usuário. */}
          {/* O que a linha faz: chama `handleAction("admin")` para entrar em uma área específica do sistema. */}
          {/* Como personalizar: mude o texto, altere o alvo para `"perfil"`, `"conta"` ou outra página, ou ligue isso a um modal. */}
          <button
            type="button"
            onClick={() => handleAction("admin")}
            className="w-full mt-4 bg-zinc-800/80 hover:bg-zinc-800 text-xs font-semibold py-2 px-3 rounded-lg text-zinc-300 flex items-center justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-[#E3262E]"
          >
            <span>VER SEU PERFIL</span>
            <span>&gt;</span>
          </button>

          {/* EDITÁVEL: menu principal da sidebar. */}
          {/* O que a linha faz: renderiza os itens vindos de `menuItems` dinamicamente. */}
          {/* Como personalizar: altere a ordem, os textos e os ícones; se quiser dados reais, substitua `menuItems` por resposta de API. */}
          <nav className="mt-6 space-y-1 text-sm">
            {menuItems.map(({ id, label, icon: Icon }) => {
              // EDITÁVEL: lógica que marca o item ativo.
              // O que a linha faz: com base em `activeTab`, o item atual recebe destaque visual.
              // Como personalizar: compare com outros valores como `pathname`, `route`, ou um identificador vindo do banco.
              const isActive =
                activeTab === id || (id === "home" && activeTab === "home");

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    // EDITÁVEL: comportamento específico para a opção de notificações.
                    // O que a linha faz: em vez de navegar para outra aba, chama a ação específica de notificações e fecha o drawer.
                    // Como personalizar: troque por `handleAction("notificacoes")`, modal de alertas, ou API de listagem de notificações.
                    if (id === "notificacoes") {
                      onToggleNotifications?.();
                      onClose();
                      return;
                    }

                    handleAction(id === "home" ? "home" : id);
                  }}
                  className={[
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left",
                    isActive
                      ? "bg-zinc-800/50 text-white font-medium"
                      : "hover:bg-zinc-800/40 text-zinc-300",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "w-4 h-4",
                      isActive ? "text-[#E3262E]" : "text-zinc-400",
                    ].join(" ")}
                  />
                  {label}
                </button>
              );
            })}
          </nav>

          {/* EDITÁVEL: seção de categorias da sidebar. */}
          {/* O que a linha faz: renderiza uma lista secundária de categorias abaixo do menu principal. */}
          {/* Como personalizar: mude o título, os textos e as ações para refletir assuntos do projeto ou filtros de conteúdo. */}
          <div className="mt-6 pt-4 border-t border-zinc-800/60">
            <span className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase px-3 block">
              Categorias
            </span>
            <div className="mt-2 space-y-1 text-sm">
              {categoryItems.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleAction("categorias")}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/40 transition-colors text-left text-zinc-300"
                >
                  <Folder className="w-4 h-4 text-zinc-400" /> {category}
                </button>
              ))}
            </div>
          </div>

          {/* EDITÁVEL: botão principal de ação do drawer. */}
          {/* O que a linha faz: oferece entrada rápida para login/cadastro ou sessão do usuário. */}
          {/* Como personalizar: altere o texto para `Entrar`, `Fazer Login`, `Cadastrar`, ou conecte a um modal de autenticação. */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => handleAction("admin")}
              className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-[#E3262E]"
            >
              ENTRAR / CADASTRAR
            </button>
          </div>
        </div>

        {/* EDITÁVEL: rodapé da sidebar com ações extras. */}
        {/* O que a linha faz: oferece opções secundárias como configurações, ajuda, acessibilidade e sair. */}
        {/* Como personalizar: adicione mais itens, remova opções, mude rótulos ou substitua por links reais de suporte. */}
        <div className="pt-6 border-t border-zinc-800/60 space-y-1 text-sm">
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/40 transition-colors text-xs text-zinc-400 text-left"
            onClick={() => handleAction("configuracoes")}
          >
            <Settings className="w-4 h-4" /> Configurações
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/40 transition-colors text-xs text-zinc-400 text-left"
            onClick={() => handleAction("ajuda")}
          >
            <HelpCircle className="w-4 h-4" /> Ajuda
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/40 transition-colors text-xs text-zinc-400 text-left"
            onClick={() => handleAction("acessibilidade")}
          >
            <Eye className="w-4 h-4" /> Acessibilidade
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2 mt-2 rounded-lg text-xs font-semibold text-[#E3262E] hover:bg-[#E3262E]/10 transition-colors text-left"
            onClick={onClose}
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>
    </div>
  );
}

// BANCO DE DADOS: ponto de integração para carregar a lista de itens do menu dinamicamente.
// O que deve vir do backend: campos como `id`, `label`, `route`, `icon`, `isActive`.
// Exemplo de contrato esperado:
// [
//   { id: 'home', label: 'Início', route: '/home', icon: 'home', isActive: true },
//   { id: 'alta', label: 'Em alta', route: '/alta', icon: 'trending-up', isActive: false }
// ]
// O ideal é substituir `menuItems` por `const menuItems = await fetch('/api/sidebar/menu')` ou por dados vindos de um banco.

// BANCO DE DADOS: ponto de integração para buscar os dados do usuário autenticado.
// O que deve vir do backend: `nome`, `cidade`, `estado`, `avatarUrl`, `id`, `perfil`.
// Exemplo de payload esperado:
// { id: 1, nome: 'Nome do usuário', cidade: 'Outro', estado: 'SP', avatarUrl: 'https://example.com/avatar.png' }
// Em produção, isso deve ser consumido via API com token JWT ou sessão válida.

// BANCO DE DADOS: ponto de integração para carregar categorias do sistema.
// O que deve vir do backend: lista de categorias com `id`, `nome`, `slug` ou `route`.
// Exemplo:
// [{ id: 1, nome: 'Tecnologias', slug: 'tecnologias' }, { id: 2, nome: 'Artigos', slug: 'artigos' }]
// Isso permite remover `categoryItems` hardcoded e renderizar categorias persistidas no banco.

// BANCO DE DADOS: ponto de integração para ação de logout e autenticação.
// O que deve ser enviado para o backend: usuário logado, token/ sessão, e ação de logout.
// Exemplo de chamada:
// fetch('/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
// A lógica real deve invalidar token, encerrar sessão e redirecionar para a tela de login.
