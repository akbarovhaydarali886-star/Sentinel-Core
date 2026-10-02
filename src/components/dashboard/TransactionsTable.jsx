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
  ExternalLink
} from "lucide-react";

export const TransactionsTable = () => {
  const { transactions, showToast } = usePortfolio();
  const { t } = useLanguage();

  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
    a.download = `zenith-transactions-${Date.now()}.csv`;
    a.click();
    showToast("Tranzaksiyalar tarixi CSV formatida yuklab olindi!");
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
    <div className="neo-box rounded-3xl p-5 sm:p-6 relative overflow-hidden">
      {/* Header with Title and Search/Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-500" />
            {t("transactionsHistory")}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Barcha hamyon faoliyatlari va blokcheyn operatsiyalari
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Qidirish..."
              className="neo-inset pl-8 pr-3 py-1.5 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Export CSV button */}
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 neo-btn neo-box-hover rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-500" />
            <span className="hidden sm:inline">{t("exportCsv")}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4">
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

      {/* Table Content */}
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
              <th className="py-3 px-3 text-right">{t("status")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/40 dark:divide-slate-800/60">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => {
                const badge = getTypeBadge(tx.type);
                const BadgeIcon = badge.icon;
                return (
                  <tr
                    key={tx.id}
                    className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-3 font-mono font-medium text-slate-500 dark:text-slate-400">
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
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {t("completed")}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8 text-slate-400">
                  Hech qanday tranzaksiya topilmadi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
