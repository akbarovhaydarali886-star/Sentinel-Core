import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  Sparkles,
  LayoutDashboard,
  TrendingUp,
  ArrowLeftRight,
  Bot,
  History,
  Wallet,
  PlusCircle,
  Globe,
  Sun,
  Moon,
  ShieldCheck,
  ChevronRight,
  UserCheck
} from "lucide-react";

export const LeftSidebar = ({ activePage, setActivePage, isMobileOpen, setIsMobileOpen }) => {
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, openLoginModal, openProfileModal } = useAuth();
  const { totalPortfolioValue, totalDailyPnl, dailyPnlPercentage, depositFunds } = usePortfolio();

  const navLinks = [
    {
      id: "dashboard",
      label: t("navDashboard"),
      icon: LayoutDashboard,
      desc: "Portfel va umumiy tahlil",
      badgeColor: "cyan"
    },
    {
      id: "trade",
      label: t("navTrade"),
      icon: TrendingUp,
      desc: "Pro spot terminali",
      badgeColor: "emerald"
    },
    {
      id: "swap",
      label: t("navSwap"),
      icon: ArrowLeftRight,
      desc: "DEX cross-chain ayirboshlash",
      badgeColor: "amber"
    },
    {
      id: "ai-bot",
      label: t("navAI"),
      icon: Bot,
      desc: "Aqlli neural maslahatchi",
      badgeColor: "violet",
      isAIBadge: true
    },
    {
      id: "history",
      label: t("navHistory"),
      icon: History,
      desc: "Tranzaksiyalar va audit",
      badgeColor: "rose"
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in"
        ></div>
      )}

      {/* Main Left Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 lg:w-80 glass-neo border-r border-slate-200/60 dark:border-white/10 flex flex-col justify-between p-4 sm:p-5 transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top: Logo Branding */}
        <div className="space-y-6">
          <div
            onClick={() => {
              setActivePage("dashboard");
              setIsMobileOpen(false);
            }}
            className="flex items-center gap-3.5 cursor-pointer select-none px-2 py-1 group"
          >
            <div className="w-11 h-11 rounded-2xl glass-neo flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#06B6D4]"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-wider bg-gradient-to-r from-slate-900 via-cyan-600 to-blue-600 dark:from-white dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {t("brandName")}
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 neon-border-cyan">
                  v2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                Glass-Neo FinTech OS
              </p>
            </div>
          </div>

          {/* 5 Dedicated Left Navigation Menu */}
          <nav className="space-y-2">
            <p className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Asosiy Bo'limlar
            </p>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer text-left group relative ${
                    isActive
                      ? "glass-inset text-cyan-400 font-black border-l-4 border-cyan-400 shadow-inner neon-border-cyan"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl transition-colors ${
                        isActive
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "text-slate-400 group-hover:text-cyan-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="tracking-wide leading-tight">
                        {link.label}
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal hidden sm:block">
                        {link.desc}
                      </div>
                    </div>
                  </div>

                  {link.isAIBadge ? (
                    <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 animate-pulse">
                      AI LIVE
                    </span>
                  ) : (
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? "text-cyan-400 translate-x-0.5" : "text-slate-400 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center/Bottom: Mini Wallet & User Profile Trigger */}
        <div className="space-y-4 pt-4 border-t border-slate-200/60 dark:border-white/10">
          
          {/* Glass-Neo Wallet Card */}
          <div className="glass-neo rounded-3xl p-4 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                {t("netWorth")}
              </span>
              <Wallet className="w-4 h-4 text-cyan-400" />
            </div>

            <div className="text-xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
              ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            <div className="flex items-center justify-between text-xs mt-2">
              <span
                className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-lg ${
                  totalDailyPnl >= 0
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                }`}
              >
                {totalDailyPnl >= 0 ? "+" : ""}${Math.abs(totalDailyPnl).toFixed(2)} ({dailyPnlPercentage.toFixed(2)}%)
              </span>

              <button
                onClick={() => depositFunds(5000)}
                className="p-1.5 glass-btn rounded-xl text-cyan-400 hover:text-cyan-300 cursor-pointer"
                title="+$5,000 USD Depozit"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User Profile Card (Clicking opens Profile Modal) */}
          <div className="flex items-center justify-between gap-2">
            {user ? (
              <button
                onClick={openProfileModal}
                className="flex items-center gap-2.5 p-1.5 glass-neo rounded-2xl flex-1 overflow-hidden hover:ring-2 hover:ring-cyan-400 transition-all cursor-pointer text-left group"
                title="Profil Sozlamalarini Ochish"
              >
                <div className="relative shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-xl object-cover ring-2 ring-cyan-500/50"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-1 ring-black"></div>
                </div>
                <div className="overflow-hidden flex-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-cyan-400 transition-colors">
                    {user.name.split(" ")[0]}
                  </div>
                  <div className="text-[9px] text-cyan-400 font-semibold truncate flex items-center gap-1">
                    <UserCheck className="w-2.5 h-2.5" />
                    <span>Profil</span>
                  </div>
                </div>
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className="flex-1 py-2.5 glass-btn rounded-2xl text-xs font-bold text-cyan-400 cursor-pointer"
              >
                {t("login")}
              </button>
            )}

            {/* Language Switch */}
            <button
              onClick={toggleLang}
              className="p-2.5 glass-btn rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
              title="Tilni o'zgartirish (UZ/EN)"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
            </button>

            {/* Theme Switch */}
            <button
              onClick={toggleTheme}
              className="p-2.5 glass-btn rounded-2xl text-slate-700 dark:text-amber-400 cursor-pointer"
              title={isDark ? "Light Mode" : "Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
