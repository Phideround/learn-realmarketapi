import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ArticleCard } from "@/components/ArticleCard";
import { categories } from "@/content/categories";
import { articles, articlesByCategory } from "@/content/articles";
import { SITE } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trading Academy — Learn Trading, Markets & Market Data" },
      {
        name: "description",
        content:
          "Free, education-first guides on trading, technical analysis, indicators, risk management, and market data infrastructure. 100+ articles from beginner to advanced.",
      },
      { property: "og:title", content: "Trading Academy" },
      { property: "og:description", content: SITE.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Trading Academy" },
      { name: "twitter:description", content: SITE.description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          url: SITE.url,
          description: SITE.description,
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = articles.slice(0, 6);
  return (
    <Layout>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-border bg-accent/40 px-3 py-1 text-xs font-medium text-accent-foreground">
              100+ guides · updated regularly
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Learn how markets <span className="text-primary">actually</span> work.
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Trading Academy is a free knowledge base for traders and developers. Clear explanations of
              charts, indicators, risk, microstructure, and the APIs that power modern trading — without hype.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                to="/category/$slug"
                params={{ slug: "trading-basics" }}
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start with the basics
              </Link>
              <Link
                to="/category/$slug"
                params={{ slug: "market-data" }}
                className="inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
              >
                For developers
              </Link>
              <a
                href="https://realmarketapi.com/docs"
                rel="noopener"
                className="inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
              >
                API docs ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold tracking-tight">Browse by topic</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Six tracks, beginner to advanced. Every article is self-contained.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const count = articlesByCategory(c.slug).length;
            return (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div className="mb-1.5 flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-accent px-2 py-0.5 font-medium text-accent-foreground">
                    {c.level}
                  </span>
                  <span className="text-muted-foreground">{count} articles</span>
                </div>
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary">
                  {c.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Recent guides</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* Learning paths */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Learning paths</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { level: "Beginner", desc: "Markets, orders, leverage and your first trading plan.", slug: "trading-basics" },
            { level: "Intermediate", desc: "Technical analysis, indicators, and risk frameworks.", slug: "technical-analysis" },
            { level: "Advanced", desc: "Quant, algo execution, microstructure, and APIs.", slug: "advanced-trading" },
          ].map((p) => (
            <Link
              key={p.slug}
              to="/category/$slug"
              params={{ slug: p.slug }}
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-secondary"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">{p.level}</div>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-xl border border-border bg-accent/30 p-6 md:p-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-xl font-semibold">Build on real market data</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                When you're ready to go from charts to code,{" "}
                <a href="https://realmarketapi.com" rel="noopener" className="font-medium text-primary hover:underline">
                  RealMarketAPI
                </a>{" "}
                provides REST &amp; WebSocket feeds for equities, FX, crypto, and commodities — see the{" "}
                <a href="https://realmarketapi.com/docs" rel="noopener" className="font-medium text-primary hover:underline">
                  developer docs
                </a>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://realmarketapi.com/register"
                rel="noopener"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Get free API key →
              </a>
              <a
                href="https://realmarketapi.com/docs"
                rel="noopener"
                className="inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary"
              >
                Read the docs
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
