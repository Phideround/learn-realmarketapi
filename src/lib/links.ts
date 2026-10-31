import type { Article } from "@/content/articles";

export const REALMARKETAPI_URL = "https://realmarketapi.com";
export const CALCULATORS_URL = "https://calculator.realmarketapi.com";
export const GAME_URL = "https://game.realmarketapi.com";

/** Adds the learn-site UTM tags; `placement` becomes utm_campaign. */
export function withUtm(url: string, placement: string): string {
  const u = new URL(url);
  u.searchParams.set("utm_source", "learn");
  u.searchParams.set("utm_medium", "referral");
  u.searchParams.set("utm_campaign", placement);
  return u.toString();
}

export const productLinks = {
  home: (placement: string) => withUtm(REALMARKETAPI_URL, placement),
  register: (placement: string) => withUtm(`${REALMARKETAPI_URL}/register`, placement),
  docs: (placement: string) => withUtm(`${REALMARKETAPI_URL}/docs`, placement),
  calculators: (placement: string) => withUtm(CALCULATORS_URL, placement),
  game: (placement: string) => withUtm(GAME_URL, placement),
};

export interface CalculatorLink {
  name: string;
  path: string; // "" = calculators home
}

const calculators = {
  positionSize: { name: "Position Size Calculator", path: "/position-size" },
  risk: { name: "Risk Calculator", path: "/risk" },
  drawdown: { name: "Drawdown Calculator", path: "/drawdown" },
  margin: { name: "Margin Calculator", path: "/margin" },
  profit: { name: "Profit Calculator", path: "/profit" },
  pipValue: { name: "Pip Value Calculator", path: "/pip-value" },
  riskReward: { name: "Risk/Reward Calculator", path: "/risk-reward" },
  home: { name: "Trading Calculators", path: "" },
} satisfies Record<string, CalculatorLink>;

// Article slug -> the calculator that best matches its topic.
const calculatorBySlug: Record<string, CalculatorLink> = {
  // risk-management
  "position-sizing": calculators.positionSize,
  "risk-reward-ratio": calculators.riskReward,
  "drawdown-management": calculators.drawdown,
  "capital-preservation": calculators.drawdown,
  "portfolio-risk": calculators.risk,
  "stop-loss-strategies": calculators.positionSize,
  "scaling-into-positions": calculators.positionSize,
  "scaling-out-of-positions": calculators.profit,
  "risk-metrics-sharpe-sortino-mar": calculators.drawdown,
  "the-kelly-criterion": calculators.risk,
  "correlation-risk": calculators.risk,
  "tail-risk-and-black-swans": calculators.drawdown,
  "journaling-and-trade-review": calculators.riskReward,
  "building-a-risk-framework": calculators.risk,
  // trading-basics topics with an obvious calculator
  "what-is-a-pip": calculators.pipValue,
  "what-is-margin": calculators.margin,
  "what-is-leverage": calculators.margin,
  "what-is-a-lot-size": calculators.positionSize,
};

/**
 * The calculator to promote at the end of an article, or undefined when the
 * article has no calculator angle. Risk-management articles always get one,
 * falling back to the calculators home.
 */
export function calculatorFor(article: Article): (CalculatorLink & { href: string }) | undefined {
  const calc =
    calculatorBySlug[article.slug] ??
    (article.category === "risk-management" ? calculators.home : undefined);
  if (!calc) return undefined;
  return { ...calc, href: withUtm(`${CALCULATORS_URL}${calc.path}`, "article_calculator") };
}
