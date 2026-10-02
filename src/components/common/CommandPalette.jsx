import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  Search,
  LayoutDashboard,
  TrendingUp,
  ArrowLeftRight,
  Bot,
  History,
  Sun,
  Moon,
  Globe,
  PlusCircle,
  RotateCcw,
  X
} from "lucide-react";

export const CommandPalette = ({ isOpen, onClose, setActivePage }) => {
  const { t, lang, toggleLang } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { assets, depositFunds, resetDemoBalance } = usePortfolio();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "page-dashboard",
      label: t("navDashboard"),
      icon: <LayoutDashboard className="w-4 h-4 text-cyan-400" />,
      action: () => {
        setActivePage("dashboard");
        onClose();
      },
    },
    {
      id: "page-trade",
      label: t("navTrade"),
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
      action: () => {
        setActivePage("trade");
        onClose();
      },
    },
    {
      id: "page-swap",
      label: t("navSwap"),
      icon: <ArrowLeftRight className="w-4 h-4 text-amber-400" />,
      action: () => {
        setActivePage("swap");
        onClose();
      },
    },
    {
      id: "page-ai",
      label: t("navAI"),
      icon: <Bot className="w-4 h-4 text-violet-400" />,
      action: () => {
        setActivePage("ai-bot");
        onClose();
      },
    },
    {
      id: "page-history",
      label: t("navHistory"),
      icon: <History className="w-4 h-4 text-rose-400" />,
      action: () => {
        setActivePage("history");
        onClose();
      },
    },
    {
      id: "toggle-theme",
      label: isDark ? "Light Mode-ga o'tish" : "Dark Mode-ga o'tish",
      icon: isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: "toggle-lang",
      label: `Tilni o'zgartirish (${lang === "uz" ? "English" : "O'zbekcha"})`,
      icon: <Globe className="w-4 h-4 text-cyan-400" />,
      action: () => {
        toggleLang();
        onClose();
      },
    },
    {
      id: "deposit-funds",
      label: "+$5,000 USD Depozit qilish",
      icon: <PlusCircle className="w-4 h-4 text-emerald-400" />,
      action: () => {
        depositFunds(5000);
        onClose();
      },
    },
    {
      id: "reset-demo",
      label: "Demo balansni yangilash ($50k)",
      icon: <RotateCcw className="w-4 h-4 text-cyan-400" />,
      action: () => {
        resetDemoBalance();
        onClose();
      },
    },
  ];

  const filteredAssets = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.symbol.toLowerCase().includes(query.toLowerCase())
  );

  const filteredActions = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg neo-box rounded-3xl p-4 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="relative flex items-center mb-3">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full neo-inset pl-10 pr-10 py-3 rounded-2xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={onClose}
            className="absolute right-3 text-slate-400 hover:text-slate-200 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-3 p-1">
          {/* Cryptocurrencies */}
          {filteredAssets.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
                Kripto Aktivlar ({filteredAssets.length})
              </p>
              <div className="space-y-1">
                {filteredAssets.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => {
                      setActivePage("trade");
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] text-white"
                        style={{ backgroundColor: asset.iconColor }}
                      >
                        {asset.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {asset.name}
                        </span>
                        <span className="text-slate-400 ml-1.5 font-mono">
                          {asset.symbol}
                        </span>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-slate-900 dark:text-white font-semibold">
                        ${asset.price.toLocaleString()}
                      </div>
                      <div
                        className={`text-[10px] ${
                          asset.change24h >= 0 ? "text-emerald-500" : "text-rose-500"
                        }`}
                      >
                        {asset.change24h >= 0 ? "+" : ""}
                        {asset.change24h}%
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Page Jumps & Actions */}
          {filteredActions.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
                Sahifalar & Buyruqlar
              </p>
              <div className="space-y-1">
                {filteredActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-left cursor-pointer"
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
