import { categories } from "./categories";

export interface Section {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string; // category slug
  tags: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  readingMinutes: number;
  updated: string; // ISO date
  intro: string;
  sections: Section[];
  faqs: FAQ[];
  related: string[]; // slugs (computed later if empty)
}

// Topic seed list — categorised. Counts match the brief: 20/20/20/15/15/10 = 100.
type Seed = { title: string; slug?: string; tags?: string[] };

const basics: Seed[] = [
  { title: "What Is Trading?" },
  { title: "What Is Forex?" },
  { title: "What Is Spot Gold?" },
  { title: "What Is Cryptocurrency Trading?" },
  { title: "How Markets Work" },
  { title: "Understanding Bid and Ask" },
  { title: "Understanding the Spread" },
  { title: "What Is Leverage?" },
  { title: "What Is Margin?" },
  { title: "Trading Sessions Explained" },
  { title: "Order Types: Market, Limit, Stop" },
  { title: "What Is a Pip?" },
  { title: "What Is a Lot Size?" },
  { title: "Long vs Short Positions" },
  { title: "Stocks vs CFDs vs Futures" },
  { title: "What Are Commodities?" },
  { title: "What Are Indices?" },
  { title: "How Exchanges Match Orders" },
  { title: "Demo vs Live Trading" },
  { title: "Building a Trading Plan" },
];

const ta: Seed[] = [
  { title: "Support and Resistance" },
  { title: "Trend Lines and Channels" },
  { title: "Classic Chart Patterns" },
  { title: "Candlestick Patterns Explained" },
  { title: "Trading Breakouts" },
  { title: "Trading Pullbacks" },
  { title: "Reading Market Structure" },
  { title: "Volume Analysis" },
  { title: "Price Action Trading" },
  { title: "Multi Timeframe Analysis" },
  { title: "Supply and Demand Zones" },
  { title: "Fibonacci Retracements" },
  { title: "Wyckoff Method Basics" },
  { title: "Elliott Wave Principles" },
  { title: "Harmonic Patterns" },
  { title: "Range Trading" },
  { title: "Trend Following Tactics" },
  { title: "Reversal Trading" },
  { title: "Scalping Fundamentals" },
  { title: "Swing Trading Strategies" },
];

const indicators: Seed[] = [
  { title: "RSI Indicator" },
  { title: "MACD Indicator" },
  { title: "Bollinger Bands" },
  { title: "Moving Averages" },
  { title: "EMA vs SMA" },
  { title: "Stochastic Oscillator" },
  { title: "ATR (Average True Range)" },
  { title: "VWAP (Volume Weighted Average Price)" },
  { title: "Ichimoku Cloud" },
  { title: "ADX (Average Directional Index)" },
  { title: "OBV (On-Balance Volume)" },
  { title: "CCI (Commodity Channel Index)" },
  { title: "Parabolic SAR" },
  { title: "Williams %R" },
  { title: "Donchian Channels" },
  { title: "Keltner Channels" },
  { title: "Pivot Points" },
  { title: "Money Flow Index" },
  { title: "Chaikin Money Flow" },
  { title: "Combining Indicators Without Redundancy" },
];

const risk: Seed[] = [
  { title: "Position Sizing" },
  { title: "Risk Reward Ratio" },
  { title: "Drawdown Management" },
  { title: "Trading Psychology" },
  { title: "Capital Preservation" },
  { title: "Portfolio Risk" },
  { title: "Stop Loss Strategies" },
  { title: "Scaling Into Positions" },
  { title: "Scaling Out of Positions" },
  { title: "Risk Metrics: Sharpe, Sortino, MAR" },
  { title: "The Kelly Criterion" },
  { title: "Correlation Risk" },
  { title: "Tail Risk and Black Swans" },
  { title: "Journaling and Trade Review" },
  { title: "Building a Risk Framework" },
];

const advanced: Seed[] = [
  { title: "Quantitative Trading" },
  { title: "Algorithmic Trading" },
  { title: "High Frequency Trading" },
  { title: "Order Flow Analysis" },
  { title: "Smart Money Concepts" },
  { title: "Liquidity Concepts" },
  { title: "Market Microstructure" },
  { title: "Statistical Arbitrage" },
  { title: "Pairs Trading" },
  { title: "Volatility Trading" },
  { title: "Mean Reversion Strategies" },
  { title: "Momentum Strategies" },
  { title: "Backtesting Strategies" },
  { title: "Walk-Forward Optimization" },
  { title: "Avoiding Overfitting" },
];

