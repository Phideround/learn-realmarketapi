import { Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { articles } from "@/content/articles";
import { getCategory } from "@/content/categories";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [] as typeof articles;
    return articles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.description.toLowerCase().includes(term) ||
          a.tags.some((t) => t.toLowerCase().includes(term)),
      )
      .slice(0, 8);
  }, [q]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => {
          setOpen(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary"
        aria-label="Search articles"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] md:inline">
          ⌘K
        </kbd>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(92vw,28rem)] overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
          <div className="flex items-center gap-2 border-b border-border px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setOpen(false);
                  navigate({ to: "/search", search: { q } });
                }
              }}
              placeholder="Search guides, indicators, APIs…"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <ul className="max-h-80 overflow-y-auto py-1">
            {results.length === 0 && q && (
              <li className="px-4 py-6 text-center text-sm text-muted-foreground">No matches.</li>
            )}
            {results.length === 0 && !q && (
              <li className="px-4 py-6 text-center text-xs text-muted-foreground">
                Try “RSI”, “WebSocket”, “leverage”…
              </li>
            )}
            {results.map((a) => {
              const cat = getCategory(a.category);
              return (
                <li key={a.slug}>
                  <Link
                    to="/article/$slug"
                    params={{ slug: a.slug }}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 transition-colors hover:bg-secondary"
                  >
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {cat?.name}
                    </div>
                    <div className="truncate text-sm font-medium">{a.title}</div>
                  </Link>
                </li>
              );
            })}
          </ul>
          {q && (
            <div className="border-t border-border px-3 py-2 text-right">
              <button
                className="text-xs font-medium text-primary hover:underline"
                onClick={() => {
                  setOpen(false);
                  navigate({ to: "/search", search: { q } });
                }}
              >
                See all results →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
