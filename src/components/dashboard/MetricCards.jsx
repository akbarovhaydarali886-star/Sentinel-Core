import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  Wallet,
  Coins,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  Target
} from "lucide-react";

export const MetricCards = () => {
  const {
    totalPortfolioValue,
    cashBalance,
    totalDailyPnl,
    dailyPnlPercentage
  } = usePortfolio();
  const { t } = useLanguage();

  const isProfit = totalDailyPnl >= 0;

  const metrics = [
    {
      title: t("netWorth"),
      value: `$${totalPortfolioValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      change: `${isProfit ? "+" : ""}${dailyPnlPercentage.toFixed(2)}%`,
      isPositive: isProfit,
      icon: Wallet,
      glow: "neon-glow-cyan",
      iconColor: "text-cyan-500",
      accentBg: "from-cyan-500/10 to-blue-500/5",
    },
    {
      title: t("availableCash"),
      value: `$${cashBalance.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      change: "Instant USD",
      isPositive: true,
      icon: Coins,
      glow: "neon-glow-emerald",
      iconColor: "text-emerald-500",
      accentBg: "from-emerald-500/10 to-teal-500/5",
    },
    {
      title: t("dailyProfit"),
      value: `${isProfit ? "+" : "-"}$${Math.abs(totalDailyPnl).toLocaleString(
        undefined,
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )}`,
      change: "24h P&L",
      isPositive: isProfit,
      icon: TrendingUp,
      glow: isProfit ? "neon-glow-emerald" : "neon-glow-rose",
      iconColor: isProfit ? "text-emerald-500" : "text-rose-500",
      accentBg: isProfit
        ? "from-emerald-500/10 to-green-500/5"
        : "from-rose-500/10 to-red-500/5",
    },
    {
      title: t("riskIndex"),
      value: "62/100",
      subtext: t("moderateRisk"),
      change: "Sharpe: 2.14",
      isPositive: true,
      icon: ShieldCheck,
      glow: "neon-glow-violet",
      iconColor: "text-violet-500",
      accentBg: "from-violet-500/10 to-purple-500/5",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div
            key={idx}
            className="neo-box neo-box-hover rounded-3xl p-5 relative overflow-hidden group"
          >
            {/* Subtle Gradient Backdrop */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${metric.accentBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
            ></div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {metric.title}
              </span>
              <div
                className={`p-2 neo-inset rounded-xl ${metric.iconColor}`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-mono mb-2">
              {metric.value}
            </div>

            <div className="flex items-center justify-between text-xs">
              {metric.subtext ? (
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  {metric.subtext}
                </span>
              ) : null}
              <div
                className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md ${
                  metric.isPositive
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-rose-500/10 text-rose-500"
                }`}
              >
                {metric.isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                <span>{metric.change}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
