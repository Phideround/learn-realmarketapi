import { Link } from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import logoAsset from "@/assets/logo.png.asset.json";
import { categories } from "@/content/categories";

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoAsset.url} alt="Trading Academy" className="h-8 w-8" width={32} height={32} />
          <span className="text-[15px] font-semibold tracking-tight">Trading Academy</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {categories.slice(0, 5).map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {c.name}
            </Link>
          ))}
          <Link
            to="/search"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Search
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src={logoAsset.url} alt="" className="h-6 w-6" width={24} height={24} />
            <span className="text-sm font-semibold">Trading Academy</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            A free, education-first knowledge base on trading, markets, and the data that powers them.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Learn</h4>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/search" className="hover:text-primary">Search</Link></li>
            <li><a href="/sitemap.xml" className="hover:text-primary">Sitemap</a></li>
            <li><a href="/rss.xml" className="hover:text-primary">RSS feed</a></li>
            <li><a href="/llms.txt" className="hover:text-primary">llms.txt</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Market data</h4>
          <p className="text-sm text-muted-foreground">
            Production-grade REST &amp; WebSocket market data for equities, FX, crypto, and commodities.
          </p>
          <a
            href="https://realmarketapi.com"
            rel="noopener"
            className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
          >
            RealMarketAPI →
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} Trading Academy. Educational content — not financial advice.</span>
          <span>Built for learn.realmarketapi.com</span>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
