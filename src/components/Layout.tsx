import { Link } from "@tanstack/react-router";
import { Mail, Globe, BookOpen, KeyRound } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import logoAsset from "@/assets/logo.png.asset.json";
import { categories } from "@/content/categories";
import { GlobalSearch } from "./GlobalSearch";
import { socials } from "./SocialIcons";

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
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoAsset.url} alt="Trading Academy" className="h-7 w-7" width={28} height={28} />
          <span className="text-[15px] font-semibold tracking-tight">Trading Academy</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
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
        </nav>
        <div className="flex items-center gap-2">
          <GlobalSearch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2">
            <img src={logoAsset.url} alt="" className="h-6 w-6" width={24} height={24} />
            <span className="text-sm font-semibold">Trading Academy</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Free, education-first guides on trading, markets, and the data that powers them.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.name}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <s.Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Learn
          </h4>
          <ul className="space-y-1.5 text-sm">
            {categories.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/search" className="hover:text-primary">
                Search
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            RealMarketAPI
          </h4>
          <ul className="space-y-1.5 text-sm">
            <li>
              <a href="https://realmarketapi.com" rel="noopener" className="inline-flex items-center gap-1.5 hover:text-primary">
                <Globe className="h-3.5 w-3.5" /> Home
              </a>
            </li>
            <li>
              <a href="https://realmarketapi.com/docs" rel="noopener" className="inline-flex items-center gap-1.5 hover:text-primary">
                <BookOpen className="h-3.5 w-3.5" /> Documentation
              </a>
            </li>
            <li>
              <a href="https://realmarketapi.com/register" rel="noopener" className="inline-flex items-center gap-1.5 hover:text-primary">
                <KeyRound className="h-3.5 w-3.5" /> Get API key
              </a>
            </li>
            <li>
              <a href="/sitemap.xml" className="hover:text-primary">Sitemap</a>
            </li>
            <li>
              <a href="/rss.xml" className="hover:text-primary">RSS</a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Contact
          </h4>
          <ul className="space-y-1.5 text-sm">
            <li>
              <a href="mailto:admin@realmarketapi.com" className="inline-flex items-center gap-1.5 hover:text-primary">
                <Mail className="h-3.5 w-3.5" /> admin@realmarketapi.com
              </a>
            </li>
            <li>
              <a href="mailto:support@realmarketapi.com" className="inline-flex items-center gap-1.5 hover:text-primary">
                <Mail className="h-3.5 w-3.5" /> support@realmarketapi.com
              </a>
            </li>
            <li>
              <a href="https://realmarketapi.com" rel="noopener" className="inline-flex items-center gap-1.5 hover:text-primary">
                <Globe className="h-3.5 w-3.5" /> realmarketapi.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-1.5 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
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
