import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { articles } from "@/content/articles";
import { categories } from "@/content/categories";

const BASE_URL = "https://learn.realmarketapi.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/search", changefreq: "monthly", priority: "0.3" },
          ...categories.map((c) => ({
            path: `/category/${c.slug}`,
            changefreq: "weekly",
            priority: "0.8",
          })),
          ...articles.map((a) => ({
            path: `/article/${a.slug}`,
            lastmod: a.updated,
            changefreq: "monthly",
            priority: "0.7",
          })),
        ];

        const body = urls
          .map((u) =>
            [
              "  <url>",
              `    <loc>${BASE_URL}${u.path}</loc>`,
              "lastmod" in u && u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : null,
              `    <changefreq>${u.changefreq}</changefreq>`,
              `    <priority>${u.priority}</priority>`,
              "  </url>",
            ]
              .filter(Boolean)
              .join("\n"),
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
