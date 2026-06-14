import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { articles } from "@/content/articles";

const BASE_URL = "https://learn.realmarketapi.com";

const escapeXml = (s: string) =>
  s.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!),
  );

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: () => {
        const items = [...articles]
          .sort((a, b) => (a.updated < b.updated ? 1 : -1))
          .slice(0, 50)
          .map(
            (a) => `  <item>
    <title>${escapeXml(a.title)}</title>
    <link>${BASE_URL}/article/${a.slug}</link>
    <guid>${BASE_URL}/article/${a.slug}</guid>
    <pubDate>${new Date(a.updated).toUTCString()}</pubDate>
    <description>${escapeXml(a.description)}</description>
  </item>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Trading Academy</title>
  <link>${BASE_URL}</link>
  <description>Education-first guides on trading, markets, and market data.</description>
  <language>en-us</language>
${items}
</channel>
</rss>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/rss+xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
