import { Link } from "@tanstack/react-router";
import type { Article } from "@/content/articles";
import { getCategory } from "@/content/categories";

export function ArticleCard({ article }: { article: Article }) {
  const cat = getCategory(article.category);
  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className="group block rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-sm"
    >
      <div className="mb-2 flex items-center gap-2 text-xs">
        <span className="font-medium text-primary">{cat?.name}</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">{article.readingMinutes} min read</span>
      </div>
      <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary">
        {article.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{article.description}</p>
    </Link>
  );
}
