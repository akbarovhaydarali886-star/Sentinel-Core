import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  History,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowRightLeft,
  Coins,
  Download,
  Search,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileSpreadsheet,
  FileCode,
  Receipt,
  X
} from "lucide-react";

export const HistoryPage = () => {
  const { transactions, showToast } = usePortfolio();
  const { t } = useLanguage();

  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTx, setSelectedTx] = useState(null);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesFilter = filterType === "all" || tx.type === filterType;
    const matchesSearch =
      tx.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExportCsv = () => {
    const header = "ID,Type,Asset,Amount,Price,Total,Date,Status,Hash\n";
    const rows = filteredTransactions
      .map(
        (tx) =>
          `"${tx.id}","${tx.type}","${tx.asset}","${tx.amount}","${tx.price}","${tx.total}","${tx.date}","${tx.status}","${tx.hash}"`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zenith-audit-report-${Date.now()}.csv`;
    a.click();
    showToast("CSV Hisobot muvaffaqiyatli yuklab olindi!");
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(filteredTransactions, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zenith-audit-report-${Date.now()}.json`;
    a.click();
    showToast("JSON Hisobot muvaffaqiyatli yuklab olindi!");
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "buy":
        return {
          label: t("filterBuy"),
          icon: ArrowDownLeft,
          color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        };
      case "sell":
        return {
          label: t("filterSell"),
          icon: ArrowUpRight,
          color: "bg-rose-500/10 text-rose-500 border-rose-500/20",
        };
      case "swap":
        return {
          label: t("filterSwap"),
          icon: ArrowRightLeft,
          color: "bg-violet-500/10 text-violet-500 border-violet-500/20",
        };
      case "deposit":
        return {
          label: t("filterDeposit"),
          icon: Coins,
          color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
        };
      default:
        return {
          label: type,
          icon: History,
          color: "bg-slate-500/10 text-slate-400 border-slate-500/20",
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-rose-500/15 text-rose-400 border border-rose-500/30">
              IMMUTABLE AUDIT TRAIL
            </span>
            <span className="text-xs text-slate-400 font-mono">100% On-Chain Verified</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {t("historyTitle")}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t("historySubtitle")}
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-4 py-2 neo-btn neo-box-hover rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            <span>{t("exportCsv")}</span>
          </button>
          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-4 py-2 neo-btn neo-box-hover rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            <FileCode className="w-4 h-4 text-cyan-500" />
            <span>{t("exportJson")}</span>
          </button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="neo-box rounded-3xl p-5">
          <span className="text-xs text-slate-400 block mb-1">
            {t("totalVolumeTraded")}
          </span>
          <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
            $42,910.00
          </span>
        </div>
        <div className="neo-box rounded-3xl p-5">
          <span className="text-xs text-slate-400 block mb-1">
            Jami Tranzaksiyalar Soni
          </span>
          <span className="text-xl sm:text-2xl font-black font-mono text-cyan-400">
            {transactions.length} ta bitim
          </span>
        </div>
        <div className="neo-box rounded-3xl p-5">
          <span className="text-xs text-slate-400 block mb-1">
            {t("gasUsed")}
          </span>
          <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
            $12.40 USD (Optimized)
          </span>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="neo-box rounded-3xl p-5 sm:p-6 relative overflow-hidden">
        
        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: "all", label: t("filterAll") },
              { id: "buy", label: t("filterBuy") },
              { id: "sell", label: t("filterSell") },
              { id: "swap", label: t("filterSwap") },
              { id: "deposit", label: t("filterDeposit") },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0 ${
                  filterType === tab.id
                    ? "neo-inset text-cyan-500 border border-cyan-500/30 font-extrabold"
                    : "neo-btn text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Hash yoki aktiv nomi..."
              className="neo-inset pl-8 pr-3 py-2 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full sm:w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/60 dark:border-slate-800/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">{t("txHash")}</th>
                <th className="py-3 px-3">{t("type")}</th>
                <th className="py-3 px-3">{t("asset")}</th>
                <th className="py-3 px-3">{t("amount")}</th>
                <th className="py-3 px-3">{t("totalCost")}</th>
                <th className="py-3 px-3">{t("date")}</th>
                <th className="py-3 px-3 text-right">{t("action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/40 dark:divide-slate-800/60">
              {filteredTransactions.map((tx) => {
                const badge = getTypeBadge(tx.type);
                const BadgeIcon = badge.icon;
                return (
                  <tr
                    key={tx.id}
                    className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedTx(tx)}
                  >
                    <td className="py-3.5 px-3 font-mono font-medium text-cyan-500 hover:underline">
                      {tx.hash}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${badge.color}`}
                      >
                        <BadgeIcon className="w-3 h-3" />
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">
                      {tx.asset}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {tx.amount}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900 dark:text-white">
                      {tx.total}
                    </td>
                    <td className="py-3.5 px-3 text-slate-400 font-mono text-[11px]">
                      {tx.date}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTx(tx);
                        }}
                        className="px-2.5 py-1 neo-btn rounded-lg text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-400"
                      >
                        Kvitansiya
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal Drawer */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md neo-box rounded-3xl p-6 relative border border-slate-700/80 shadow-2xl">
            <button
              onClick={() => setSelectedTx(null)}
              className="absolute top-5 right-5 p-2 neo-btn rounded-xl text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 neo-inset rounded-2xl text-cyan-400">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {t("receiptDetails")}
                </h3>
                <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Blokcheynda Tasdiqlangan
                </span>
              </div>
            </div>

            <div className="p-4 neo-inset rounded-2xl space-y-2.5 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-700/40 pb-2">
                <span className="text-slate-400">ID:</span>
                <span className="text-slate-200 font-bold">{selectedTx.id}</span>
              </div>
              <div className="flex justify-between border-b border-slate-700/40 pb-2">
                <span className="text-slate-400">Turi:</span>
                <span className="text-cyan-400 font-bold uppercase">{selectedTx.type}</span>
              </div>
              <div className="flex justify-between border-b border-slate-700/40 pb-2">
                <span className="text-slate-400">Aktiv:</span>
                <span className="text-slate-200 font-bold">{selectedTx.asset}</span>
              </div>
              <div className="flex justify-between border-b border-slate-700/40 pb-2">
                <span className="text-slate-400">Miqdor:</span>
                <span className="text-slate-200 font-bold">{selectedTx.amount}</span>
              </div>
              <div className="flex justify-between border-b border-slate-700/40 pb-2">
                <span className="text-slate-400">Qiymat:</span>
                <span className="text-emerald-400 font-bold">{selectedTx.total}</span>
              </div>
              <div className="flex justify-between border-b border-slate-700/40 pb-2">
                <span className="text-slate-400">Sana:</span>
                <span className="text-slate-300">{selectedTx.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tx Hash:</span>
                <span className="text-cyan-400 font-bold">{selectedTx.hash}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTx(null)}
              className="w-full mt-5 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg cursor-pointer"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
