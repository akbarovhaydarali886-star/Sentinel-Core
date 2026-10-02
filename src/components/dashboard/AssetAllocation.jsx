import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { usePortfolio } from "../../context/PortfolioContext";
import { useLanguage } from "../../context/LanguageContext";
import { PieChart as PieIcon, ArrowRight } from "lucide-react";

export const AssetAllocation = ({ onSelectAsset }) => {
  const { assets, cashBalance, totalPortfolioValue } = usePortfolio();
  const { t } = useLanguage();

  const data = [
    ...assets
      .filter((a) => a.holdings * a.price > 0)
      .map((a) => ({
        name: a.symbol,
        fullName: a.name,
        value: Math.round(a.holdings * a.price * 100) / 100,
        color: a.iconColor,
        id: a.id,
        holdings: a.holdings,
      })),
    {
      name: "USD",
      fullName: "Cash USD",
      value: Math.round(cashBalance * 100) / 100,
      color: "#10B981",
      id: "usd",
      holdings: cashBalance,
    },
  ];

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const pct =
        totalPortfolioValue > 0
          ? ((item.value / totalPortfolioValue) * 100).toFixed(1)
          : 0;
      return (
        <div className="neo-box p-3 rounded-2xl border border-slate-700/60 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-xs font-bold text-slate-800 dark:text-white">
              {item.name}
            </span>
          </div>
          <div className="text-xs font-mono text-cyan-400 font-bold">
            ${item.value.toLocaleString()} ({pct}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="neo-box rounded-3xl p-5 sm:p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-cyan-500" />
          {t("assetAllocation")}
        </h3>
        <span className="text-xs font-bold text-slate-400">
          {data.length} ta aktiv
        </span>
      </div>

      {/* Donut Chart */}
      <div className="h-52 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomPieTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">
            Portfel
          </span>
          <span className="text-xs font-black font-mono text-slate-900 dark:text-white">
            100%
          </span>
        </div>
      </div>

      {/* Holdings List */}
      <div className="mt-4 space-y-2 max-h-48 overflow-y-auto pr-1">
        {data.map((item, idx) => {
          const sharePct =
            totalPortfolioValue > 0
              ? ((item.value / totalPortfolioValue) * 100).toFixed(1)
              : 0;
          return (
            <div
              key={idx}
              onClick={() => item.id !== "usd" && onSelectAsset(item.id)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white leading-tight">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {item.id === "usd"
                      ? `$${item.holdings.toFixed(2)}`
                      : `${item.holdings.toFixed(4)} ${item.name}`}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-slate-800 dark:text-slate-100">
                  ${item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] font-bold text-cyan-500">
                  {sharePct}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
