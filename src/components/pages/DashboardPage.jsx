import React, { useMemo } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { useLanguage } from "../../context/LanguageContext";
import { MetricCards } from "../dashboard/MetricCards";
import { AssetAllocation } from "../dashboard/AssetAllocation";
import { InteractiveWallet3D } from "../dashboard/InteractiveWallet3D";
import {
  Wallet,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  PlusCircle,
  BarChart3,
  Layers,
  Coins
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export const DashboardPage = ({ setActivePage, setSelectedAssetId }) => {
  const {
    assets,
    cashBalance,
    totalPortfolioValue,
    totalDailyPnl,
    dailyPnlPercentage,
    depositFunds
  } = usePortfolio();
  const { t } = useLanguage();

  // Growth Chart historical data
  const growthData = useMemo(() => {
    const data = [];
    const base = totalPortfolioValue * 0.78;
    const months = ["May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr"];
    let curr = base;
    months.forEach((m, idx) => {
      curr = curr * (1 + (idx === 5 ? 0.08 : 0.05 + Math.random() * 0.03));
      data.push({
        month: m,
        val: Math.round(curr),
        benchmark: Math.round(base * (1 + idx * 0.03))
      });
    });
    return data;
  }, [totalPortfolioValue]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Welcome Banner & Quick Actions */}
      <div className="glass-neo rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              ● REAL-TIME AUDIT
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {assets.length} {t("allAssetsCount")}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            {t("overviewTitle")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            {t("overviewSubtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 w-full sm:w-auto">
          <button
            onClick={() => depositFunds(5000)}
            className="flex-1 sm:flex-initial px-5 py-3 glass-btn rounded-2xl text-xs font-bold text-emerald-400 border border-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t("quickDeposit")}</span>
          </button>
          <button
            onClick={() => setActivePage("trade")}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg neon-glow-cyan flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t("tradeNow")}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* 4 Core Financial Metric Cards */}
      <MetricCards />

      {/* Main Grid: Growth Trajectory Chart & 3D Physical Wallet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Performance Milestones Chart (7 cols) */}
        <div className="lg:col-span-7 glass-neo rounded-3xl p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                {t("performanceMilestones")}
              </h3>
              <p className="text-[11px] text-slate-400">
                O'tgan 6 oylik umumiy kapital o'sish dinamikasi (+28.4% Alpha)
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              +28.4% YTD
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.15)" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  orientation="right"
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="glass-neo p-3 rounded-2xl border border-cyan-500/30">
                          <span className="text-[10px] text-slate-400">{payload[0].payload.month} 2026</span>
                          <div className="text-sm font-black font-mono text-cyan-400">
                            ${payload[0].value?.toLocaleString()}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="val"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#growthGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3D Physical Stitched Wallet Widget (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <InteractiveWallet3D />
        </div>
      </div>

      {/* Grid: Asset Allocation Donut */}
      <div className="grid grid-cols-1 gap-6">
        <AssetAllocation
          onSelectAsset={(id) => {
            setSelectedAssetId(id);
            setActivePage("trade");
          }}
        />
      </div>

      {/* Complete Holdings Breakdown Table */}
      <div className="glass-neo rounded-3xl p-5 sm:p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Coins className="w-4 h-4 text-cyan-400" />
              {t("yourHoldings")}
            </h3>
            <p className="text-[11px] text-slate-400">
              Hamyoningizdagi barcha aktivlar va ularning real-time qiymati
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/60 dark:border-white/10 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">{t("coin")}</th>
                <th className="py-3 px-3">{t("price")}</th>
                <th className="py-3 px-3">24s O'zgarish</th>
                <th className="py-3 px-3">{t("holdingAmount")}</th>
                <th className="py-3 px-3">{t("holdingValue")}</th>
                <th className="py-3 px-3 text-right">{t("action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/40 dark:divide-white/5">
              {assets.map((asset) => {
                const valueUsd = asset.holdings * asset.price;
                const isPositive = asset.change24h >= 0;
                return (
                  <tr
                    key={asset.id}
                    className="hover:bg-slate-100/60 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-sm"
                          style={{ backgroundColor: asset.iconColor }}
                        >
                          {asset.symbol.substring(0, 3)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {asset.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {asset.symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900 dark:text-white">
                      ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-3 font-bold font-mono">
                      <span
                        className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] ${
                          isPositive
                            ? "text-emerald-400 bg-emerald-500/10"
                            : "text-rose-400 bg-rose-500/10"
                        }`}
                      >
                        {isPositive ? "+" : ""}
                        {asset.change24h}%
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {asset.holdings.toFixed(4)} {asset.symbol}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900 dark:text-white">
                      ${valueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedAssetId(asset.id);
                          setActivePage("trade");
                        }}
                        className="px-3 py-1.5 glass-btn rounded-xl text-xs font-bold text-cyan-400 cursor-pointer"
                      >
                        {t("tradeNow")}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
