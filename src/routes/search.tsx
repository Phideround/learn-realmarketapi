import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { articles } from "@/content/articles";
import { getCategory } from "@/content/categories";

const searchSchema = z.object({ q: z.string().optional().catch("") });

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Search — Trading Academy" },
      { name: "description", content: "Search 100+ guides on trading, technical analysis, indicators, risk management, and market data." },
      { property: "og:title", content: "Search — Trading Academy" },
      { property: "og:url", content: "/search" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const [query, setQuery] = useState(q ?? "");

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return articles.slice(0, 20);
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(term) ||
        a.description.toLowerCase().includes(term) ||
        a.tags.some((t) => t.toLowerCase().includes(term)),
    );
  }, [query]);

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Search the knowledge base</h1>
        <p className="mt-2 text-muted-foreground">{articles.length} articles indexed.</p>
        <div className="mt-6">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: RSI, leverage, WebSocket API…"
            autoFocus
            className="w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="mt-8">
          <p className="mb-4 text-sm text-muted-foreground">
            {results.length} result{results.length === 1 ? "" : "s"}
          </p>
          <ul className="divide-y divide-border">
            {results.map((a) => {
              const cat = getCategory(a.category);
              return (
                <li key={a.slug} className="py-4">
                  <Link
                    to="/article/$slug"
                    params={{ slug: a.slug }}
                    className="group block"
                  >
                    <div className="text-xs text-muted-foreground">{cat?.name} · {a.readingMinutes} min</div>
                    <div className="mt-0.5 text-base font-semibold group-hover:text-primary">{a.title}</div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{a.description}</p>
                  </Link>
                </li>
              );
            })}
            {results.length === 0 && (
              <li className="py-8 text-center text-muted-foreground">No matches. Try another keyword.</li>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
