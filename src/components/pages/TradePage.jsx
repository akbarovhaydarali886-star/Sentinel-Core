import React, { useState, useMemo } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { useLanguage } from "../../context/LanguageContext";
import { MainChart } from "../dashboard/MainChart";
import { QuickTrade } from "../dashboard/QuickTrade";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Layers,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Clock
} from "lucide-react";

export const TradePage = ({ selectedAssetId, setSelectedAssetId }) => {
  const { assets } = usePortfolio();
  const { t } = useLanguage();

  const currentAsset =
    assets.find((a) => a.id === selectedAssetId) || assets[0];

  // Simulated live Order Book data based on current price
  const orderBook = useMemo(() => {
    const base = currentAsset.price;
    const asks = []; // sellers (higher price)
    const bids = []; // buyers (lower price)

    for (let i = 5; i >= 1; i--) {
      const price = base * (1 + (i * 0.0018));
      const amount = (Math.random() * 1.8 + 0.2).toFixed(3);
      const total = (price * amount).toFixed(2);
      const depth = Math.min(100, Math.floor(i * 18 + Math.random() * 20));
      asks.push({ price: price.toFixed(2), amount, total, depth });
    }

    for (let i = 1; i <= 5; i++) {
      const price = base * (1 - (i * 0.0018));
      const amount = (Math.random() * 2.2 + 0.3).toFixed(3);
      const total = (price * amount).toFixed(2);
      const depth = Math.min(100, Math.floor((6 - i) * 18 + Math.random() * 20));
      bids.push({ price: price.toFixed(2), amount, total, depth });
    }

    return { asks, bids, spread: (base * 0.0008).toFixed(2) };
  }, [currentAsset.price]);

  // Simulated live Recent Trades tape
  const recentTrades = useMemo(() => {
    const trades = [];
    const base = currentAsset.price;
    for (let i = 0; i < 7; i++) {
      const isBuy = Math.random() > 0.45;
      const price = base * (1 + (Math.random() - 0.5) * 0.004);
      const amount = (Math.random() * 1.2 + 0.05).toFixed(3);
      trades.push({
        id: i,
        time: `${String(14 + i).padStart(2, "0")}:${String(30 + i * 4).padStart(2, "0")}:${String(12 + i * 7).padStart(2, "0")}`,
        price: price.toFixed(2),
        amount,
        type: isBuy ? "buy" : "sell",
      });
    }
    return trades;
  }, [currentAsset.id]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-cyan-500/15 text-cyan-500 border border-cyan-500/30">
              INSTITUTIONAL SPOT ENGINE
            </span>
            <span className="text-xs text-slate-400 font-mono">0.001s Latency</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {t("tradeStationTitle")}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t("tradeStationSubtitle")}
          </p>
        </div>
      </div>

      {/* Main Trade Grid: (Chart + Tape) Left, (Order Book + Trade Box) Right */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Main Interactive Chart & Market Tape */}
        <div className="xl:col-span-2 space-y-6">
          <MainChart
            selectedAssetId={selectedAssetId}
            onSelectAsset={setSelectedAssetId}
          />

          {/* Recent Market Tape */}
          <div className="neo-box rounded-3xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-500" />
                {t("recentTrades")} ({currentAsset.symbol}/USD)
              </h3>
              <span className="text-[11px] font-mono text-emerald-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Feed
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200/50 dark:border-slate-800 text-[10px] text-slate-400 uppercase">
                    <th className="py-2 px-3">Vaqt</th>
                    <th className="py-2 px-3">Narx (USD)</th>
                    <th className="py-2 px-3">Miqdor ({currentAsset.symbol})</th>
                    <th className="py-2 px-3 text-right">Turi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/30 dark:divide-slate-800/50">
                  {recentTrades.map((trade) => (
                    <tr key={trade.id} className="hover:bg-slate-100/40 dark:hover:bg-slate-800/30">
                      <td className="py-2 px-3 text-slate-400 text-[11px]">{trade.time}</td>
                      <td className={`py-2 px-3 font-bold ${trade.type === "buy" ? "text-emerald-500" : "text-rose-500"}`}>
                        ${trade.price}
                      </td>
                      <td className="py-2 px-3 text-slate-700 dark:text-slate-300">{trade.amount}</td>
                      <td className="py-2 px-3 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${trade.type === "buy" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}>
                          {trade.type.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Trade Form & Live Order Book */}
        <div className="space-y-6">
          
          {/* Quick Trade Box */}
          <QuickTrade
            selectedAssetId={selectedAssetId}
            onSelectAsset={setSelectedAssetId}
          />

          {/* Live Order Book */}
          <div className="neo-box rounded-3xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-500" />
                {t("orderBook")}
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                {t("spread")}: ${orderBook.spread}
              </span>
            </div>

            {/* Asks (Sellers) */}
            <div className="space-y-1 text-xs font-mono mb-2">
              {orderBook.asks.map((ask, idx) => (
                <div key={idx} className="relative flex justify-between items-center py-1 px-2 rounded">
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-rose-500/10 rounded pointer-events-none"
                    style={{ width: `${ask.depth}%` }}
                  ></div>
                  <span className="text-rose-500 font-bold z-10">${ask.price}</span>
                  <span className="text-slate-400 z-10">{ask.amount}</span>
                  <span className="text-slate-500 dark:text-slate-400 z-10 hidden sm:inline">${ask.total}</span>
                </div>
              ))}
            </div>

            {/* Mid Market Price Indicator */}
            <div className="py-2 px-3 my-2 neo-inset rounded-xl flex items-center justify-between font-mono">
              <span className="text-sm font-black text-slate-900 dark:text-white">
                ${currentAsset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className={`text-xs font-bold ${currentAsset.change24h >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                {currentAsset.change24h >= 0 ? "+" : ""}{currentAsset.change24h}%
              </span>
            </div>

            {/* Bids (Buyers) */}
            <div className="space-y-1 text-xs font-mono mt-2">
              {orderBook.bids.map((bid, idx) => (
                <div key={idx} className="relative flex justify-between items-center py-1 px-2 rounded">
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 rounded pointer-events-none"
                    style={{ width: `${bid.depth}%` }}
                  ></div>
                  <span className="text-emerald-500 font-bold z-10">${bid.price}</span>
                  <span className="text-slate-400 z-10">{bid.amount}</span>
                  <span className="text-slate-500 dark:text-slate-400 z-10 hidden sm:inline">${bid.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