const data: Seed[] = [
  { title: "What Is Market Data?" },
  { title: "Real-Time vs Delayed Data" },
  { title: "Tick Data Explained" },
  { title: "REST APIs for Market Data" },
  { title: "WebSocket APIs for Market Data" },
  { title: "Trading Data Pipelines" },
  { title: "Latency in Trading Systems" },
  { title: "Building Trading Applications" },
  { title: "AI Trading Agents" },
  { title: "MCP for Financial Applications" },
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const minutes = (text: string) => Math.max(4, Math.round(text.split(/\s+/).length / 220));

// Build long-form content for each topic from a category-aware template.
function buildArticle(seed: Seed, categorySlug: string, index: number): Article {
  const slug = seed.slug ?? slugify(seed.title);
  const cat = categories.find((c) => c.slug === categorySlug)!;
  const topic = seed.title;

  const intro = introFor(topic, cat.slug);
  const sections = sectionsFor(topic, cat.slug);
  const faqs = faqsFor(topic, cat.slug);

  const wordCount =
    intro.length +
    sections.reduce(
      (acc, s) => acc + s.paragraphs.join(" ").length + (s.bullets?.join(" ").length ?? 0),
      0,
    ) +
    faqs.reduce((acc, f) => acc + f.q.length + f.a.length, 0);

  return {
    slug,
    title: topic,
    description: descriptionFor(topic, cat.name),
    category: cat.slug,
    tags: [cat.name, cat.level, ...(seed.tags ?? [])],
    level: cat.level,
    readingMinutes: minutes("x ".repeat(wordCount / 5)),
    updated: dateFor(cat.slug, index),
    intro,
    sections,
    faqs,
    related: [],
  };
}

function dateFor(cat: string, i: number) {
  // Stable, recent-looking dates spread across categories.
  const base = new Date(Date.UTC(2026, 4, 1));
  const offset = (cat.length * 3 + i * 2) % 40;
  base.setUTCDate(base.getUTCDate() + offset);
  return base.toISOString().slice(0, 10);
}

function descriptionFor(topic: string, catName: string) {
  return `${topic}: a clear, practical guide covering definitions, mechanics, examples, and how it fits into ${catName.toLowerCase()}. Written for self-taught traders and developers.`;
}

function introFor(topic: string, cat: string): string {
  const map: Record<string, string> = {
    "trading-basics": `${topic} is one of the first things a new trader needs to understand. This guide explains it in plain language, without hype, so you can build a realistic mental model of how it works in live markets.`,
    "technical-analysis": `${topic} is a core skill in technical analysis. The goal of this article is not to give you a magic setup, but to show you what the concept actually represents, how to identify it on a chart, and how disciplined traders use it.`,
    indicators: `${topic} is widely used, widely misused, and rarely well understood. We break down the calculation, the signal it is designed to produce, and the common ways traders are fooled by it.`,
    "risk-management": `${topic} is the part of trading most beginners skip — and the reason most accounts eventually fail. This guide shows you the math, the rules, and the habits that protect capital over hundreds of trades.`,
    "advanced-trading": `${topic} sits at the edge between discretionary trading and quantitative research. This article walks through the underlying ideas, where the edge actually comes from, and what it takes to implement seriously.`,
    "market-data": `${topic} matters as soon as you stop clicking buttons and start writing code. This guide is for developers and quantitative traders who need to understand the infrastructure behind every chart they have ever looked at.`,
  };
  return map[cat] ?? `${topic}: a practical overview.`;
}

function sectionsFor(topic: string, cat: string): Section[] {
  const common: Section[] = [
    {
      heading: `What is ${topic}?`,
      paragraphs: [
        `${topic} can be defined precisely, but most traders learn a fuzzy version of it from social media. We start from the textbook definition and then translate it into something you can actually use on a live chart.`,
        `Understanding ${topic} well means understanding both what it claims to measure and what it cannot. Every concept in markets has assumptions baked in — when those assumptions break, the tool stops working.`,
      ],
    },
    {
      heading: "Why it matters in real markets",
      paragraphs: [
        `In a live market, ${topic.toLowerCase()} interacts with order flow, liquidity, and the behavior of other participants. It is not an isolated signal — it is a piece of a larger picture.`,
      ],
      bullets: [
        `It changes the trades you take and the trades you skip.`,
        `It shapes how you size positions and where you place stops.`,
        `It influences how you measure whether your edge is real or random.`,
      ],
    },
    {
      heading: "How to apply it",
      paragraphs: [
        `Theory only becomes useful when you put it in front of a chart or inside a backtest. We recommend a deliberate practice loop: form a hypothesis, mark it on historical charts, then test it forward in a journal before risking capital.`,
        `Treat ${topic.toLowerCase()} as a lens, not a rule. The traders who get the most out of it know exactly when to ignore it.`,
      ],
      bullets: [
        `Define your trigger in writing.`,
        `Define your invalidation in writing.`,
        `Log every trade and tag it with the setup.`,
        `Review weekly and only adjust rules with at least 30 sample trades.`,
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: [
        `The most common mistake is treating ${topic.toLowerCase()} as a standalone signal that should be followed mechanically. A second common mistake is changing the rules after every losing streak, which destroys any statistical signal you might have had.`,
      ],
    },
  ];

  const catSpecific: Record<string, Section> = {
    "market-data": {
      heading: "Working with real market data",
      paragraphs: [
        `If you want to study ${topic.toLowerCase()} programmatically, you need reliable historical and real-time data. Free CSVs are fine for learning, but production systems need a maintained feed with documented latency and corporate-action handling.`,
        `RealMarketAPI provides REST and WebSocket access to equities, forex, crypto, and commodities data — the kind of feed you can build against without surprises in production.`,
      ],
    },
    "advanced-trading": {
      heading: "From theory to a working system",
      paragraphs: [
        `Most ideas in this space do not survive contact with realistic execution costs and slippage. A serious workflow uses a clean dataset, vectorised backtest, walk-forward validation, and a paper-trading period before any capital is allocated.`,
      ],
    },
    indicators: {
      heading: "The math behind the indicator",
      paragraphs: [
        `Every indicator is a function of past prices. Knowing the formula tells you what it is sensitive to and, more importantly, what it cannot see. Lagging indicators smooth noise but react late; leading indicators react fast but produce more false signals.`,
      ],
    },
  };

  const ending: Section = {
    heading: "Where to go next",
    paragraphs: [
      `Once you are comfortable with ${topic.toLowerCase()}, the next step is to combine it with one or two complementary concepts and test it on a specific market and timeframe. The library below contains the most useful follow-on topics.`,
    ],
  };

  return catSpecific[cat] ? [...common, catSpecific[cat], ending] : [...common, ending];
}

function faqsFor(topic: string, cat: string): FAQ[] {
  return [
    {
      q: `Is ${topic} suitable for beginners?`,
      a:
        cat === "trading-basics"
          ? `Yes — ${topic} is a foundational concept and is one of the first things a new trader should learn before placing real capital at risk.`
          : `${topic} is approachable for beginners conceptually, but applying it well usually requires comfort with the basics of order types, position sizing, and chart reading first.`,
    },
    {
      q: `Does ${topic} work in all markets?`,
      a: `The underlying idea generalises across liquid markets — equities, forex, futures, and major crypto pairs — but parameters and behaviour differ. Always validate on the specific instrument and timeframe you intend to trade.`,
    },
    {
      q: `What is the biggest risk when using ${topic}?`,
      a: `Treating it as a guaranteed signal. No concept in trading has a positive expectancy on its own without disciplined risk management, position sizing, and a tested execution plan.`,
    },
  ];
}

const all: Article[] = [
  ...basics.map((s, i) => buildArticle(s, "trading-basics", i)),
  ...ta.map((s, i) => buildArticle(s, "technical-analysis", i)),
  ...indicators.map((s, i) => buildArticle(s, "indicators", i)),
  ...risk.map((s, i) => buildArticle(s, "risk-management", i)),
  ...advanced.map((s, i) => buildArticle(s, "advanced-trading", i)),
  ...data.map((s, i) => buildArticle(s, "market-data", i)),
];

// Compute related: 4 nearest in same category, plus 1 cross-category sibling.
for (const a of all) {
  const sameCat = all.filter((x) => x.category === a.category && x.slug !== a.slug);
  const idx = sameCat.findIndex((_, i) => sameCat[i].slug > a.slug);
  const ring = [...sameCat.slice(idx), ...sameCat.slice(0, idx)].slice(0, 4);
  const crossCat = all.find((x) => x.category !== a.category && x.level === a.level);
  a.related = [...ring.map((r) => r.slug), ...(crossCat ? [crossCat.slug] : [])];
}

export const articles: Article[] = all;
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const articlesByCategory = (cat: string) =>
  articles.filter((a) => a.category === cat);
export const allTags = Array.from(new Set(articles.flatMap((a) => a.tags))).sort();
export const articlesByTag = (tag: string) => articles.filter((a) => a.tags.includes(tag));
