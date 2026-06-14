import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import { articles, getArticle, type Article } from "@/content/articles";
import { getCategory } from "@/content/categories";
import { SITE, articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/article/$slug")({
  loader: ({ params }): { article: Article } => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { article } = loaderData;
    const cat = getCategory(article.category);
    const url = `/article/${params.slug}`;
    return {
      meta: [
        { title: `${article.title} — Trading Academy` },
        { name: "description", content: article.description },
        { name: "keywords", content: article.tags.join(", ") },
        { name: "author", content: SITE.name },
        { property: "article:published_time", content: article.updated },
        { property: "article:modified_time", content: article.updated },
        { property: "article:section", content: cat?.name ?? "Trading" },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: article.title },
        { name: "twitter:description", content: article.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(articleJsonLd(article)) },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: cat?.name ?? "Articles", url: `/category/${article.category}` },
              { name: article.title, url },
            ]),
          ),
        },
        { type: "application/ld+json", children: JSON.stringify(faqJsonLd(article.faqs)) },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Article not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">
          Back home
        </Link>
      </div>
    </Layout>
  ),
});

function slugifyHeading(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };
  const cat = getCategory(article.category);
  const related = article.related
    .map((s) => articles.find((a) => a.slug === s))
    .filter(Boolean) as typeof articles;

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: cat?.name ?? "Articles", to: "/category/$slug", params: { slug: article.category } },
            { label: article.title },
          ]}
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
          <article>
            <header className="mb-10">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-accent px-2.5 py-1 font-medium text-accent-foreground">
                  {cat?.name}
                </span>
                <span className="text-muted-foreground">{article.level}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{article.readingMinutes} min read</span>
                <span className="text-muted-foreground">·</span>
                <time className="text-muted-foreground" dateTime={article.updated}>
                  Updated {new Date(article.updated).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </time>
              </div>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {article.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{article.intro}</p>
            </header>

            <div className="prose-article max-w-none">
              {article.sections.map((s) => {
                const id = slugifyHeading(s.heading);
                return (
                  <section key={id}>
                    <h2 id={id}>{s.heading}</h2>
                    {s.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                    {s.bullets && (
                      <ul>
                        {s.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })}

              <section>
                <h2 id="faq">Frequently asked questions</h2>
                {article.faqs.map((f, i) => (
                  <div key={i} className="mb-4">
                    <h3>{f.q}</h3>
                    <p>{f.a}</p>
                  </div>
                ))}
              </section>
            </div>

            {/* Author */}
            <div className="mt-12 rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  TA
                </div>
                <div>
                  <div className="text-sm font-semibold">Trading Academy Editors</div>
                  <div className="text-xs text-muted-foreground">
                    Independent education team. Reviewed by practising traders and engineers.
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 rounded-lg border border-border bg-accent/30 p-6">
              <h3 className="text-base font-semibold">Want to build on real data?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                RealMarketAPI gives you REST and WebSocket access to global market data with documented latency.
              </p>
              <a
                href="https://realmarketapi.com"
                rel="noopener"
                className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
              >
                Explore RealMarketAPI →
              </a>
            </div>
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contents
            </h4>
            <nav className="border-l border-border pl-4 text-sm">
              <ul className="space-y-2">
                {article.sections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${slugifyHeading(s.heading)}`} className="text-muted-foreground hover:text-primary">
                      {s.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#faq" className="text-muted-foreground hover:text-primary">
                    FAQ
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <h2 className="mb-6 text-xl font-semibold tracking-tight">Related articles</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ArticleCard key={r.slug} article={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
