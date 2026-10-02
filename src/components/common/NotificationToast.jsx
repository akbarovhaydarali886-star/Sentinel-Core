import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const NotificationToast = () => {
  const { toast } = usePortfolio();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className="neo-box px-5 py-3.5 rounded-2xl flex items-center gap-3 border border-emerald-500/30 neon-glow-emerald bg-slate-900/95 dark:bg-slate-900/95 text-white shadow-2xl backdrop-blur-md">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="text-sm font-medium tracking-wide">{toast.message}</p>
      </div>
    </div>
  );
};
