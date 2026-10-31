import type { Seed } from "./articles";

// Hand-written guides. These use the optional seed overrides (description,
// intro, sections, faqs, updated) instead of the category template.

export const wmaGuide: Seed = {
  title: "Weighted Moving Average (WMA) Explained",
  tags: ["WMA", "Moving Averages", "API"],
  updated: "2026-10-31",
  description:
    "How the Weighted Moving Average is calculated, a worked example, how it compares with the SMA and EMA, common periods, pitfalls, and how to fetch WMA values from an API.",
  intro:
    "The Weighted Moving Average (WMA) is a moving average that gives the most recent candle the largest weight and the oldest candle the smallest, in a straight line. It reacts faster than a Simple Moving Average without the infinite memory of an Exponential Moving Average. This guide covers the exact formula, a calculation you can check by hand, and where the WMA helps or hurts.",
  sections: [
    {
      heading: "What is a Weighted Moving Average?",
      paragraphs: [
        "A WMA of period n looks at the last n closing prices and multiplies each one by a weight. The newest close gets weight n, the one before it n − 1, and so on down to the oldest close, which gets weight 1. The weighted values are summed and divided by the sum of the weights.",
        "Because the weights fall off linearly, a new price has a large effect on the WMA immediately, and a price that is about to leave the window already contributes very little. That is why the WMA turns earlier than an SMA of the same length.",
      ],
    },
    {
      heading: "The formula",
      paragraphs: [
        "With P1 the newest close and Pn the oldest close in the window: WMA = (n·P1 + (n−1)·P2 + … + 2·P(n−1) + 1·Pn) / (n(n+1)/2).",
        "The denominator n(n+1)/2 is just the sum 1 + 2 + … + n. For a 5-period WMA it is 15, for 10 periods it is 55, and for 21 periods it is 231. Dividing by it keeps the result on the same price scale as the input.",
      ],
      code: {
        language: "javascript",
        content: `// closes: oldest first, newest last
function wma(closes, period) {
  const denom = (period * (period + 1)) / 2;
  const out = [];
  for (let i = period - 1; i < closes.length; i++) {
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += closes[i - j] * (period - j); // newest gets weight = period
    }
    out.push(sum / denom);
  }
  return out;
}`,
      },
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Take five closes, oldest to newest: 10, 11, 12, 13, 14. For a 5-period WMA the weights are 1, 2, 3, 4, 5 in that order.",
        "Weighted sum = 10×1 + 11×2 + 12×3 + 13×4 + 14×5 = 10 + 22 + 36 + 52 + 70 = 190. Divide by 15 and the WMA is 12.67.",
        "The 5-period SMA of the same closes is 60 / 5 = 12.00. In a steady uptrend the WMA sits closer to the latest price because the latest prices count more. An EMA(5) seeded from the first close lands at about 12.40 here, between the two, although the EMA value depends on how it was seeded.",
      ],
    },
    {
      heading: "WMA vs SMA vs EMA",
      paragraphs: [
        "All three smooth price, but they distribute weight differently, and that decides how fast they react and how much noise they let through.",
      ],
      bullets: [
        "SMA: every price in the window has equal weight. Smoothest and slowest; it also jumps when an old, extreme price drops out of the window.",
        "WMA: weights fall linearly to zero at the edge of the window. Faster than an SMA of the same period, and old prices fade out gradually instead of dropping off a cliff.",
        "EMA: weights decay geometrically and never quite reach zero, so every past price still has a tiny influence. Responsive like a WMA, but its early values depend on the seed.",
        "For the same period, lag is roughly SMA > EMA ≈ WMA. The differences matter most around turning points, not in quiet trends.",
      ],
    },
    {
      heading: "Common periods and uses",
      paragraphs: [
        "There is nothing magic about any period, but a few show up often because traders share conventions.",
      ],
      bullets: [
        "9 or 10: short-term trend and momentum on intraday charts.",
        "21: a common swing-trading baseline on H1 to D1 charts.",
        "50 and 100: medium-term trend filters.",
        "Crossovers of a fast and slow WMA (for example 10 and 21) as a trend-change trigger.",
        "As a building block: the Hull Moving Average is built from WMAs to reduce lag further.",
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: [
        "Faster is not automatically better. The responsiveness that gets you in earlier also produces more whipsaws in ranging markets, so a WMA crossover system will usually trade more often and pay more in spreads than an SMA version.",
      ],
      bullets: [
        "Comparing a WMA and an SMA with the same period and assuming they mean the same thing. A 21 WMA reacts noticeably faster than a 21 SMA.",
        "Using it on an incomplete candle. The last value changes until the candle closes; decide whether your rules use closed candles only.",
        "Optimising the period on one market and timeframe, then assuming it transfers to another.",
        "Treating price crossing the WMA as a signal on its own, without a trend or volatility filter.",
      ],
    },
    {
      heading: "Getting WMA values from RealMarketAPI",
      paragraphs: [
        "You do not have to calculate the WMA yourself. RealMarketAPI computes it from closing prices on the server. Pass your API key, a symbol, a timeframe and a period between 2 and 200. The indicator endpoints are available on the PRO plan and above.",
        "The response is a list of the form { data: [ ... ], totalCount }, where each item carries a candle openTime and the WMA value. Check the documentation for the exact field names and the timeframes your plan includes.",
      ],
      code: {
        language: "http",
        content:
          "GET https://api.realmarketapi.com/api/v1/indicator/wma?apiKey=YOUR_KEY&symbolCode=XAUUSD&timeFrame=H1&period=21",
      },
    },
  ],
  faqs: [
    {
      q: "Why is the denominator n(n+1)/2?",
      a: "It is the sum of the weights 1 + 2 + … + n. Dividing the weighted sum by it turns the result back into a price, so the WMA can be plotted on the same chart as the candles.",
    },
    {
      q: "Is the WMA better than the EMA?",
      a: "Neither is better in general. They react at similar speeds; the WMA has a fixed window and forgets old data completely, while the EMA keeps a small memory of all past prices. Pick one, test it on your market, and stick with it.",
    },
    {
      q: "Which price does the WMA use?",
      a: "Usually the close of each candle, which is what RealMarketAPI uses. Some charting tools let you switch to typical price or the high/low midpoint, which gives slightly different values.",
    },
    {
      q: "What period should I use?",
      a: "Start with a commonly used value such as 21 for swing trading or 9 to 10 for short-term work, then validate it on historical data for the exact symbol and timeframe you trade.",
    },
  ],
};

