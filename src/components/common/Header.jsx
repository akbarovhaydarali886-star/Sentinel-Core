import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  Menu,
  Search,
  Zap,
  PlusCircle,
  RotateCcw,
  ShieldCheck,
  User,
  Sparkles,
  Award
} from "lucide-react";

export const Header = ({ activePage, onOpenCommandPalette, onToggleMobileSidebar }) => {
  const { t } = useLanguage();
  const { user, openLoginModal, openProfileModal } = useAuth();
  const { depositFunds, resetDemoBalance } = usePortfolio();

  const getPageTitle = () => {
    switch (activePage) {
      case "dashboard":
        return { title: t("navDashboard"), badge: "Portfolio OS" };
      case "trade":
        return { title: t("navTrade"), badge: "0.001s Latency" };
      case "swap":
        return { title: t("navSwap"), badge: "Cross-Chain DEX" };
      case "ai-bot":
        return { title: t("navAI"), badge: "Neural Model v4.2" };
      case "history":
        return { title: t("navHistory"), badge: "On-Chain Audit" };
      default:
        return { title: "Zenith Capital", badge: "Pro 2.0" };
    }
  };

  const pageInfo = getPageTitle();

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-2xl bg-opacity-70 border-b border-slate-200/60 dark:border-white/10 bg-slate-50/80 dark:bg-[#070A12]/80 h-18 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      
      {/* Left: Mobile menu toggle + Active Page Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2.5 glass-btn rounded-xl text-slate-700 dark:text-slate-200 cursor-pointer"
          aria-label="Menyu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-black text-base sm:text-lg text-slate-900 dark:text-white tracking-tight leading-none">
              {pageInfo.title}
            </h2>
            <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              {pageInfo.badge}
            </span>
          </div>
        </div>
      </div>

      {/* Center/Right: Quick Search, Gas, Deposit, Profile */}
      <div className="flex items-center gap-2.5">
        
        {/* Search trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="glass-inset px-3.5 py-2 rounded-xl hidden md:flex items-center justify-between gap-3 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer w-64"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{t("searchPlaceholder")}</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[9px] font-mono glass-neo rounded border border-white/10 text-slate-300">
            Ctrl+K
          </kbd>
        </button>

        {/* Mobile search icon */}
        <button
          onClick={onOpenCommandPalette}
          className="md:hidden p-2.5 glass-btn rounded-xl text-slate-400 hover:text-white cursor-pointer"
        >
          <Search className="w-4 h-4 text-cyan-400" />
        </button>

        {/* Live Gas Ticker */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 glass-inset rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] text-slate-400">{t("gasFee")}:</span>
          <span className="text-emerald-400 font-mono">14 Gwei</span>
        </div>

        {/* Quick Deposit Button */}
        <button
          onClick={() => depositFunds(5000)}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 glass-btn rounded-xl text-xs font-bold text-emerald-500 hover:text-emerald-400 cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>+$5k USD</span>
        </button>

        {/* Reset Demo Button */}
        <button
          onClick={resetDemoBalance}
          title={t("resetDemo")}
          className="p-2.5 glass-btn rounded-xl text-slate-400 hover:text-white cursor-pointer hidden md:block"
        >
          <RotateCcw className="w-4 h-4 hover:rotate-180 transition-transform duration-500" />
        </button>

        {/* Profile / Login Trigger */}
        {user ? (
          <button
            onClick={openProfileModal}
            className="flex items-center gap-2 p-1.5 pr-2.5 glass-neo rounded-xl cursor-pointer hover:ring-2 hover:ring-cyan-400 transition-all"
            title="Profil sozlamalari"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-lg object-cover ring-2 ring-cyan-500/40"
            />
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-none">
                {user.name.split(" ")[0]}
              </div>
              <div className="text-[9px] text-cyan-400 font-semibold leading-none mt-0.5">
                VIP
              </div>
            </div>
          </button>
        ) : (
          <button
            onClick={openLoginModal}
            className="px-3 py-1.5 glass-btn rounded-xl text-xs font-bold text-cyan-400 cursor-pointer"
          >
            {t("login")}
          </button>
        )}
      </div>
    </header>
  );
};
