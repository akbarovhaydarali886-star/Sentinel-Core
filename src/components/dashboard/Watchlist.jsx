import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { useLanguage } from "../../context/LanguageContext";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";
import { ResponsiveContainer, LineChart, Line } from "recharts";

export const Watchlist = ({ onSelectAsset }) => {
  const { assets } = usePortfolio();
  const { t } = useLanguage();

  return (
    <div className="neo-box rounded-3xl p-5 sm:p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-500" />
          Bozor Narxlari & Trendlar
        </h3>
        <span className="text-xs font-semibold text-slate-400">
          Real-time Live
        </span>
      </div>

      <div className="space-y-2">
        {assets.map((asset) => {
          const sparkData = asset.sparkline.map((val, i) => ({ val, i }));
          const isPositive = asset.change24h >= 0;

          return (
            <div
              key={asset.id}
              onClick={() => onSelectAsset(asset.id)}
              className="flex items-center justify-between p-3 rounded-2xl neo-inset hover:border-cyan-500/30 transition-all cursor-pointer group"
            >
              {/* Asset Identity */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-sm"
                  style={{ backgroundColor: asset.iconColor }}
                >
                  {asset.symbol.substring(0, 3)}
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                    {asset.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {asset.symbol} • Vol: {asset.volume24h}
                  </div>
                </div>
              </div>

              {/* Mini Sparkline Chart */}
              <div className="w-20 sm:w-28 h-8 hidden sm:block">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparkData}>
                    <Line
                      type="monotone"
                      dataKey="val"
                      stroke={isPositive ? "#10B981" : "#F43F5E"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Price & Change */}
              <div className="text-right">
                <div className="font-mono font-bold text-xs text-slate-900 dark:text-slate-100">
                  ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div
                  className={`inline-flex items-center text-[10px] font-bold ${
                    isPositive ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {isPositive ? "+" : ""}
                  {asset.change24h}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
