import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
  LayoutDashboard,
  TrendingUp,
  ArrowLeftRight,
  Bot,
  History
} from "lucide-react";

export const BottomNav = ({ activePage, setActivePage }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "trade", label: "Spot", icon: TrendingUp },
    { id: "swap", label: "Swap", icon: ArrowLeftRight },
    { id: "ai-bot", label: "AI Bot", icon: Bot, isAIBadge: true },
    { id: "history", label: "Tarix", icon: History },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-neo border-t border-slate-200/60 dark:border-white/10 px-2 py-2 flex items-center justify-around backdrop-blur-2xl bg-slate-50/90 dark:bg-[#070A12]/95 shadow-[0_-10px_25px_rgba(0,0,0,0.4)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-[10px] font-bold transition-all cursor-pointer relative ${
              isActive
                ? "text-cyan-400 font-black scale-105"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                isActive ? "bg-cyan-500/20 text-cyan-400 neon-glow-cyan" : ""
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className="mt-0.5">{item.label}</span>
            {item.isAIBadge && !isActive && (
              <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
