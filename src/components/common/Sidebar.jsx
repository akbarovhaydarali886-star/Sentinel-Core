import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  LayoutDashboard,
  TrendingUp,
  ShieldCheck,
  ArrowLeftRight,
  History,
  Wallet,
  ArrowUpRight,
  Sparkles
} from "lucide-react";

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  const { totalPortfolioValue, totalDailyPnl, dailyPnlPercentage, depositFunds } = usePortfolio();

  const navItems = [
    { id: "dashboard", label: t("dashboard"), icon: LayoutDashboard, glow: "neon-glow-cyan" },
    { id: "trade", label: t("trade"), icon: TrendingUp, glow: "neon-glow-emerald" },
    { id: "analytics", label: t("analytics"), icon: ShieldCheck, glow: "neon-glow-violet" },
    { id: "swap", label: t("swap"), icon: ArrowLeftRight, glow: "neon-glow-amber" },
    { id: "history", label: t("history"), icon: History, glow: "neon-glow-rose" },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-4">
      {/* Navigation menu */}
      <div className="neo-box rounded-3xl p-3 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "neo-inset text-cyan-500 dark:text-cyan-400 font-extrabold border-l-4 border-cyan-500 shadow-inner"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/40"
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform ${
                  isActive ? "text-cyan-500 scale-110" : "text-slate-400"
                }`}
              />
              <span className="tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mini Wallet Card */}
      <div className="neo-box rounded-3xl p-4 sm:p-5 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {t("netWorth")}
          </span>
          <Wallet className="w-4 h-4 text-cyan-500" />
        </div>

        <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-mono">
          ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-lg ${
              totalDailyPnl >= 0
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
            }`}
          >
            <ArrowUpRight className={`w-3.5 h-3.5 ${totalDailyPnl < 0 ? "rotate-90" : ""}`} />
            {totalDailyPnl >= 0 ? "+" : ""}
            ${Math.abs(totalDailyPnl).toFixed(2)} ({dailyPnlPercentage.toFixed(2)}%)
          </span>
        </div>

        <button
          onClick={() => depositFunds(5000)}
          className="w-full mt-4 py-2 px-3 neo-btn neo-box-hover rounded-xl text-xs font-bold text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t("depositFunds")}</span>
        </button>
      </div>
    </aside>
  );
};