export const websocketStreamingGuide: Seed = {
  title: "Streaming Real-Time Prices over WebSocket",
  tags: ["WebSocket", "Real-Time Data", "API", "JavaScript"],
  updated: "2026-10-31",
  description:
    "When to stream prices over WebSocket instead of polling a REST API, how to handle reconnects with backoff and stale connections, and a working browser JavaScript example.",
  intro:
    "If your app shows a live price, a REST endpoint polled every second is the obvious first attempt, and it does not scale well. A WebSocket keeps one connection open and the server pushes updates as they happen. This guide explains when that is worth it, how to keep a connection healthy, and how to subscribe to a live XAUUSD feed in a few lines of JavaScript.",
  sections: [
    {
      heading: "WebSocket vs REST polling",
      paragraphs: [
        'With polling, the client asks "anything new?" on a timer. Most answers are "no", every request pays for a full HTTP round trip and counts against your quota, and the data you see is up to one polling interval old.',
        "A WebSocket is a single long-lived connection. After the handshake, the server sends a message whenever there is new data. You get updates with less delay, far fewer requests, and less work on both ends.",
      ],
      bullets: [
        "Use REST for history, snapshots, indicators on demand, and anything you fetch once or rarely.",
        "Use WebSocket for live tickers, dashboards, alerts and bots that react to each new price.",
        "Many apps use both: load history over REST, then append live updates from the stream.",
      ],
    },
    {
      heading: "Connecting to a price stream",
      paragraphs: [
        "RealMarketAPI streams live prices at wss://api.realmarketapi.com/price. Authentication and the subscription go in the query string: your apiKey, the symbolCode and the timeFrame. Each message is JSON with the latest price data for that symbol.",
        "The example below uses the browser's built-in WebSocket API. In Node.js, the same code works with the ws package.",
      ],
      code: {
        language: "javascript",
        content: `const url =
  "wss://api.realmarketapi.com/price" +
  "?apiKey=YOUR_KEY&symbolCode=XAUUSD&timeFrame=M1";

const socket = new WebSocket(url);

socket.onopen = () => console.log("connected");

socket.onmessage = (event) => {
  const tick = JSON.parse(event.data);
  console.log("XAUUSD", tick);
};

socket.onerror = (err) => console.error("socket error", err);
socket.onclose = (event) => console.log("closed", event.code, event.reason);`,
      },
    },
    {
      heading: "Reconnecting with backoff",
      paragraphs: [
        "Connections drop: laptops sleep, mobile networks switch, servers deploy. Your client should expect this and reconnect on its own. Reconnecting immediately in a tight loop is the classic mistake; if the server is briefly unavailable, thousands of clients hammering it at once keep it down.",
        "Use exponential backoff with jitter: wait about 1 second, then 2, 4, 8, up to a cap such as 30 seconds, adding a random offset so clients do not retry in sync. Reset the delay once a connection has been stable for a while.",
      ],
      code: {
        language: "javascript",
        content: `function connect(url, onTick, attempt = 0) {
  const socket = new WebSocket(url);

  socket.onopen = () => { attempt = 0; };
  socket.onmessage = (event) => onTick(JSON.parse(event.data));
  socket.onclose = () => {
    const base = Math.min(30000, 1000 * 2 ** attempt);
    const delay = base / 2 + Math.random() * (base / 2);
    setTimeout(() => connect(url, onTick, attempt + 1), delay);
  };

  return socket;
}`,
      },
    },
    {
      heading: "Heartbeats and stale connections",
      paragraphs: [
        "A connection can look open while no data is flowing: a proxy silently dropped it, or the network changed underneath. The WebSocket protocol has ping and pong frames for this, but browsers do not expose them to JavaScript.",
        "The practical answer in a browser is a watchdog. Remember when the last message arrived; if nothing has arrived for longer than you would expect for that symbol and timeframe, close the socket and let the reconnect logic take over. On a server (for example Node.js with ws) you can send protocol pings and drop connections that do not answer.",
      ],
      bullets: [
        "Pick the timeout from real traffic. Quiet markets and weekends produce fewer updates; do not reconnect just because the market is closed.",
        "Show the user when data is stale instead of silently displaying an old price.",
        "Close sockets you no longer need, for example when a component unmounts.",
      ],
    },
    {
      heading: "Other streaming routes",
      paragraphs: [
        "The price stream is the simplest one. RealMarketAPI exposes several other WebSocket routes on the same host, using the same apiKey query parameter. Which symbols and timeframes you can subscribe to depends on your plan.",
      ],
      bullets: [
        "/candles: live candle updates for a symbol and timeframe.",
        "/multi-timeframe: one symbol across several timeframes at once.",
        "/orderflow/imbalance: order flow imbalance data.",
        "/market: broader market updates.",
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: ["Most WebSocket bugs are lifecycle bugs rather than protocol bugs."],
      bullets: [
        "Opening a new socket on every render or every symbol change without closing the old one.",
        "Putting a secret API key in public front-end code. In production, proxy the stream through your own backend or use a key you are prepared to rotate.",
        "Assuming messages arrive in order after a reconnect, or that none were missed. Refill gaps from the REST history endpoint.",
        "Doing heavy work inside onmessage. Parse, store, and render on the next animation frame instead.",
      ],
    },
  ],
  faqs: [
    {
      q: "Does a WebSocket connection use my request quota?",
      a: "How streaming is counted depends on your plan. Check the pricing and documentation pages for the current rules before you open many connections.",
    },
    {
      q: "Can I subscribe to several symbols?",
      a: "Each connection is opened for the symbol and timeframe in its query string. To follow several symbols, open one connection per subscription, or use a route such as /multi-timeframe where it fits your use case.",
    },
    {
      q: "Why do I get disconnected after a while?",
      a: "Idle timeouts in proxies, load balancers or the network are the usual cause. Reconnect with backoff, and treat a long silence as a sign the connection may be stale.",
    },
    {
      q: "Should I use WebSocket or REST for a trading bot?",
      a: "Use WebSocket to react to new prices and REST to load history at startup and to fill any gaps after a reconnect.",
    },
  ],
};

export const mcpAgentsGuide: Seed = {
  title: "Using Market Data with AI Agents via MCP",
  tags: ["MCP", "AI Agents", "LLM", "API"],
  updated: "2026-10-31",
  description:
    "What the Model Context Protocol is, how an AI agent calls market data tools such as get_price and get_rsi, how to connect to the RealMarketAPI MCP server, and how to use AI analysis safely.",
  intro:
    "Large language models are good at explaining and reasoning, and bad at knowing today's gold price. The Model Context Protocol (MCP) closes that gap by letting an AI assistant call external tools during a conversation. This guide explains how MCP works, what happens when an agent asks for a price or an RSI value, and what to watch out for before you trust the answer.",
  sections: [
    {
      heading: "What is MCP?",
      paragraphs: [
        "MCP is an open protocol for connecting AI applications to tools and data. An MCP server describes a set of tools, each with a name, a plain-language description and a typed list of parameters. An MCP client, such as a desktop AI assistant, an IDE or your own agent, connects to the server, reads that list, and offers the tools to the model.",
        "The model never talks to your database or API directly. It asks the client to call a tool with specific arguments, the client calls the server, and the result goes back into the conversation as context.",
      ],
    },
    {
      heading: "How an agent calls a market data tool",
      paragraphs: [
        'Suppose you ask: "Is gold overbought on the hourly chart?" A typical sequence looks like this:',
      ],
      bullets: [
        "The model sees tools such as get_price and get_rsi in its tool list, with descriptions of what they return.",
        "It decides it needs data and requests get_rsi with symbolCode XAUUSD and timeFrame H1.",
        "The client sends that call to the MCP server, which validates the arguments, fetches the data and returns JSON.",
        "The model reads the result, maybe calls get_price for the latest quote, and then writes its answer using real numbers instead of guesses.",
      ],
    },
    {
      heading: "Connecting to the RealMarketAPI MCP server",
      paragraphs: [
        "RealMarketAPI hosts an MCP server over HTTP at the address below. Access requires a PRO plan or higher. Add it as a remote MCP server in any client that supports the HTTP transport; the exact steps differ by client, so follow your client's documentation for adding a server by URL.",
        "The server exposes tools for live prices and candles (get_price, get_candles), history, symbols and timeframes, indicators such as get_sma, get_ema, get_rsi, get_macd, get_atr and get_bollinger_bands, and analysis tools such as support and resistance, volatility and sentiment. The tools take your API key as an argument, so the agent will need it in order to call them.",
      ],
      code: {
        language: "text",
        content: "https://ai.realmarketapi.com/mcp",
      },
    },
    {
      heading: "What agents are good at here",
      paragraphs: [
        "Agents are useful for the slow parts of analysis: pulling several indicators at once, summarising a multi-timeframe picture, explaining what a reading means, or drafting the code for a backtest you then run yourself.",
      ],
      bullets: [
        '"Compare RSI and ATR for XAUUSD and BTCUSD on H4 and summarise the differences."',
        '"Fetch the last 50 H1 candles for EURUSD and describe the structure."',
        '"Explain why the MACD histogram turned negative on this chart."',
      ],
    },
    {
      heading: "Safety and limits",
      paragraphs: [
        "An AI answer built on real data is still an opinion, not financial advice. Models can misread a number, mix up timeframes, or present a confident conclusion that the data does not support. Treat the output as a research assistant's draft.",
      ],
      bullets: [
        "Verify any number that drives a decision against the raw tool result or your chart.",
        "Do not let an agent place trades without hard limits on size, frequency and loss, plus a human check.",
        "Use a dedicated API key for agents, keep it out of shared prompts and screenshots, and rotate it if it leaks.",
        "Be careful with content the agent reads from the web or documents: it can contain instructions meant to steer the model.",
        "Backtest any strategy an agent suggests before risking money. A plausible explanation is not evidence of an edge.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need to write code to use MCP?",
      a: "No. Many AI assistants can add a remote MCP server from their settings. Code is only needed if you are building your own agent or client.",
    },
    {
      q: "Which plan do I need for the RealMarketAPI MCP server?",
      a: "The MCP server requires a PRO plan or higher. Symbol and timeframe access then follows your plan, as with the REST API.",
    },
    {
      q: "Is MCP different from calling the REST API?",
      a: "The data is the same. MCP wraps it in tool definitions an AI model can discover and call on its own; the REST API is for code you write yourself.",
    },
    {
      q: "Can I rely on an AI agent's trade ideas?",
      a: "No. Use them as a starting point for your own analysis. AI output is not financial advice, and any idea should be tested and sized with proper risk management before real money is involved.",
    },
  ],
};
