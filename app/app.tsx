"use client";

import { useState, useEffect, type MouseEvent, type FormEvent } from "react";
import Preloader from "./components/Preloader";
import Header from "./components/layout/Header";
import SidebarDrawer from "./components/layout/SidebarDrawer";
import ContactForm from "./components/forms/ContactForm";
import NewsletterForm from "./components/forms/NewsletterForm";
import Toast from "./components/ui/Toast";
import ArticleCard from "./components/articles/ArticleCard";
import SenaMascot from "./components/ui/SenaMascot";
import type { Article, ArticleFormData, ArticleStatus } from "../types/article";
import { INITIAL_ARTICLES, CATEGORIES } from "../mocks/articles";
import {
  Search,
  X,
  ChevronRight,
  Plus,
  Trash2,
  Edit3,
  Eye,
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

      <Header
        activeTab={activeTab}
        isSearchExpanded={isSearchExpanded}
        searchQuery={searchQuery}
        notificationsOpen={notificationsOpen}
        onOpenMenu={() => setIsDrawerOpen(true)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          if (tab === "categorias") setSelectedCategory("Todos");
        }}
        onToggleSearch={() => setIsSearchExpanded((prev) => !prev)}
        onToggleNotifications={() => setNotificationsOpen((prev) => !prev)}
        onSearchChange={setSearchQuery}
        onResetSplash={() => setShowSplash(true)}
      />

      <SidebarDrawer
        isOpen={isDrawerOpen}
        activeTab={activeTab}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          if (tab === "categorias") setSelectedCategory("Todos");
        }}
        onToggleNotifications={() => setNotificationsOpen(true)}
        onToast={triggerToast}
        onCategorySelect={(category) => setSelectedCategory(category)}
      />

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

      <main
        className="w-full px-0 md:px-3 py-0 pb-20"
        style={{ margin: 0, maxWidth: "100%" }}
      >
        {(activeTab === "home" ||
          activeTab === "noticias" ||
          activeTab === "categorias") && (
          <div className="space-y-10 animate-fade-in px-0 md:px-3">
            {featuredArticle && (
              <section
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#18181B] via-[#1F1F23] to-[#141416] border border-zinc-800/80 shadow-2xl group"
                style={{ borderRadius: 0, border: "0 solid transparent" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-[380px] overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#18181B]"></div>
                  </div>

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
                    <ArticleCard
                      key={art.id}
                      article={art}
                      onOpen={handleOpenArticle}
                      onLike={handleLikeArticle}
                      onSave={handleSaveArticle}
                    />
                  ))}
                </div>
              )}
            </section>

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

        {activeTab === "sobre" && (
          <div className="space-y-12 animate-fade-in max-w-5xl mx-auto">
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
                    desc: "Geramos transformação positiva a sociedade por meio da educação e da indústria.",
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ContactForm onSubmitSuccess={triggerToast} />
              <NewsletterForm onSubmitSuccess={triggerToast} />
            </div>
          </div>
        )}

        {activeTab === "admin" && (
          <div className="space-y-6 animate-fade-in">
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

            {adminTab === "noticias" && (
              <div className="space-y-4">
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
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${art.status === "Publicado" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}
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

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#18181B] border border-zinc-700/80 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6">
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

            <form
              onSubmit={handlePublishArticle}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
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
                      placeholder="Escreva o conteúdo completo da sua notícia aqui..."
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      className="w-full bg-zinc-900 p-4 text-xs text-white focus:outline-none resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
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

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as ArticleStatus,
                      })
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Publicado">Publicado</option>
                    <option value="Rascunho">Rascunho</option>
                  </select>
                </div>

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

      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-[#18181B] border border-zinc-700/80 rounded-3xl w-full max-w-3xl my-8 overflow-hidden shadow-2xl relative">
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

            <div className="p-6 md:p-8 space-y-6">
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

              <div className="space-y-4 text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                {selectedArticle.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}
