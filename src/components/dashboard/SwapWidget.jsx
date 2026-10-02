import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  ArrowUpDown,
  ArrowRightLeft,
  Settings,
  Zap,
  Sparkles,
  ShieldCheck
} from "lucide-react";

export const SwapWidget = () => {
  const { assets, swapTokens } = usePortfolio();
  const { t } = useLanguage();

  const [fromSymbol, setFromSymbol] = useState("SOL");
  const [toSymbol, setToSymbol] = useState("ETH");
  const [fromAmount, setFromAmount] = useState("5");
  const [slippage, setSlippage] = useState("0.5");
  const [isRotating, setIsRotating] = useState(false);

  const fromAsset = assets.find((a) => a.symbol === fromSymbol) || assets[0];
  const toAsset = assets.find((a) => a.symbol === toSymbol) || assets[1];

  const calculatedToAmount =
    fromAsset && toAsset && parseFloat(fromAmount) > 0
      ? (parseFloat(fromAmount) * fromAsset.price) / toAsset.price
      : 0;

  const handleInvert = () => {
    setIsRotating(true);
    const temp = fromSymbol;
    setFromSymbol(toSymbol);
    setToSymbol(temp);
    setTimeout(() => setIsRotating(false), 300);
  };

  const handleSwap = (e) => {
    e.preventDefault();
    swapTokens(fromSymbol, toSymbol, fromAmount);
  };

  return (
    <div className="neo-box rounded-3xl p-5 sm:p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-cyan-500" />
            {t("instantSwap")}
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {t("swapSubtitle")}
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 neo-inset rounded-xl">
          {["0.1", "0.5", "1.0"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSlippage(s)}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                slippage === s
                  ? "neo-box text-cyan-500"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {s}%
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSwap} className="space-y-3">
        {/* From Box */}
        <div className="p-3.5 neo-inset rounded-2xl">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">
              {t("youPay")}
            </span>
            <span className="text-[11px] text-slate-400">
              Mavjud: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{fromAsset.holdings.toFixed(4)} {fromAsset.symbol}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="number"
              step="any"
              min="0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-lg font-black font-mono text-slate-900 dark:text-white focus:outline-none"
            />

            {/* From Asset Picker */}
            <select
              value={fromSymbol}
              onChange={(e) => setFromSymbol(e.target.value)}
              className="neo-btn px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.symbol} className="bg-slate-900 text-white">
                  {a.symbol}
                </option>
              ))}
            </select>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            ≈ ${(parseFloat(fromAmount || 0) * fromAsset.price).toFixed(2)} USD
          </div>
        </div>

        {/* Swap Switcher Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            type="button"
            onClick={handleInvert}
            className="p-2.5 neo-btn neo-box-hover rounded-2xl text-cyan-500 dark:text-cyan-400 cursor-pointer shadow-lg active:scale-90 transition-transform"
          >
            <ArrowUpDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isRotating ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* To Box */}
        <div className="p-3.5 neo-inset rounded-2xl">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">
              {t("youReceive")}
            </span>
            <span className="text-[11px] text-slate-400">
              Mavjud: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{toAsset.holdings.toFixed(4)} {toAsset.symbol}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              readOnly
              value={calculatedToAmount > 0 ? calculatedToAmount.toFixed(6) : "0.00"}
              className="w-full bg-transparent text-lg font-black font-mono text-emerald-500 dark:text-emerald-400 focus:outline-none"
            />

            {/* To Asset Picker */}
            <select
              value={toSymbol}
              onChange={(e) => setToSymbol(e.target.value)}
              className="neo-btn px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.symbol} className="bg-slate-900 text-white">
                  {a.symbol}
                </option>
              ))}
            </select>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            1 {fromSymbol} = {(fromAsset.price / toAsset.price).toFixed(4)} {toSymbol}
          </div>
        </div>

        {/* Rate & Fee Info */}
        <div className="p-3 neo-inset rounded-2xl text-xs space-y-1 text-slate-500 dark:text-slate-400">
          <div className="flex justify-between">
            <span>{t("slippageTolerance")}:</span>
            <span className="font-mono font-bold text-cyan-500">{slippage}%</span>
          </div>
          <div className="flex justify-between">
            <span>Tarmoq to'lovi (Gas):</span>
            <span className="font-mono text-emerald-500">~$0.42 (Nol platforma komissiyasi)</span>
          </div>
        </div>

        {/* Submit Swap Button */}
        <button
          type="submit"
          disabled={!fromAmount || parseFloat(fromAmount) <= 0 || fromAsset.holdings < parseFloat(fromAmount)}
          className="w-full py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg neon-glow-cyan cursor-pointer transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {fromAsset.holdings < parseFloat(fromAmount || 0)
            ? t("insufficientFunds")
            : t("swapNow")}
        </button>
      </form>
    </div>
  );
};
