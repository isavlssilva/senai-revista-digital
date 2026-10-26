"use client";

import { useState, useEffect, type MouseEvent, type FormEvent } from "react";
import Preloader from "./components/Preloader";
import {
  Search,
  Bell,
  Menu,
  X,
  ChevronRight,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Send,
  Award,
  Lightbulb,
  Users,
  Target,
  Share2,
  Heart,
  Bookmark,
  Sparkles,
  BookOpen,
  User,
  Settings,
  HelpCircle,
  Accessibility,
  LogOut,
  CheckCircle2,
  Clock,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Quote,
  Zap,
  Flame,
  MessageSquare,
  Compass,
  ArrowUpRight,
  Filter,
} from "lucide-react";

// Mascot SVG Component for Brand Consistency
const SenaMascot = ({ className = "w-8 h-8", glow = true }) => (
  <div
    className={`relative inline-flex items-center justify-center ${className}`}
  >
    {glow && (
      <div
        className="absolute inset-0 bg-red-600/40 blur-md animate-pulse"
        style={{ borderRadius: 0 }}
      ></div>
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

type Article = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: number | string;
  time: string;
  readTime: string;
  image: string;
  status: string;
  featured: boolean;
  likes: number;
  bookmarks: number;
};

type ArticleFormData = {
  title: string;
  content: string;
  category: string;
  author: string;
  date: number | string;
  time: string;
  status: string;
  image: string;
};

// Initial Mock Articles
const INITIAL_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Tecnologia e inovação que transformam o futuro",
    excerpt:
      "Conheça os projetos desenvolvidos pelos alunos do SENAI que estão criando soluções reais para a indústria 4.0 e robótica avançada.",
    content: `A revolução industrial 4.0 já não é uma promessa para o futuro — ela é a realidade presente nos laboratórios do SENAI. Estudantes do curso de Mecatrônica e Eletrônica desenvolveram uma linha de produção autônoma integrada com Inteligência Artificial capaz de prever falhas operacionais com até 98% de precisão.
    
    Durante o projeto de conclusão de curso, os alunos utilizaram sensores IoT de baixo custo e algorítmicos de machine learning treinados em dados locais. A solução reduz o tempo de inatividade das máquinas e otimiza o uso de energia elétrica nas instalações industriais.
    
    "O grande diferencial do SENAI é proporcionar o aprendizado prático alinhado diretamente às demandas reais dos grandes polos fabris do Brasil", destaca o coordenador de inovação.`,
    category: "Tecnologia",
    author: "Leandro Aparecido de Souza",
    date: "25/08/2026",
    time: "08:00",
    readTime: "5 min de leitura",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
    status: "Publicado",
    featured: true,
    likes: 142,
    bookmarks: 38,
  },
  {
    id: "2",
    title: "Impressão 3D de alta precisão revoluciona prototipagem",
    excerpt:
      "Laboratórios de manufatura aditiva alcançam nível de detalhamento inédito na confecção de peças automotivas.",
    content:
      "Com a chegada de novas impressoras 3D industriais com resina fotopolimerizável, os alunos do SENAI têm produzido protótipos funcionais com tolerâncias micrométricas.",
    category: "Inovação",
    author: "Isabelle Souza",
    date: "02/10/2026",
    time: "14:30",
    readTime: "4 min de leitura",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    status: "Publicado",
    featured: false,
    likes: 89,
    bookmarks: 19,
  },
  {
    id: "3",
    title: "Robôs colaborativos na linha de montagem industrial",
    excerpt:
      "Cobots aumentam a segurança dos operadores e dobram a velocidade do processo de montagem.",
    content:
      "A integração de braços robóticos articulados com sistemas de visão computacional permitiu que humanos e robôs trabalhem lado a lado sem barreiras físicas de proteção.",
    category: "Automação",
    author: "Carlos Eduardo Santos",
    date: "30/09/2026",
    time: "11:15",
    readTime: "6 min de leitura",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    status: "Publicado",
    featured: false,
    likes: 210,
    bookmarks: 54,
  },
  {
    id: "4",
    title: "Energias renováveis: O futuro das redes inteligentes",
    excerpt:
      "Sistema fotovoltaico experimental gera 100% da energia consumida no campus tecnológico.",
    content:
      "O projeto pioneiro de Smart Grid instalado na unidade SENAI monitora a demanda em tempo real e armazena excedente energético em baterias de íon-lítio de última geração.",
    category: "Projetos",
    author: "Mariana Lima",
    date: "28/09/2026",
    time: "16:45",
    readTime: "3 min de leitura",
    image:
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800",
    status: "Publicado",
    featured: false,
    likes: 76,
    bookmarks: 22,
  },
  {
    id: "5",
    title: "Desenvolvimento de Interfaces Ágeis e Acessíveis",
    excerpt:
      "Como o Design System da Revista Digital foi concebido mantendo foco em UX e acessibilidade universal.",
    content:
      "O design da nova plataforma seguiu diretrizes estritas de contraste, navegabilidade por teclado e componentes modulares adaptáveis.",
    category: "Design",
    author: "Lucas Mendes",
    date: "20/09/2026",
    time: "09:30",
    readTime: "7 min de leitura",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    status: "Publicado",
    featured: false,
    likes: 132,
    bookmarks: 41,
  },
  {
    id: "6",
    title: "Inteligência Artificial Generativa no Suporte à Manutenção",
    excerpt:
      "Assistentes de IA auxiliam técnicos com manuais interativos e diagnósticos preditivos.",
    content:
      "Modelos de linguagem ajustados com a documentação técnica da indústria respondem a dúvidas operacionais em segundos, acelerando consertos no chão de fábrica.",
    category: "IA",
    author: "Prof. Ricardo Silva",
    date: "15/09/2026",
    time: "10:00",
    readTime: "5 min de leitura",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    status: "Publicado",
    featured: false,
    likes: 305,
    bookmarks: 98,
  },
];

