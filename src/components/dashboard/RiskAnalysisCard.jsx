import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  ShieldAlert,
  Brain,
  CheckCircle2,
  TrendingDown,
  Activity,
  Sparkles,
  Zap
} from "lucide-react";

export const RiskAnalysisCard = () => {
  const { assets, showToast } = usePortfolio();
  const { t } = useLanguage();
  const [rebalancing, setRebalancing] = useState(false);

  const handleRebalance = () => {
    setRebalancing(true);
    setTimeout(() => {
      setRebalancing(false);
      showToast("Portfel avtomatik ravishda optimal risk balansiga keltirildi!");
    }, 1500);
  };

  return (
    <div className="neo-box rounded-3xl p-5 sm:p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 neo-inset rounded-xl text-violet-400 neon-glow-violet">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              {t("riskAnalysisTitle")}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t("aiAdvisor")}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          Optimal: 84/100
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="p-3 neo-inset rounded-2xl text-center">
          <span className="text-[10px] text-slate-400 block mb-1">
            {t("sharpeRatio")}
          </span>
          <span className="text-base sm:text-lg font-black font-mono text-cyan-400">
            2.14
          </span>
          <span className="text-[10px] text-emerald-500 block font-semibold">
            Zo'r (Strong)
          </span>
        </div>

        <div className="p-3 neo-inset rounded-2xl text-center">
          <span className="text-[10px] text-slate-400 block mb-1">
            {t("maxDrawdown")}
          </span>
          <span className="text-base sm:text-lg font-black font-mono text-rose-400">
            -8.4%
          </span>
          <span className="text-[10px] text-slate-400 block">
            Past risk
          </span>
        </div>

        <div className="p-3 neo-inset rounded-2xl text-center">
          <span className="text-[10px] text-slate-400 block mb-1">
            {t("volatility")}
          </span>
          <span className="text-base sm:text-lg font-black font-mono text-amber-400">
            18.2%
          </span>
          <span className="text-[10px] text-emerald-500 block font-semibold">
            Barqaror
          </span>
        </div>
      </div>

      {/* AI Strategist Recommendations */}
      <div className="p-4 neo-inset rounded-2xl space-y-2.5 mb-5">
        <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{t("aiTip1")}</p>
        </div>
        <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{t("aiTip2")}</p>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleRebalance}
        disabled={rebalancing}
        className="w-full py-3 neo-btn neo-box-hover rounded-2xl text-xs font-bold text-violet-500 dark:text-violet-300 border border-violet-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
      >
        <Zap className={`w-4 h-4 ${rebalancing ? "animate-spin text-cyan-400" : ""}`} />
        <span>{rebalancing ? "Qayta hisoblanmoqda..." : t("rebalancePortfolio")}</span>
      </button>
    </div>
  );
};
