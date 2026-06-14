import { createFileRoute, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCategory, categories, type Category } from "@/content/categories";
import { articlesByCategory } from "@/content/articles";
import { SITE, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }): { cat: Category } => {
    const cat = getCategory(params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { cat } = loaderData;
    const title = `${cat.name} — Trading Academy`;
    const url = `/category/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: cat.longDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: cat.longDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: cat.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: cat.name, url },
            ]),
          ),
        },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Category not found</h1>
      </div>
    </Layout>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData() as { cat: Category };
  const list = articlesByCategory(cat.slug);

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: cat.name },
          ]}
        />
        <header className="mb-6 max-w-3xl">
          <div className="mb-2 inline-flex items-center gap-2 text-xs">
            <span className="rounded-full bg-accent px-2.5 py-1 font-medium text-accent-foreground">
              {cat.level}
            </span>
            <span className="text-muted-foreground">{list.length} articles</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{cat.name}</h1>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-lg">{cat.longDescription}</p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Other tracks
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories
              .filter((c) => c.slug !== cat.slug)
              .map((c) => (
                <a
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:bg-secondary"
                >
                  {c.name}
                </a>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Make types happy: silence unused import warning for SITE
void SITE;
