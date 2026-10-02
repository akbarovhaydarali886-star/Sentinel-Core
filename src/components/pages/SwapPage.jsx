import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { useLanguage } from "../../context/LanguageContext";
import { SwapWidget } from "../dashboard/SwapWidget";
import {
  ArrowLeftRight,
  Droplets,
  Percent,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Coins
} from "lucide-react";
import confetti from "canvas-confetti";

export const SwapPage = () => {
  const { assets, showToast } = usePortfolio();
  const { t } = useLanguage();

  const [stakedPools, setStakedPools] = useState([
    { id: "pool-1", name: "ETH / USDC", apy: "18.4%", tvl: "$48.2M", staked: 0, rewardRate: 0.05 },
    { id: "pool-2", name: "SOL / USDC", apy: "24.2%", tvl: "$32.9M", staked: 0, rewardRate: 0.08 },
    { id: "pool-3", name: "TON / USDT", apy: "16.9%", tvl: "$19.1M", staked: 0, rewardRate: 0.04 },
  ]);

  const handleStake = (poolId) => {
    setStakedPools((prev) =>
      prev.map((p) => (p.id === poolId ? { ...p, staked: p.staked + 500 } : p))
    );
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#06B6D4", "#10B981", "#8B5CF6"]
    });
    showToast("+$500 USD likvidlik puliga muvaffaqiyatli staking qilindi!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-amber-500/15 text-amber-500 border border-amber-500/30">
              CROSS-CHAIN DEX AGGREGATOR
            </span>
            <span className="text-xs text-slate-400 font-mono">0% Platform Fee</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {t("swapTitle")}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t("swapSubtitle")}
          </p>
        </div>
      </div>

      {/* Main Grid: Swap Box (Left), Staking & DEX Comparison (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Swap Terminal (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <SwapWidget />

          {/* Smart Route Optimizer Card */}
          <div className="neo-box rounded-3xl p-5 relative overflow-hidden">
            <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-cyan-500" />
              {t("routeOptimizer")}
            </h3>
            
            {/* Visual Route Flow */}
            <div className="p-3 neo-inset rounded-2xl flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-cyan-400">Zenith Vault</span>
              <span className="text-slate-400">→ Uniswap V3 →</span>
              <span className="font-bold text-emerald-400">Recipient</span>
            </div>
            
            <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{t("bestRateGuaranteed")}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Liquidity Pools & Staking (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Liquidity Staking Card */}
          <div className="neo-box rounded-3xl p-5 sm:p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-500" />
                  {t("liquidityStaking")}
                </h3>
                <p className="text-[11px] text-slate-400">
                  Likvidlik taqdim eting va passiv kripto foizlarini ishlab oling
                </p>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold text-cyan-500 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                Avg APY: ~19.8%
              </span>
            </div>

            <div className="space-y-3">
              {stakedPools.map((pool) => (
                <div
                  key={pool.id}
                  className="p-4 rounded-2xl neo-inset flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl neo-box flex items-center justify-center font-bold text-cyan-500">
                      <Coins className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-black text-sm text-slate-900 dark:text-white">
                        {pool.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        TVL: {pool.tvl} • Staked: ${pool.staked}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">{t("apyRate")}</span>
                      <span className="font-mono font-black text-emerald-500 text-sm">
                        {pool.apy}
                      </span>
                    </div>

                    <button
                      onClick={() => handleStake(pool.id)}
                      className="px-4 py-2 neo-btn neo-box-hover rounded-xl text-xs font-bold text-cyan-600 dark:text-cyan-400 cursor-pointer"
                    >
                      {pool.staked > 0 ? "+$500 Qo'shish" : t("stakeTokens")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-DEX Aggregator Rate Comparison */}
          <div className="neo-box rounded-3xl p-5 sm:p-6 relative overflow-hidden">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Percent className="w-4 h-4 text-emerald-500" />
              Boshqa DEX-lar bilan Taqqoslash (SOL/ETH)
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200/50 dark:border-slate-800 text-[10px] text-slate-400 uppercase">
                    <th className="py-2 px-3">DEX Platforma</th>
                    <th className="py-2 px-3">Kurs (1 SOL)</th>
                    <th className="py-2 px-3">Komissiya</th>
                    <th className="py-2 px-3 text-right">Tejamkorlik</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/30 dark:divide-slate-800/50">
                  <tr className="bg-cyan-500/5 font-bold">
                    <td className="py-3 px-3 text-cyan-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Zenith DEX (Biz)
                    </td>
                    <td className="py-3 px-3 text-slate-900 dark:text-white">0.0568 ETH</td>
                    <td className="py-3 px-3 text-emerald-500">0.00%</td>
                    <td className="py-3 px-3 text-right text-emerald-500">+1.8% Ko'proq</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-400">Uniswap V3</td>
                    <td className="py-2.5 px-3">0.0559 ETH</td>
                    <td className="py-2.5 px-3 text-slate-400">0.30%</td>
                    <td className="py-2.5 px-3 text-right text-slate-400">Standart</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-400">Raydium</td>
                    <td className="py-2.5 px-3">0.0558 ETH</td>
                    <td className="py-2.5 px-3 text-slate-400">0.25%</td>
                    <td className="py-2.5 px-3 text-right text-slate-400">-0.2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
