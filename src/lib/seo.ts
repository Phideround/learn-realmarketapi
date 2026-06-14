import type { Article } from "@/content/articles";
import { getCategory } from "@/content/categories";

export const SITE = {
  name: "Trading Academy",
  url: "https://learn.realmarketapi.com",
  description:
    "A free, education-first knowledge base on trading, technical analysis, indicators, risk management, and market data infrastructure.",
  twitter: "@realmarketapi",
};

export function articleJsonLd(article: Article) {
  const url = `${SITE.url}/article/${article.slug}`;
  const cat = getCategory(article.category);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.updated,
    dateModified: article.updated,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/favicon.ico` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: cat?.name ?? "Trading",
    keywords: article.tags.join(", "),
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.url}`,
    })),
  };
}

export function faqJsonLd(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
