import type { Article, Category, NotificationItem } from "../types/article";

export const INITIAL_ARTICLES: Article[] = [
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

export const CATEGORIES: string[] = [
  "Todos",
  "Tecnologia",
  "Mecânica & Usinagem",
  "Construção Civil",
  "Eletrônica",
  "Automação",
  "Gestão & Negócios",
  "Design",
];

export const MOCK_CATEGORIES: Category[] = [
  { id: "all", name: "Todos" },
  { id: "tecnologia", name: "Tecnologia" },
  { id: "automacao", name: "Automação" },
  { id: "design", name: "Design" },
  { id: "projetos", name: "Projetos" },
  { id: "ia", name: "IA" },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "Nova matéria publicada!",
    message: "Tecnologia e inovação que transformam o futuro.",
    time: "Há 10 minutos",
  },
  {
    id: "n2",
    title: "Quiz de interesse atualizado",
    message: "Responda para receber recomendações de projetos.",
    time: "Há 1 hora",
  },
];
