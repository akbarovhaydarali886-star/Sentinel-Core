import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { usePortfolio } from "../../context/PortfolioContext";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { generateHistoricalChartData } from "../../constants/mockData";
import {
  TrendingUp,
  Activity,
  Layers,
  BarChart2,
  Maximize2,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export const MainChart = ({ selectedAssetId, onSelectAsset }) => {
  const { assets } = usePortfolio();
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const [timeframe, setTimeframe] = useState("1D");
  const [chartType, setChartType] = useState("area"); // "area" | "candle" | "line"
  const [showVolume, setShowVolume] = useState(true);

  const currentAsset =
    assets.find((a) => a.id === selectedAssetId) || assets[0];

  const chartData = useMemo(() => {
    return generateHistoricalChartData(timeframe, currentAsset.price);
  }, [timeframe, currentAsset.id]);

  const minPrice = useMemo(() => {
    const prices = chartData.map((d) => d.low || d.price);
    return Math.min(...prices) * 0.99;
  }, [chartData]);

  const maxPrice = useMemo(() => {
    const prices = chartData.map((d) => d.high || d.price);
    return Math.max(...prices) * 1.01;
  }, [chartData]);

  // Custom Neon Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="neo-box p-3 rounded-2xl border border-cyan-500/30 shadow-2xl backdrop-blur-md">
          <div className="text-[11px] text-slate-400 mb-1">{data.time}</div>
          <div className="text-sm font-black font-mono text-cyan-400">
            ${data.price?.toLocaleString()}
          </div>
          {data.high && (
            <div className="grid grid-cols-2 gap-x-3 text-[10px] text-slate-400 mt-1.5 pt-1.5 border-t border-slate-700/50">
              <div>High: <span className="text-emerald-400 font-mono">${data.high}</span></div>
              <div>Low: <span className="text-rose-400 font-mono">${data.low}</span></div>
              <div>Open: <span className="text-slate-300 font-mono">${data.open}</span></div>
              <div>Close: <span className="text-slate-300 font-mono">${data.close}</span></div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="neo-box rounded-3xl p-5 sm:p-6 relative overflow-hidden">
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        
        {/* Coin Selector pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {assets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => onSelectAsset(asset.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 ${
                currentAsset.id === asset.id
                  ? "neo-inset text-cyan-500 border border-cyan-500/40 neon-glow-cyan"
                  : "neo-btn text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: asset.iconColor }}
              ></div>
              <span>{asset.symbol}</span>
            </button>
          ))}
        </div>

        {/* Timeframe & Chart Style switcher */}
        <div className="flex items-center gap-2">
          {/* Timeframe pills */}
          <div className="flex p-1 neo-inset rounded-xl">
            {["1D", "1W", "1M", "1Y"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  timeframe === tf
                    ? "neo-box text-cyan-500 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Type Buttons */}
          <div className="flex p-1 neo-inset rounded-xl">
            <button
              onClick={() => setChartType("area")}
              title={t("areaChart")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                chartType === "area"
                  ? "neo-box text-cyan-500 shadow-sm"
                  : "text-slate-500 hover:text-slate-200"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartType("candle")}
              title={t("candlestickChart")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                chartType === "candle"
                  ? "neo-box text-emerald-500 shadow-sm"
                  : "text-slate-500 hover:text-slate-200"
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartType("line")}
              title={t("lineChart")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                chartType === "line"
                  ? "neo-box text-violet-500 shadow-sm"
                  : "text-slate-500 hover:text-slate-200"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Current Coin Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-200/50 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white text-sm shadow-md"
            style={{ backgroundColor: currentAsset.iconColor }}
          >
            {currentAsset.symbol.substring(0, 3)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                ${currentAsset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-md ${
                  currentAsset.change24h >= 0
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                }`}
              >
                {currentAsset.change24h >= 0 ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {currentAsset.change24h >= 0 ? "+" : ""}
                {currentAsset.change24h}%
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {currentAsset.name} / USD
            </p>
          </div>
        </div>

        {/* 24h High/Low/Vol metrics */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block">{t("high24h")}</span>
            <span className="font-mono font-bold text-emerald-500">
              ${currentAsset.high24h.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">{t("low24h")}</span>
            <span className="font-mono font-bold text-rose-500">
              ${currentAsset.low24h.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">{t("volume")}</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-200">
              ${currentAsset.volume24h}
            </span>
          </div>
        </div>
      </div>

      {/* Main Chart Graphic */}
      <div className="h-72 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "candle" ? (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#1e293b" : "#e2e8f0"}
                vertical={false}
              />
              <XAxis
                dataKey="time"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                domain={[minPrice, maxPrice]}
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                orientation="right"
                tickFormatter={(v) => `$${v.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="close"
                fill="#06b6d4"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : chartType === "line" ? (
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#1e293b" : "#e2e8f0"}
                vertical={false}
              />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                domain={[minPrice, maxPrice]}
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                orientation="right"
                tickFormatter={(v) => `$${v.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#06b6d4"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="ma20"
                stroke="#8b5cf6"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          ) : (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#1e293b" : "#e2e8f0"}
                vertical={false}
              />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                domain={[minPrice, maxPrice]}
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                orientation="right"
                tickFormatter={(v) => `$${v.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#06b6d4"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#neonGradient)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
