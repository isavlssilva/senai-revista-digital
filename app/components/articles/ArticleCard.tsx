import { Heart, Bookmark } from "lucide-react";
import type { Article } from "../../../types/article";

type ArticleCardProps = {
  article: Article;
  onOpen: (article: Article) => void;
  onLike: (id: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  onSave: (id: string, e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function ArticleCard({
  article,
  onOpen,
  onLike,
  onSave,
}: ArticleCardProps) {
  return (
    <article
      key={article.id}
      onClick={() => onOpen(article)}
      className="bg-[#18181B] hover:bg-[#1F1F23] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-zinc-700 transition-all duration-300 flex flex-col cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden bg-zinc-900">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-black/70 backdrop-blur-md text-red-400 border border-red-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center text-[11px] text-zinc-400 gap-2 mb-2">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="font-bold text-base text-white group-hover:text-[#E51937] transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="text-zinc-400 text-xs mt-2 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
          <span className="font-medium truncate max-w-[140px] text-zinc-300">
            {article.author}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={(e) => onLike(article.id, e)}
              className="flex items-center gap-1 hover:text-[#E51937] transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-zinc-400 hover:fill-red-500 hover:text-red-500" />
              <span>{article.likes}</span>
            </button>
            <button
              onClick={(e) => onSave(article.id, e)}
              className="hover:text-white transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
