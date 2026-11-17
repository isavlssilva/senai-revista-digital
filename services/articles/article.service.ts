import { apiClient } from "../api/client";
import type { Article, ArticleFormData } from "../../types/article";

export const articleService = {
  async getAll(): Promise<Article[]> {
    return apiClient.get<Article[]>("/api/articles");
  },

  async getById(id: string): Promise<Article> {
    return apiClient.get<Article>(`/api/articles/${id}`);
  },

  async create(data: ArticleFormData): Promise<Article> {
    return apiClient.post<Article>("/api/articles", data);
  },

  async update(id: string, data: ArticleFormData): Promise<Article> {
    return apiClient.put<Article>(`/api/articles/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    await apiClient.del<void>(`/api/articles/${id}`);
  },
};
