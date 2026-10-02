import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { MARKET_NEWS } from "../../constants/mockData";
import { Newspaper, Gauge, Flame, ExternalLink, Clock } from "lucide-react";

export const MarketNews = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="neo-box rounded-3xl p-5 sm:p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-cyan-500" />
          Bozor Yangiliklari & Sentiment
        </h3>
        <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
          <Flame className="w-3.5 h-3.5" />
          Qaynoq xabarlar
        </span>
      </div>

      {/* Fear & Greed Index Card */}
      <div className="p-3.5 neo-inset rounded-2xl mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 neo-box rounded-xl text-amber-500">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">
              Fear & Greed Indeksi
            </div>
            <div className="text-sm font-black text-slate-900 dark:text-white">
              74 • Kuchli Qiziqish (Greed)
            </div>
          </div>
        </div>
        <div className="w-16 h-2 bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 rounded-full"></div>
      </div>

      {/* News list */}
      <div className="space-y-3">
        {MARKET_NEWS.map((news) => (
          <div
            key={news.id}
            className="p-3 rounded-2xl neo-inset hover:border-cyan-500/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
              <span className="font-bold text-cyan-500 px-2 py-0.5 rounded-md bg-cyan-500/10">
                {news.tag}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {news.time}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-400 transition-colors leading-snug">
              {lang === "uz" ? news.titleUz : news.titleEn}
            </p>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 font-medium">
              <span>{news.source}</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
