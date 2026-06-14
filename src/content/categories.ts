export interface Category {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  order: number;
}

export const categories: Category[] = [
  {
    slug: "trading-basics",
    name: "Trading Basics",
    description: "Foundations of markets, instruments, and order mechanics for new traders.",
    longDescription:
      "Start here. Learn how markets work, what you can trade, how orders are matched, and the core vocabulary every trader needs before risking real capital.",
    level: "Beginner",
    order: 1,
  },
  {
    slug: "technical-analysis",
    name: "Technical Analysis",
    description: "Read price action, structure, patterns, and volume to time entries and exits.",
    longDescription:
      "Technical analysis turns raw price into decisions. Master support and resistance, trend, structure, classic patterns, candlesticks, and volume.",
    level: "Intermediate",
    order: 2,
  },
  {
    slug: "indicators",
    name: "Indicators",
    description: "How the most-used indicators are calculated, what they reveal, and where they fail.",
    longDescription:
      "Indicators compress price and volume into signals. Understand the math behind RSI, MACD, Bollinger Bands, moving averages, ATR, VWAP, Ichimoku, ADX and more.",
    level: "Intermediate",
    order: 3,
  },
  {
    slug: "risk-management",
    name: "Risk Management",
    description: "Position sizing, drawdown control, and the psychology of staying in the game.",
    longDescription:
      "Risk management is what separates careers from blow-ups. Position sizing, R-multiples, drawdown discipline, and the behavioral edges that compound over time.",
    level: "Intermediate",
    order: 4,
  },
  {
    slug: "advanced-trading",
    name: "Advanced Trading",
    description: "Quantitative methods, algorithmic execution, microstructure, and edge research.",
    longDescription:
      "For traders going beyond charts. Quant frameworks, algorithmic execution, HFT principles, smart money concepts, liquidity, and statistical arbitrage.",
    level: "Advanced",
    order: 5,
  },
  {
    slug: "market-data",
    name: "Market Data & Infrastructure",
    description: "APIs, real-time data, latency, and building production trading applications.",
    longDescription:
      "The infrastructure side of trading: tick data, REST and WebSocket APIs, latency budgets, pipelines, and how to build AI-powered trading applications.",
    level: "Advanced",
    order: 6,
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