const CATEGORIES = [
  "Todos",
  "Tecnologia",
  "Mecânica & Usinagem",
  "Construção Civil",
  "Eletrônica",
  "Automação",
  "Gestão & Negócios",
  "Design",
];

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState("home");
  const [showSplash, setShowSplash] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Data States
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [adminTab, setAdminTab] = useState("noticias");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Interactive Overlays
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Article Form State
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    content: "",
    category: "Tecnologia",
    author: "Leandro Aparecido de Souza",
    date: new Date().toLocaleDateString("pt-BR"),
    time: "08:00",
    status: "Rascunho",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
  });

  // Auto hide splash screen on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleLikeArticle = (id: string, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setArticles((prevArticles) =>
      prevArticles.map((art) =>
        art.id === id ? { ...art, likes: art.likes + 1 } : art,
      ),
    );

    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle((prev) =>
        prev && prev.id === id ? { ...prev, likes: prev.likes + 1 } : prev,
      );
    }

    triggerToast("Você curtiu esta matéria!");
  };

  const handleSaveArticle = (id: string, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    triggerToast("Matéria salva em seus favoritos!");
  };

  const handlePublishArticle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title) {
      triggerToast("Por favor, digite o título da notícia.");
      return;
    }

    if (editingArticleId) {
      setArticles((prevArticles) =>
        prevArticles.map((art) =>
          art.id === editingArticleId
            ? {
                ...art,
                title: formData.title,
                content: formData.content || "Conteúdo atualizado do artigo.",
                excerpt: formData.content
                  ? `${formData.content.slice(0, 120)}...`
                  : art.excerpt,
                category: formData.category,
                author: formData.author,
                date: formData.date,
                time: formData.time,
                status: formData.status,
                image: formData.image,
              }
            : art,
        ),
      );
      triggerToast("Notícia atualizada com sucesso!");
    } else {
      const newArt: Article = {
        id: String(Date.now()),
        title: formData.title,
        excerpt: formData.content
          ? `${formData.content.slice(0, 120)}...`
          : "Inovação e tecnologia em destaque na revista digital do SENAI.",
        content:
          formData.content ||
          "Conteúdo completo da nova notícia publicada no portal do SENAI Revista Digital.",
        category: formData.category,
        author: formData.author,
        date: formData.date,
        time: formData.time,
        readTime: "4 min de leitura",
        image: formData.image,
        status: formData.status,
        featured: false,
        likes: 0,
        bookmarks: 0,
      };
      setArticles((prevArticles) => [newArt, ...prevArticles]);
      triggerToast("Nova notícia publicada live!");
    }

    setShowAddModal(false);
    setEditingArticleId(null);
    setFormData({
      title: "",
      content: "",
      category: "Tecnologia",
      author: "Leandro Aparecido de Souza",
      date: new Date().toLocaleDateString("pt-BR"),
      time: "08:00",
      status: "Rascunho",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
    });
  };

  const handleDeleteArticle = (id: string) => {
    setArticles((prevArticles) => prevArticles.filter((a) => a.id !== id));
    triggerToast("Notícia removida com sucesso!");
  };

  const handleEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setFormData({
      title: art.title,
      content: art.content,
      category: art.category,
      author: art.author,
      date: art.date,
      time: art.time || "08:00",
      status: art.status,
      image: art.image,
    });
    setShowAddModal(true);
  };

  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      selectedCategory === "Todos" || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  return (
    <div
      className="w-full min-h-screen bg-[#0D0D0D] text-zinc-100 font-sans selection:bg-[#E51937] selection:text-white relative overflow-x-hidden"
      style={{
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        border: 0,
        borderRadius: 0,
        overflowX: "hidden",
      }}
    >
      {showSplash && <Preloader />}

      {}
      <header
        className="sticky top-0 z-30 bg-[#0D0D0D]/90 backdrop-blur-md px-0 md:px-2 py-3 transition-all border-0"
        style={{ margin: 0, borderRadius: 0, border: 0 }}
      >
        <div
          className="w-full flex items-center justify-between gap-4 px-3 md:px-4"
          style={{ maxWidth: "100%", margin: 0 }}
        >
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#E51937]"
              title="Abrir Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div
              onClick={() => setActiveTab("home")}
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

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1 rounded-xl border border-zinc-800/50">
            {[
              { id: "home", label: "Início" },
              { id: "noticias", label: "Notícias" },
              { id: "categorias", label: "Categorias" },
              { id: "sobre", label: "Sobre Nós" },
              { id: "admin", label: "Painel Admin" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === "categorias") setSelectedCategory("Todos");
                }}
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

          {/* Right Controls: Search, Notifications, Splash Reset */}
          <div className="flex items-center gap-2">
            {/* Expandable Search Input */}
            <div
              className={`relative flex items-center transition-all ${isSearchExpanded ? "w-48 md:w-64" : "w-9 md:w-9"}`}
            >
              <button
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="absolute inset-0 pl-9 pr-3 bg-zinc-900 text-white text-xs rounded-xl border border-zinc-700 focus:outline-none focus:border-[#E51937] transition-all"
                />
              )}
            </div>

            {/* Notifications Menu */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
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

            {/* Re-trigger Splash button */}
            <button
              onClick={() => setShowSplash(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
              title="Visualizar Tela Splash"
            >
              <Zap className="w-3.5 h-3.5 text-[#E51937]" /> Splash
            </button>
          </div>
        </div>
      </header>

      {}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in"
          />

          {/* Drawer Panel */}
          <div className="relative w-80 max-w-full bg-[#18181B] border-r border-zinc-800 h-full flex flex-col justify-between shadow-2xl z-10 overflow-y-auto animate-in slide-in-from-left duration-300 p-5">
            <div>
              {/* Header Close */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <SenaMascot className="w-8 h-8" />
                  <span className="font-bold text-white text-base">
                    SENAI Revista
                  </span>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile Card */}
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
                    setIsDrawerOpen(false);
                    setActiveTab("admin");
                  }}
                  className="mt-3 w-full py-1.5 text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors border border-zinc-700/50"
                >
                  VER SEU PERFIL
                </button>
              </div>

              {/* Primary Navigation */}
              <div className="space-y-1">
                {[
                  {
                    icon: BookOpen,
                    label: "Início",
                    action: () => {
                      setActiveTab("home");
                      setIsDrawerOpen(false);
                    },
                  },
                  {
                    icon: Flame,
                    label: "Em alta",
                    action: () => {
                      setActiveTab("home");
                      setIsDrawerOpen(false);
                    },
                  },
                  {
                    icon: Bookmark,
                    label: "Salvos",
                    action: () => {
                      triggerToast("Abrindo seus artigos salvos");
                      setIsDrawerOpen(false);
                    },
                  },
                  {
                    icon: MessageSquare,
                    label: "Entre em contato",
                    action: () => {
                      setActiveTab("sobre");
                      setIsDrawerOpen(false);
                    },
                  },
                  {
                    icon: Bell,
                    label: "Notificações",
                    action: () => {
                      setNotificationsOpen(true);
                      setIsDrawerOpen(false);
                    },
                  },
                ].map((item, idx) => (
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

              {/* Categorias Subsection */}
              <div className="mt-6 pt-4 border-t border-zinc-800">
                <span className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase px-3 block mb-2">
                  CATEGORIAS
                </span>
                <div className="space-y-1">
                  {[
                    "Projetos de extensão",
                    "Tecnologias",
                    "Banners",
                    "Artigos",
                    "Veja mais",
                  ].map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedCategory(cat.split(" ")[0]);
                        setActiveTab("home");
                        setIsDrawerOpen(false);
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

              {/* Red CTA Button */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    triggerToast("Redirecionando para login do SENAI...");
                    setIsDrawerOpen(false);
                  }}
                  className="w-full py-2.5 bg-[#E51937] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" /> ENTRAR / CADASTRAR
                </button>
              </div>
            </div>

            {/* Footer Items */}
            <div className="pt-6 border-t border-zinc-800 space-y-1">
              {[
                { icon: Settings, label: "Configurações" },
                { icon: HelpCircle, label: "Ajuda" },
                { icon: Accessibility, label: "Acessibilidade" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => triggerToast(`Abrindo ${item.label}...`)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                >
                  <item.icon className="w-4 h-4 text-zinc-500" />
                  <span>{item.label}</span>
                </button>
              ))}

              <button
                onClick={() => {
                  triggerToast("Sessão encerrada.");
                  setIsDrawerOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#E51937] hover:bg-red-950/30 mt-2 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sair da conta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING VERTICAL QUIZ BADGE */}
      <button
        onClick={() => setQuizModalOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-20 bg-[#E51937] hover:bg-red-700 text-white text-xs font-bold py-3 px-1.5 rounded-l-2xl shadow-2xl shadow-red-600/50 flex flex-col items-center justify-center gap-2 transition-all hover:pr-3 cursor-pointer group"
        title="Quiz de Interesse"
      >
        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        <span className="[writing-mode:vertical-lr] rotate-180 tracking-widest uppercase font-extrabold text-[11px]">
          Quiz de Interesse
        </span>
      </button>

      {/* MAIN CONTENT CANVAS */}
      <main
        className="w-full px-0 md:px-3 py-0 pb-20"
        style={{ margin: 0, maxWidth: "100%" }}
      >
        {}
        {(activeTab === "home" ||
          activeTab === "noticias" ||
          activeTab === "categorias") && (
          <div className="space-y-10 animate-fade-in px-0 md:px-3">
            {/* HERO BANNER DESTAQUE */}
            {featuredArticle && (
              <section
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#18181B] via-[#1F1F23] to-[#141416] border border-zinc-800/80 shadow-2xl group"
                style={{ borderRadius: 0, border: "0 solid transparent" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  {/* Left Column: Image Banner */}
                  <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-[380px] overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#18181B]"></div>
                  </div>

                  {/* Right Column: Hero Content */}
                  <div className="lg:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col justify-center relative">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#E51937] text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md shadow-red-900/40">
                        Destaque
                      </span>
                      <span className="text-zinc-400 text-xs flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />{" "}
                        {featuredArticle.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight group-hover:text-red-100 transition-colors">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-zinc-400 text-xs md:text-sm mt-3 line-clamp-3 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="mt-6 flex items-center gap-4">
                      <button
                        onClick={() => handleOpenArticle(featuredArticle)}
                        className="px-6 py-3 bg-[#E51937] hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-red-900/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                      >
                        Ler matéria <ArrowUpRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) =>
                          handleSaveArticle(featuredArticle.id, e)
                        }
                        className="p-3 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 transition-colors"
                        title="Salvar Matéria"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* FILTER PILLS CHIPS ("Explore a revista") */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold tracking-wider text-zinc-300 uppercase flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#E51937]" /> Explore a
                  revista
                </h3>
                <span className="text-xs text-zinc-500">
                  {filteredArticles.length} artigos encontrados
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                      selectedCategory === cat
                        ? "bg-[#E51937] text-white shadow-lg shadow-red-950/50 border border-red-500/50 scale-105"
                        : "bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* MAIS RECENTES GRID */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  Mais recentes
                </h2>
                <button
                  onClick={() => setSelectedCategory("Todos")}
                  className="text-xs font-semibold text-[#E51937] hover:underline flex items-center gap-1"
                >
                  Ver todas <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {filteredArticles.length === 0 ? (
                <div className="p-12 text-center bg-zinc-900/40 rounded-3xl border border-zinc-800">
                  <Compass className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                  <p className="text-zinc-300 font-semibold text-sm">
                    Nenhum artigo encontrado
                  </p>
                  <p className="text-zinc-500 text-xs mt-1">
                    Tente trocar a categoria ou buscar por outro termo.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((art) => (
                    <article
                      key={art.id}
                      onClick={() => handleOpenArticle(art)}
                      className="bg-[#18181B] hover:bg-[#1F1F23] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-zinc-700 transition-all duration-300 flex flex-col cursor-pointer group"
                    >
                      {/* Card Thumbnail */}
                      <div className="relative h-48 overflow-hidden bg-zinc-900">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-black/70 backdrop-blur-md text-red-400 border border-red-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {art.category}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center text-[11px] text-zinc-400 gap-2 mb-2">
                            <span>{art.date}</span>
                            <span>•</span>
                            <span>{art.readTime}</span>
                          </div>

                          <h3 className="font-bold text-base text-white group-hover:text-[#E51937] transition-colors line-clamp-2 leading-snug">
                            {art.title}
                          </h3>

                          <p className="text-zinc-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                            {art.excerpt}
                          </p>
                        </div>

                        {/* Card Footer */}
                        <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                          <span className="font-medium truncate max-w-[140px] text-zinc-300">
                            {art.author}
                          </span>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => handleLikeArticle(art.id, e)}
                              className="flex items-center gap-1 hover:text-[#E51937] transition-colors"
                            >
                              <Heart className="w-3.5 h-3.5 text-zinc-400 hover:fill-red-500 hover:text-red-500" />
                              <span>{art.likes}</span>
                            </button>
                            <button
                              onClick={(e) => handleSaveArticle(art.id, e)}
                              className="hover:text-white transition-colors"
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* DASHBOARD "EM ALTA NO SENAI" METRICS */}
            <section className="bg-gradient-to-r from-[#18181B] via-[#1C1C20] to-[#18181B] border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <Flame className="w-5 h-5 text-[#E51937]" />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Em alta no SENAI
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { count: "25", label: "Projetos em destaque" },
                  { count: "18", label: "Conquistas recentes" },
                  { count: "7", label: "Eventos este mês" },
                  { count: "12", label: "Entrevistas inspiradoras" },
                  { count: "94%", label: "Satisfação dos leitores" },
                  { count: "5k+", label: "Acessos semanais" },
                ].map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-red-900/50 transition-all hover:scale-105 group"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-[#E51937] flex items-center justify-center text-xl font-extrabold text-white shadow-lg shadow-red-950/40 group-hover:bg-[#E51937] transition-colors mb-3">
                      {metric.count}
                    </div>
                    <p className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-200 leading-snug">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {}
        {activeTab === "sobre" && (
          <div className="space-y-12 animate-fade-in max-w-5xl mx-auto">
            {/* SOBRE NOS HEADER */}
            <div className="flex items-center gap-4 border-b border-zinc-800 pb-6">
              <SenaMascot className="w-12 h-12" />
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  SOBRE NÓS!
                </h1>
                <p className="text-zinc-400 text-sm mt-1">
                  O conhecimento que transforma histórias e impulsiona a
                  indústria nacional.
                </p>
              </div>
            </div>

            {/* MAIN NARRATIVE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#18181B] p-6 md:p-8 rounded-3xl border border-zinc-800 shadow-xl">
              <div className="space-y-4">
                <span className="text-[#E51937] font-bold text-xs uppercase tracking-wider block">
                  Sobre a Revista
                </span>
                <h2 className="text-2xl font-bold text-white leading-tight">
                  Conectando educação, inovação e transformação.
                </h2>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                  A Revista Digital SENAI é um espaço criado para compartilhar
                  conhecimento, histórias inspiradoras e as inovações que estão
                  moldando o futuro da indústria e da educação profissional.
                </p>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                  Aqui você encontra conteúdos produzidos por alunos,
                  instrutores, especialistas e parceiros que acreditam no poder
                  da educação para transformar vidas.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-zinc-700/60 shadow-2xl h-64 md:h-80">
                <img
                  src="/img/senai.svg"
                  alt="Instalações SENAI"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* NOSSOS PILARES */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Nossos pilares
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: Award,
                    title: "Educação de qualidade",
                    desc: "Promovemos o aprendizado contínuo e o desenvolvimento de competências para o mundo do trabalho.",
                  },
                  {
                    icon: Lightbulb,
                    title: "Inovação",
                    desc: "Acreditamos na tecnologia e na criatividade como motores de soluções para os desafios da indústria.",
                  },
                  {
                    icon: Users,
                    title: "Colaboração",
                    desc: "Valorizamos a troca de ideias, experiências e parcerias que fortalecem nossa comunidade.",
                  },
                  {
                    icon: Target,
                    title: "Impacto",
                    desc: "Geramos transformação positiva  a sociedade por meio da educação e da indústria.",
                  },
                ].map((pilar, idx) => (
                  <div
                    key={idx}
                    className="bg-[#18181B] p-5 rounded-2xl border border-zinc-800 space-y-2 hover:border-zinc-700 transition-colors"
                  >
                    <div className="p-2.5 w-fit rounded-xl bg-red-950/40 text-[#E51937] border border-red-900/30">
                      <pilar.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-sm">
                      {pilar.title}
                    </h4>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      {pilar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT & NEWSLETTER FORMS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Contact */}
              <div className="bg-[#18181B] p-6 rounded-3xl border border-zinc-800 space-y-4">
                <h3 className="text-base font-bold text-white">
                  Fale com a gente
                </h3>
                <p className="text-xs text-zinc-400">
                  Tem sugestões, dúvidas ou quer compartilhar uma história?
                  Entre em contato com a nossa equipe.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    triggerToast("Sua mensagem foi enviada!");
                  }}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="block text-zinc-400 font-medium mb-1">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Digite seu nome..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E51937]"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-medium mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seu.email@exemplo.com"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E51937]"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-medium mb-1">
                      Mensagem
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Escreva sua mensagem aqui..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E51937]"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#E51937] hover:bg-red-700 font-bold text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Enviar mensagem
                  </button>
                </form>
              </div>

              {/* Newsletter */}
              <div className="bg-[#18181B] p-6 rounded-3xl border border-zinc-800 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Receba novidades
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Assine nossa newsletter e fique por dentro das principais
                    notícias e lançamentos tecnológicos do SENAI.
                  </p>

                  <div className="mt-6 space-y-3">
                    <input
                      type="email"
                      placeholder="Seu e-mail profissional"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E51937]"
                    />
                    <button
                      onClick={() =>
                        triggerToast("Inscrição realizada na newsletter!")
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
            </div>
          </div>
        )}

        {}
        {activeTab === "admin" && (
          <div className="space-y-6 animate-fade-in">
            {/* ADMIN HEADER & TABS */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  Painel Administrativo
                </h1>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Gerencie os conteúdos, notícias e métricas de leitores do
                  SENAI.
                </p>
              </div>

              {/* Admin Mode Switcher */}
              <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
                <button
                  onClick={() => setAdminTab("noticias")}
                  className={`px-4 py-1.5 rounded-lg font-semibold transition-all ${
                    adminTab === "noticias"
                      ? "bg-[#E51937] text-white shadow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  NOTÍCIAS E ARTIGOS
                </button>
                <button
                  onClick={() => setAdminTab("dashboards")}
                  className={`px-4 py-1.5 rounded-lg font-semibold transition-all ${
                    adminTab === "dashboards"
                      ? "bg-[#E51937] text-white shadow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  DASHBOARDS
                </button>
              </div>
            </div>

            {/* TAB 1: NOTICIAS MANAGEMENT */}
            {adminTab === "noticias" && (
              <div className="space-y-4">
                {/* Actions Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      setEditingArticleId(null);
                      setFormData({
                        title: "",
                        content: "",
                        category: "Tecnologia",
                        author: "Leandro Aparecido de Souza",
                        date: new Date().toLocaleDateString("pt-BR"),
                        time: "08:00",
                        status: "Rascunho",
                        image:
                          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
                      });
                      setShowAddModal(true);
                    }}
                    className="px-4 py-2.5 bg-[#E51937] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> ADICIONAR NOVA NOTÍCIA
                  </button>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Filtrar por título..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#E51937]"
                      />
                    </div>
                  </div>
                </div>

                {/* Articles Table/List */}
                <div className="bg-[#18181B] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-zinc-300">
                      <thead className="bg-zinc-900/80 uppercase text-[10px] text-zinc-500 font-bold tracking-wider border-b border-zinc-800">
                        <tr>
                          <th className="py-3.5 px-4">Matéria</th>
                          <th className="py-3.5 px-4">Categoria</th>
                          <th className="py-3.5 px-4">Autor</th>
                          <th className="py-3.5 px-4">Data</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60">
                        {filteredArticles.map((art) => (
                          <tr
                            key={art.id}
                            className="hover:bg-zinc-800/30 transition-colors"
                          >
                            <td className="py-3 px-4 font-semibold text-white max-w-xs truncate">
                              {art.title}
                            </td>
                            <td className="py-3 px-4">
                              <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px]">
                                {art.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-zinc-400">
                              {art.author}
                            </td>
                            <td className="py-3 px-4 text-zinc-400">
                              {art.date}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  art.status === "Publicado"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                }`}
                              >
                                {art.status || "Publicado"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right space-x-1">
                              <button
                                onClick={() => handleOpenArticle(art)}
                                className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors"
                                title="Visualizar"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEditArticle(art)}
                                className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(art.id)}
                                className="p-1.5 hover:bg-red-950/50 text-zinc-400 hover:text-red-400 rounded-lg transition-colors"
                                title="Excluir"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ANALYTICS DASHBOARDS */}
            {adminTab === "dashboards" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Total de Leituras",
                      value: "14,290",
                      change: "+12.4%",
                      icon: Eye,
                    },
                    {
                      label: "Artigos Publicados",
                      value: articles.length.toString(),
                      change: "+2 este mês",
                      icon: BookOpen,
                    },
                    {
                      label: "Curtidas Totais",
                      value: "1,842",
                      change: "+8.1%",
                      icon: Heart,
                    },
                    {
                      label: "Inscritos na Newsletter",
                      value: "3,210",
                      change: "+15%",
                      icon: Users,
                    },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-[#18181B] p-5 rounded-2xl border border-zinc-800 space-y-2"
                    >
                      <div className="flex items-center justify-between text-zinc-400">
                        <span className="text-xs font-medium">
                          {stat.label}
                        </span>
                        <stat.icon className="w-4 h-4 text-[#E51937]" />
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        {stat.change} em relação ao mês anterior
                      </span>
                    </div>
                  ))}
                </div>

                {/* Chart Mock Box */}
                <div className="bg-[#18181B] p-6 rounded-2xl border border-zinc-800 space-y-4">
                  <h3 className="font-bold text-sm text-white">
                    Engajamento de Leitores por Categoria
                  </h3>
                  <div className="h-64 flex items-end gap-3 pt-8 pb-2 px-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                    {[
                      { name: "Tecnologia", val: "80%" },
                      { name: "Inovação", val: "65%" },
                      { name: "Automação", val: "90%" },
                      { name: "Projetos", val: "45%" },
                      { name: "Design", val: "55%" },
                      { name: "IA", val: "95%" },
                    ].map((bar, i) => (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
                      >
                        <div
                          style={{ height: bar.val }}
                          className="w-full bg-gradient-to-t from-red-900 to-[#E51937] rounded-t-lg group-hover:brightness-125 transition-all shadow-lg"
                        ></div>
                        <span className="text-[10px] text-zinc-400 font-medium truncate w-full text-center">
                          {bar.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#18181B] border border-zinc-700/80 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <SenaMascot className="w-7 h-7" />
                <h2 className="text-xl font-bold text-white">
                  {editingArticleId ? "Editar notícia" : "Cadastrar notícia"}
                </h2>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Container */}
            <form
              onSubmit={handlePublishArticle}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Main Content Fields (Left 8 Cols) */}
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Título da notícia *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Título da notícia..."
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E51937]"
                  />
                </div>

                {/* Rich Text Editor Mockup Toolbar */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Conteúdo da publicação
                  </label>
                  <div className="border border-zinc-700 rounded-xl overflow-hidden bg-zinc-900">
                    <div className="flex flex-wrap items-center gap-1 p-2 bg-zinc-800/80 border-b border-zinc-700 text-zinc-300">
                      <button
                        type="button"
                        className="p-1.5 hover:bg-zinc-700 rounded"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 hover:bg-zinc-700 rounded"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 hover:bg-zinc-700 rounded"
                      >
                        <Underline className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 hover:bg-zinc-700 rounded"
                      >
                        <Strikethrough className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-px h-4 bg-zinc-700 mx-1"></span>
                      <button
                        type="button"
                        className="p-1.5 hover:bg-zinc-700 rounded"
                      >
                        <AlignLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 hover:bg-zinc-700 rounded"
                      >
                        <AlignCenter className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 hover:bg-zinc-700 rounded"
                      >
                        <AlignRight className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-px h-4 bg-zinc-700 mx-1"></span>
                      <button
                        type="button"
                        className="p-1.5 hover:bg-zinc-700 rounded"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 hover:bg-zinc-700 rounded"
                      >
                        <ListOrdered className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 hover:bg-zinc-700 rounded"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 hover:bg-zinc-700 rounded"
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 hover:bg-zinc-700 rounded"
                      >
                        <Quote className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <textarea
                      rows={8}
                      placeholder="Escreva o conteúdo completo da sua notícia aqui, com toda a formatação desejada..."
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      className="w-full bg-zinc-900 p-4 text-xs text-white focus:outline-none resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Sidebar Parameters (Right 4 Cols) */}
              <div className="lg:col-span-4 space-y-4 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
                {/* Image Capa Box */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Imagem da capa *
                  </label>
                  <div className="relative rounded-xl overflow-hidden border border-zinc-700 h-32 bg-zinc-900 group">
                    <img
                      src={formData.image}
                      alt="Capa Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button
                        type="button"
                        onClick={() => {
                          const url = prompt(
                            "Cole a URL de uma imagem da internet:",
                          );
                          if (url) setFormData({ ...formData, image: url });
                        }}
                        className="text-[11px] bg-white/20 hover:bg-white/40 text-white font-medium px-3 py-1 rounded-lg backdrop-blur"
                      >
                        Trocar imagem
                      </button>
                    </div>
                  </div>
                </div>

                {/* Categoria Picker */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Categoria
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E51937]"
                  >
                    {CATEGORIES.filter((c) => c !== "Todos").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Autor Select */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Autor *
                  </label>
                  <select
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E51937]"
                  >
                    <option value="Leandro Aparecido de Souza">
                      LEANDRO APARECIDO DE SOUZA
                    </option>
                    <option value="Isabelle Souza">ISABELLE SOUZA</option>
                    <option value="Prof. Ricardo Silva">
                      PROF. RICARDO SILVA
                    </option>
                  </select>
                </div>

                {/* Data & Horario */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                      Data
                    </label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                      Horário
                    </label>
                    <input
                      type="text"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Status Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Publicado">Publicado</option>
                    <option value="Rascunho">Rascunho</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-2 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800 rounded-xl"
                  >
                    Excluir notícia
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#E51937] hover:bg-red-700 text-white font-bold text-xs uppercase rounded-xl shadow-lg flex items-center gap-1"
                  >
                    Publicar notícia
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-[#18181B] border border-zinc-700/80 rounded-3xl w-full max-w-3xl my-8 overflow-hidden shadow-2xl relative">
            {/* Cover Header */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-black/20 to-transparent"></div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black text-white rounded-full backdrop-blur transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-[#E51937] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {selectedArticle.category}
                </span>
                <h1 className="text-xl md:text-3xl font-extrabold text-white mt-2 leading-tight">
                  {selectedArticle.title}
                </h1>
              </div>
            </div>

            {/* Article Body */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Meta information */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs text-zinc-400">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-white uppercase">
                    {selectedArticle.author.charAt(0)}
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-200 block">
                      {selectedArticle.author}
                    </span>
                    <span className="text-[10px]">
                      {selectedArticle.date} • {selectedArticle.readTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleLikeArticle(selectedArticle.id, e)}
                    className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 flex items-center gap-1.5 text-xs text-red-400"
                  >
                    <Heart className="w-4 h-4 fill-red-500" />
                    <span>{selectedArticle.likes}</span>
                  </button>
                  <button
                    onClick={() =>
                      triggerToast("Link copiado para a área de transferência!")
                    }
                    className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 text-zinc-300"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Text Paragraphs */}
              <div className="space-y-4 text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                {selectedArticle.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      {quizModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#18181B] border border-zinc-700 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-5 text-center relative">
            <button
              onClick={() => setQuizModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <SenaMascot className="w-12 h-12 mx-auto" />

            <div>
              <h3 className="text-lg font-bold text-white">
                Quiz de Interesse SENAI
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Qual área tecnológica você deseja explorar hoje?
              </p>
            </div>

            <div className="space-y-2 text-xs">
              {[
                "Robótica e Mecatrônica Industrial",
                "Inteligência Artificial e Software",
                "Energias Sustentáveis e Renovável",
                "Design de Experiência e Interfaces",
              ].map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuizAnswer(option);
                    setTimeout(() => {
                      setQuizModalOpen(false);
                      setSelectedCategory("Tecnologia");
                      triggerToast(`Recomendação ajustada para: ${option}`);
                    }, 400);
                  }}
                  className={`w-full p-3 rounded-xl border text-left font-medium transition-all ${
                    quizAnswer === option
                      ? "bg-[#E51937] text-white border-red-500"
                      : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {}
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white border border-[#E51937] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#E51937]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
