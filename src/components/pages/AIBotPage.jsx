import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  Bot,
  Sparkles,
  Send,
  Brain,
  ShieldCheck,
  TrendingUp,
  Gauge,
  Flame,
  CheckCircle2,
  Zap,
  RefreshCw,
  Cpu
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import confetti from "canvas-confetti";

export const AIBotPage = () => {
  const { assets, totalPortfolioValue, showToast } = usePortfolio();
  const { t, lang } = useLanguage();

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [rebalancing, setRebalancing] = useState(false);

  // Chat message history
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text:
        lang === "uz"
          ? "Assalomu alaykum! Men Zenith AI Sentinel maslahatchisiman. Portfelingizni tahlil qildim: sizda umumiy $18,450 naqd USD va 6 ta kripto aktiv mavjud. Sharpe koeffitsienti 2.14 (juda barqaror). Sizga qanday yordam bera olaman?"
          : "Hello! I am Zenith AI Sentinel, your portfolio co-pilot. I've audited your assets: total net worth is well diversified with a 2.14 Sharpe ratio. How can I assist your trading strategy today?",
      time: "Hozir",
      confidence: 96,
    },
  ]);

  // Backtest comparison data (AI DCA vs Buy & Hold)
  const backtestData = [
    { day: "D1", aiDCA: 10000, buyHold: 10000 },
    { day: "D15", aiDCA: 10600, buyHold: 10100 },
    { day: "D30", aiDCA: 11200, buyHold: 9800 },
    { day: "D45", aiDCA: 11950, buyHold: 10500 },
    { day: "D60", aiDCA: 12400, buyHold: 10200 },
    { day: "D75", aiDCA: 13100, buyHold: 11100 },
    { day: "D90", aiDCA: 13480, buyHold: 11400 },
  ];

  const quickPrompts = [
    lang === "uz" ? "Portfelim xavfsizligini tekshir" : "Audit my portfolio health",
    lang === "uz" ? "BTC keyingi 7 kunda qayoqqa ketadi?" : "Bitcoin 7-day price forecast",
    lang === "uz" ? "Riskni qanday pasaytirsam bo'ladi?" : "How to reduce altcoin drawdown?",
    lang === "uz" ? "DCA strategiyasini faollashtir" : "Explain AI DCA rebalancing",
  ];

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    // Simulated Intelligent AI Sentinel responses
    setTimeout(() => {
      let aiResponseText = "";
      if (query.toLowerCase().includes("btc") || query.toLowerCase().includes("bitcoin")) {
        aiResponseText =
          lang === "uz"
            ? "Bitcoin (BTC) hozirda $88,450 atrofida konsolidatsiyalashmoqda. RSI ko'rsatkichi 62 (neytral-bullish). Institutsional ETF oqimlari davom etayotgani sababli, 7 kunlik prognoz $91,500 qarshilik darajasini test qilishini ko'rsatmoqda. Xarid qilish uchun $86,000-$87,200 oralig'i optimal zona."
            : "Bitcoin (BTC) is consolidating near $88,450 with neutral-bullish momentum (RSI 62). Strong institutional inflows indicate a test of the $91,500 resistance within the next 7 days. Optimal accumulation zone: $86,000 - $87,200.";
      } else if (query.toLowerCase().includes("risk") || query.toLowerCase().includes("xavfsiz")) {
        aiResponseText =
          lang === "uz"
            ? "Portfelingiz xavf tahlili: Bluechip aktivlar (BTC + ETH) 68% ni tashkil qiladi, bu xavfsiz. Volatillik past (18.2%). Agar riskni yanada minimallashtirmoqchi bo'lsangiz, 'Auto-Rebalance' tugmasi orqali altcoinlarning 5% qismini USDC ga o'tkazish tavsiya etiladi."
            : "Portfolio risk audit: Core bluechips (BTC + ETH) represent 68% of capital. Volatility index is calm at 18.2%. To hedge against short-term pullbacks, rebalancing 5% of altcoin gains into stablecoins is optimal.";
      } else {
        aiResponseText =
          lang === "uz"
            ? `Zenith AI hisob-kitoblariga ko'ra: Sizning umumiy portfelingiz ($${totalPortfolioValue.toLocaleString()}) bo'yicha tavsiya: Joriy bozor kayfiyati "Greed (74)". Foydali pozitsiyalarni qisman fiksatsiya qilib, DCA usulida yangi kiritmalar qilish tavsiya etiladi.`
            : `According to Zenith AI deep models: For your current portfolio ($${totalPortfolioValue.toLocaleString()}), the market index is at 'Greed (74)'. Disciplined DCA positioning remains the highest Sharpe ratio approach.`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: aiResponseText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        confidence: Math.floor(Math.random() * 6 + 92),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleAutoRebalance = () => {
    setRebalancing(true);
    setTimeout(() => {
      setRebalancing(false);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#8B5CF6", "#06B6D4", "#10B981"]
      });
      showToast(t("rebalanceSuccess"));
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-violet-500/15 text-violet-400 border border-violet-500/30">
              ● NEURAL SENTINEL v4.2
            </span>
            <span className="text-xs text-slate-400 font-mono">99.8% Accuracy Rate</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {t("aiTitle")}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t("aiSubtitle")}
          </p>
        </div>
      </div>

      {/* Main Grid: AI Chat (Left 7 cols) & AI Metrics/Backtest (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Live AI Chat (7 cols) */}
        <div className="lg:col-span-7 neo-box rounded-3xl p-5 sm:p-6 relative overflow-hidden flex flex-col h-[620px]">
          
          {/* Chat Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/50 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl neo-inset flex items-center justify-center text-cyan-400 neon-glow-cyan">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Zenith AI Sentinel Co-Pilot
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-500 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online & Real-time Audit
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                setMessages([
                  {
                    id: Date.now(),
                    sender: "ai",
                    text: "Suhbat yangilandi. Qanday savolingiz bor?",
                    time: "Hozir",
                  },
                ])
              }
              className="p-2 neo-btn rounded-xl text-slate-400 hover:text-slate-200 cursor-pointer"
              title="Suhbatni tozalash"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-xl neo-box flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md rounded-tr-sm"
                      : "neo-inset text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-700/40"
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className="flex items-center justify-between gap-3 mt-2 text-[10px] opacity-70">
                    <span>{msg.time}</span>
                    {msg.confidence && (
                      <span className="font-mono text-cyan-400 font-bold">
                        {t("aiConfidence")}: {msg.confidence}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-cyan-400 animate-pulse p-2">
                <Bot className="w-4 h-4" />
                <span>{t("aiThinking")}</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="py-3 overflow-x-auto flex gap-2 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1.5 neo-btn neo-box-hover rounded-xl text-[11px] font-semibold text-slate-600 dark:text-slate-300 shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-800"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={t("aiChatPlaceholder")}
              className="flex-1 neo-inset px-4 py-3 rounded-2xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-md neon-glow-cyan cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: AI Backtester & Auto-Rebalancer (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AI Strategy Backtest Chart */}
          <div className="neo-box rounded-3xl p-5 sm:p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Brain className="w-4 h-4 text-violet-400" />
                {t("aiBacktest")}
              </h3>
              <span className="px-2 py-0.5 text-xs font-bold text-emerald-500 bg-emerald-500/10 rounded-lg">
                +34.8% Alpha
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">
              {t("aiBacktestDesc")}
            </p>

            {/* Backtest Line Chart */}
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={backtestData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.15)" vertical={false} />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis
                    stroke="#64748b"
                    fontSize={10}
                    tickLine={false}
                    orientation="right"
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="neo-box p-2.5 rounded-xl text-xs font-mono">
                            <div className="text-cyan-400 font-bold">AI DCA: ${payload[0]?.value}</div>
                            <div className="text-slate-400">Hold: ${payload[1]?.value}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line type="monotone" dataKey="aiDCA" stroke="#8B5CF6" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="buyHold" stroke="#64748B" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Auto-Rebalance Trigger Box */}
          <div className="neo-box rounded-3xl p-5 sm:p-6 relative overflow-hidden">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-cyan-500" />
              {t("rebalanceBtn")}
            </h3>
            <p className="text-[11px] text-slate-400 mb-4">
              Sun'iy intellekt riskni kamaytirish va daromadni oshirish uchun portfelingizni bir zumda optimal foizlarga taqsimlaydi.
            </p>

            <button
              onClick={handleAutoRebalance}
              disabled={rebalancing}
              className="w-full py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-lg neon-glow-violet flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <Cpu className={`w-4 h-4 ${rebalancing ? "animate-spin" : ""}`} />
              <span>{rebalancing ? t("aiAuditingPortfolio") : t("rebalanceBtn")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
