import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  Sparkles,
  Sun,
  Moon,
  Globe,
  Search,
  Zap,
  RotateCcw,
  PlusCircle,
  LogOut,
  User,
  ShieldCheck,
  ChevronDown,
  Coins,
  LayoutDashboard,
  TrendingUp,
  ArrowLeftRight,
  Bot,
  History,
  Menu,
  X
} from "lucide-react";

export const Navbar = ({ activePage, setActivePage, onOpenCommandPalette }) => {
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, logout, openLoginModal, openRegisterModal } = useAuth();
  const { depositFunds, resetDemoBalance } = usePortfolio();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "dashboard", label: t("navDashboard"), icon: LayoutDashboard },
    { id: "trade", label: t("navTrade"), icon: TrendingUp },
    { id: "swap", label: t("navSwap"), icon: ArrowLeftRight },
    { id: "ai-bot", label: t("navAI"), icon: Bot, isAIBadge: true },
    { id: "history", label: t("navHistory"), icon: History },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-opacity-85 transition-colors duration-300 border-b border-slate-200/60 dark:border-slate-800/80 bg-slate-50/90 dark:bg-[#0A0E17]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <div
          onClick={() => setActivePage("dashboard")}
          className="flex items-center gap-3 cursor-pointer select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl neo-box flex items-center justify-center relative group">
            <Sparkles className="w-5 h-5 text-cyan-500 dark:text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-wider bg-gradient-to-r from-slate-900 via-cyan-600 to-blue-600 dark:from-white dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                {t("brandName")}
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-extrabold rounded-md uppercase tracking-wider bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
                PRO 2.0
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden xl:block leading-none">
              {t("brandSubtitle")}
            </p>
          </div>
        </div>

        {/* 5 Core Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 neo-inset rounded-2xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer relative ${
                  isActive
                    ? "neo-box text-cyan-500 dark:text-cyan-400 shadow-sm font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-500" : "text-slate-400"}`} />
                <span>{link.label}</span>
                {link.isAIBadge && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Search, Gas, Lang, Theme, Auth */}
        <div className="flex items-center gap-2">
          {/* Quick Search Shortcut */}
          <button
            onClick={onOpenCommandPalette}
            className="p-2 neo-btn neo-box-hover rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            title="Qidirish (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-cyan-500" />
          </button>

          {/* Quick Deposit Button */}
          <button
            onClick={() => depositFunds(5000)}
            title="+$5,000 USD Depozit"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 neo-btn neo-box-hover rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+$5k</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={resetDemoBalance}
            title={t("resetDemo")}
            className="p-2 neo-btn neo-box-hover rounded-xl text-slate-600 dark:text-slate-300 cursor-pointer hidden md:block"
          >
            <RotateCcw className="w-4 h-4 hover:rotate-180 transition-transform duration-500" />
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 neo-btn neo-box-hover rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
            title="Tilni o'zgartirish"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-500" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 neo-btn neo-box-hover rounded-xl text-slate-700 dark:text-amber-400 cursor-pointer"
            title={isDark ? "Light Mode" : "Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* User Profile / Login */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 neo-btn neo-box-hover rounded-xl cursor-pointer"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-lg object-cover ring-2 ring-cyan-500/40"
                />
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {user.name.split(" ")[0]}
                  </div>
                  <div className="text-[9px] text-cyan-500 font-semibold leading-none">
                    {user.tier}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 neo-box rounded-2xl p-3 shadow-2xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in duration-150">
                  <div className="flex items-center gap-3 p-2 border-b border-slate-200/50 dark:border-slate-800">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-cyan-500"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {user.email}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-500 font-mono">
                        <ShieldCheck className="w-3 h-3" />
                        {user.walletAddress}
                      </span>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    <button
                      onClick={() => {
                        depositFunds(10000);
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                    >
                      <Coins className="w-4 h-4 text-amber-500" />
                      <span>{t("depositFunds")} (+$10k)</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800">
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t("logout")}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={openLoginModal}
                className="px-3 py-1.5 neo-btn neo-box-hover rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                {t("login")}
              </button>
              <button
                onClick={openRegisterModal}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md neon-glow-cyan cursor-pointer"
              >
                {t("register")}
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 lg:hidden neo-btn rounded-xl text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/60 dark:border-slate-800 p-4 space-y-2 bg-slate-50 dark:bg-[#0A0E17]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "neo-inset text-cyan-500 dark:text-cyan-400 font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
                {link.isAIBadge && (
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-cyan-500/20 text-cyan-400">
                    AI Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
