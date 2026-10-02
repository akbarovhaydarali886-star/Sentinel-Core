export const INITIAL_ASSETS = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 88450.20,
    change24h: 3.42,
    high24h: 89900.00,
    low24h: 85200.00,
    volume24h: "42.8B",
    marketCap: "1.74T",
    holdings: 0.45,
    iconColor: "#F7931A",
    sparkline: [85200, 85900, 86400, 86100, 87300, 88100, 88450],
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3420.75,
    change24h: 5.18,
    high24h: 3490.00,
    low24h: 3250.00,
    volume24h: "21.4B",
    marketCap: "410.5B",
    holdings: 4.2,
    iconColor: "#627EEA",
    sparkline: [3250, 3290, 3340, 3310, 3390, 3410, 3420],
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 194.30,
    change24h: -1.85,
    high24h: 202.00,
    low24h: 191.50,
    volume24h: "7.9B",
    marketCap: "91.2B",
    holdings: 25.0,
    iconColor: "#14F195",
    sparkline: [198, 201, 199, 195, 196, 192, 194],
  },
  {
    id: "toncoin",
    symbol: "TON",
    name: "Toncoin",
    price: 6.85,
    change24h: 8.40,
    high24h: 7.10,
    low24h: 6.20,
    volume24h: "1.2B",
    marketCap: "17.4B",
    holdings: 350.0,
    iconColor: "#0098EA",
    sparkline: [6.2, 6.35, 6.5, 6.4, 6.7, 6.8, 6.85],
  },
  {
    id: "near",
    symbol: "NEAR",
    name: "Near Protocol",
    price: 7.42,
    change24h: 4.60,
    high24h: 7.60,
    low24h: 6.95,
    volume24h: "680M",
    marketCap: "8.9B",
    holdings: 180.0,
    iconColor: "#00E699",
    sparkline: [6.95, 7.1, 7.05, 7.25, 7.3, 7.42],
  },
  {
    id: "avalanche",
    symbol: "AVAX",
    name: "Avalanche",
    price: 36.80,
    change24h: -0.92,
    high24h: 38.20,
    low24h: 36.10,
    volume24h: "890M",
    marketCap: "15.1B",
    holdings: 40.0,
    iconColor: "#E84142",
    sparkline: [37.5, 38.0, 37.2, 36.8, 36.4, 36.8],
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: "TX-90821",
    type: "buy",
    asset: "BTC",
    amount: "0.15 BTC",
    price: "$87,200",
    total: "$13,080.00",
    date: "2026-10-02 21:40",
    status: "completed",
    hash: "0x7f9a...3e21"
  },
  {
    id: "TX-90820",
    type: "swap",
    asset: "SOL → ETH",
    amount: "10 SOL",
    price: "$195.20",
    total: "$1,952.00",
    date: "2026-10-02 18:15",
    status: "completed",
    hash: "0x4b1c...9a88"
  },
  {
    id: "TX-90819",
    type: "deposit",
    asset: "USD",
    amount: "$5,000",
    price: "$1.00",
    total: "$5,000.00",
    date: "2026-10-01 14:30",
    status: "completed",
    hash: "0x11fa...c402"
  },
  {
    id: "TX-90818",
    type: "sell",
    asset: "TON",
    amount: "100 TON",
    price: "$6.70",
    total: "$670.00",
    date: "2026-09-30 09:20",
    status: "completed",
    hash: "0x89bb...552d"
  }
];

export const generateHistoricalChartData = (timeframe, basePrice = 88450) => {
  const points = timeframe === "1D" ? 24 : timeframe === "1W" ? 28 : timeframe === "1M" ? 30 : 36;
  const data = [];
  let currentPrice = basePrice * (timeframe === "1D" ? 0.96 : timeframe === "1W" ? 0.91 : 0.82);

  for (let i = 0; i < points; i++) {
    const volatility = (Math.random() - 0.47) * (currentPrice * 0.02);
    currentPrice = Math.max(currentPrice + volatility, basePrice * 0.7);
    
    // Candlestick mock values
    const open = currentPrice;
    const close = currentPrice + (Math.random() - 0.48) * (currentPrice * 0.012);
    const high = Math.max(open, close) + Math.random() * (currentPrice * 0.008);
    const low = Math.min(open, close) - Math.random() * (currentPrice * 0.008);
    const volume = Math.floor(Math.random() * 800 + 200);

    let timeLabel = "";
    if (timeframe === "1D") {
      timeLabel = `${String(i).padStart(2, "0")}:00`;
    } else if (timeframe === "1W") {
      timeLabel = `Day ${Math.floor(i / 4) + 1} ${String((i % 4) * 6).padStart(2, "0")}:00`;
    } else if (timeframe === "1M") {
      timeLabel = `Oct ${i + 1}`;
    } else {
      timeLabel = `M${(i % 12) + 1}`;
    }

    data.push({
      time: timeLabel,
      price: Math.round(close * 100) / 100,
      open: Math.round(open * 100) / 100,
      close: Math.round(close * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      volume,
      ma20: Math.round((currentPrice * 0.985 + Math.random() * 50) * 100) / 100
    });
  }
  return data;
};

export const MARKET_NEWS = [
  {
    id: 1,
    tag: "Bullish",
    tagColor: "emerald",
    titleUz: "Bitcoin yangi institutsional oqimlar hisobiga kuchli dinamika ko'rsatmoqda",
    titleEn: "Bitcoin signals strong momentum driven by institutional ETF inflows",
    source: "Bloomberg Crypto",
    time: "10 daqiqa oldin"
  },
  {
    id: 2,
    tag: "Update",
    tagColor: "cyan",
    titleUz: "Ethereum Layer-2 tarmoqlarida tranzaksiya to'lovlari yana 40% ga arzonlashdi",
    titleEn: "Ethereum Layer-2 gas fees decrease another 40% post-upgrade",
    source: "CoinDesk",
    time: "35 daqiqa oldin"
  },
  {
    id: 3,
    tag: "Ecosystem",
    tagColor: "violet",
    titleUz: "Solana DeFi ekotizimida TVL $9 milliard dollarlik marrani zabt etdi",
    titleEn: "Solana DeFi Total Value Locked crosses $9B milestone",
    source: "Decrypt",
    time: "2 soat oldin"
  }
];
