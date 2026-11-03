export type ArticleStatus = "Publicado" | "Rascunho";

export type Article = {
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
  status: ArticleStatus;
  featured: boolean;
  likes: number;
  bookmarks: number;
};

export type ArticleFormData = {
  title: string;
  content: string;
  category: string;
  author: string;
  date: number | string;
  time: string;
  status: ArticleStatus;
  image: string;
};

export type Category = {
  id: string;
  name: string;
  slug?: string;
};

export type User = {
  id: string;
  name: string;
  course?: string;
  city?: string;
  state?: string;
  avatarUrl?: string;
  role?: "admin" | "editor" | "reader";
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
};
