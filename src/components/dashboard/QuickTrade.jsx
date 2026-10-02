import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Info,
  CheckCircle2,
  DollarSign,
  Percent
} from "lucide-react";

export const QuickTrade = ({ selectedAssetId, onSelectAsset }) => {
  const { assets, cashBalance, buyAsset, sellAsset } = usePortfolio();
  const { t } = useLanguage();

  const [tradeType, setTradeType] = useState("buy"); // "buy" | "sell"
  const [orderType, setOrderType] = useState("market"); // "market" | "limit"
  const [amountInput, setAmountInput] = useState("");
  const [limitPrice, setLimitPrice] = useState("");

  const currentAsset =
    assets.find((a) => a.id === selectedAssetId) || assets[0];

  const handlePercentageSelect = (pct) => {
    if (tradeType === "buy") {
      const spendAmount = (cashBalance * pct) / 100;
      setAmountInput(spendAmount.toFixed(2));
    } else {
      const coinAmount = (currentAsset.holdings * pct) / 100;
      setAmountInput(coinAmount.toFixed(4));
    }
  };

  const handleExecuteTrade = (e) => {
    e.preventDefault();
    if (tradeType === "buy") {
      buyAsset(currentAsset.id, amountInput);
    } else {
      sellAsset(currentAsset.id, amountInput);
    }
    setAmountInput("");
  };

  // Calculations
  const calculatedCoins =
    tradeType === "buy"
      ? (parseFloat(amountInput) || 0) / currentAsset.price
      : parseFloat(amountInput) || 0;

  const calculatedUsd =
    tradeType === "buy"
      ? parseFloat(amountInput) || 0
      : (parseFloat(amountInput) || 0) * currentAsset.price;

  const feeUsd = calculatedUsd * 0.001;

  return (
    <div className="neo-box rounded-3xl p-5 sm:p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-500" />
          {t("tradeTerminal")}
        </h3>
        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
          Fee: 0.1%
        </span>
      </div>

      {/* Buy / Sell Tabs */}
      <div className="flex p-1 neo-inset rounded-2xl mb-4">
        <button
          type="button"
          onClick={() => setTradeType("buy")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            tradeType === "buy"
              ? "bg-emerald-500 text-white shadow-md neon-glow-emerald"
              : "text-slate-500 hover:text-slate-200"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          {t("buy")} {currentAsset.symbol}
        </button>
        <button
          type="button"
          onClick={() => setTradeType("sell")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            tradeType === "sell"
              ? "bg-rose-500 text-white shadow-md neon-glow-rose"
              : "text-slate-500 hover:text-slate-200"
          }`}
        >
          <TrendingDown className="w-3.5 h-3.5" />
          {t("sell")} {currentAsset.symbol}
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleExecuteTrade} className="space-y-4">
        {/* Asset Balance Indicator */}
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            {tradeType === "buy" ? t("availableCash") : `${currentAsset.symbol} Balans`}:
          </span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            {tradeType === "buy"
              ? `$${cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : `${currentAsset.holdings.toFixed(4)} ${currentAsset.symbol}`}
          </span>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {tradeType === "buy" ? `${t("amount")} (USD)` : `${t("amount")} (${currentAsset.symbol})`}
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              min="0"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder={tradeType === "buy" ? "100.00" : "0.50"}
              className="w-full neo-inset pl-4 pr-16 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
              {tradeType === "buy" ? "USD" : currentAsset.symbol}
            </span>
          </div>
        </div>

        {/* Percentage Shortcuts */}
        <div className="grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => handlePercentageSelect(pct)}
              className="py-1.5 neo-btn neo-box-hover rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              {pct}%
            </button>
          ))}
        </div>

        {/* Summary Details */}
        <div className="p-3 neo-inset rounded-2xl space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-500 dark:text-slate-400">
            <span>{tradeType === "buy" ? "Olinadi" : "Olinadigan USD"}:</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
              {tradeType === "buy"
                ? `${calculatedCoins.toFixed(4)} ${currentAsset.symbol}`
                : `$${calculatedUsd.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-slate-500 dark:text-slate-400">
            <span>{t("fee")}:</span>
            <span className="font-mono text-slate-500">
              ${feeUsd.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Submit Execution Button */}
        <button
          type="submit"
          disabled={!amountInput || parseFloat(amountInput) <= 0}
          className={`w-full py-3 rounded-2xl text-xs font-bold text-white shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
            tradeType === "buy"
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 neon-glow-emerald"
              : "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 neon-glow-rose"
          }`}
        >
          {tradeType === "buy"
            ? `${t("buy")} ${currentAsset.symbol}`
            : `${t("sell")} ${currentAsset.symbol}`}
        </button>
      </form>
    </div>
  );
};
