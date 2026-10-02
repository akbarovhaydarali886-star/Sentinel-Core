import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { Check, Copy, Eye, EyeOff, Sparkles, CreditCard } from "lucide-react";

export const InteractiveWallet3D = () => {
  const { totalPortfolioValue, showToast } = usePortfolio();
  const { user } = useAuth();
  const { t } = useLanguage();

  const [isBalanceRevealed, setIsBalanceRevealed] = useState(false);
  const [activeCard, setActiveCard] = useState(null); // 'stripe' | 'wise' | 'paypal' | null
  const [copiedCard, setCopiedCard] = useState(null);

  const holderName = user?.name ? user.name.toUpperCase() : "SARDOR RAHIMOV";

  const cards = [
    {
      id: "stripe",
      brand: "Stripe",
      brandColor: "#635bff",
      holderLabel: "Holder",
      holderValue: holderName,
      hiddenNumber: "**** 4242",
      fullNumber: "5524 9910 8821 4242",
      balance: "$24,500.00",
      tier: "PRO Platinum",
      bgClass: "from-indigo-600 to-indigo-800",
    },
    {
      id: "wise",
      brand: "Wise",
      brandColor: "#9bd86a",
      holderLabel: "Business",
      holderValue: "ZENITH CAPITAL LLC",
      hiddenNumber: "**** 8810",
      fullNumber: "9012 4432 1198 8810",
      balance: "$18,400.00",
      tier: "Multi-Currency",
      bgClass: "from-emerald-500 to-teal-700",
    },
    {
      id: "paypal",
      brand: "PayPal",
      brandColor: "#0079C1",
      holderLabel: "Email",
      holderValue: user?.email || "alex@zenith.finance",
      hiddenNumber: "**** 0094",
      fullNumber: "3312 0045 7712 0094",
      balance: "$7,850.00",
      tier: "Verified Merchant",
      bgClass: "from-slate-100 to-slate-200 text-slate-900",
    },
  ];

  const handleCopy = (e, cardNumber, cardId) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cardNumber.replace(/\s+/g, ""));
    setCopiedCard(cardId);
    showToast(`${cards.find((c) => c.id === cardId)?.brand} karta raqami nusxalandi!`);
    setTimeout(() => setCopiedCard(null), 2000);
  };

  return (
    <div className="glass-neo rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 glass-inset rounded-xl text-cyan-400 neon-glow-cyan">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              3D Smart Karta Hamyoni
            </h3>
            <p className="text-[10px] text-slate-400">
              Kartalarni ustiga suring yoki tanlang
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsBalanceRevealed(!isBalanceRevealed)}
          className="p-2 glass-btn rounded-xl text-cyan-400 hover:text-cyan-300 cursor-pointer"
          title={isBalanceRevealed ? "Balansni yashirish" : "Balansni ko'rsatish"}
        >
          {isBalanceRevealed ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      {/* 3D Physical Stitched Wallet Container */}
      <div className="relative w-[280px] h-[225px] select-none group flex justify-center items-end my-2">
        
        {/* Wallet Back Leather Layer */}
        <div className="absolute bottom-0 w-[280px] h-[190px] bg-[#142316] dark:bg-[#0c180e] rounded-[22px_22px_45px_45px] shadow-[inset_0_20px_30px_rgba(0,0,0,0.6),inset_0_5px_15px_rgba(0,0,0,0.7)] border border-emerald-900/40"></div>

        {/* Card 1: Stripe (Topmost position in stack) */}
        <div
          onClick={() => setActiveCard(activeCard === "stripe" ? null : "stripe")}
          className={`absolute left-[10px] w-[260px] h-[135px] rounded-2xl p-4 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_-4px_15px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out cursor-pointer group/card ${
            activeCard === "stripe"
              ? "bottom-[110px] z-50 scale-105 rotate-0 shadow-2xl"
              : "bottom-[80px] z-10 bg-gradient-to-br from-[#635bff] to-[#483d8b] group-hover:translate-y-[-45px] group-hover:rotate-[-3deg] hover:!z-50 hover:!scale-105 hover:!translate-y-[-55px]"
          }`}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
              <span>Stripe Platinum</span>
              <div className="w-8 h-5 bg-white/20 rounded border border-white/30 backdrop-blur-sm"></div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[8px] opacity-70 uppercase block">Egasi</span>
                <span className="text-[10px] font-bold tracking-tight">{holderName}</span>
              </div>
              <div
                onClick={(e) => handleCopy(e, "5524 9910 8821 4242", "stripe")}
                className="text-right cursor-pointer hover:text-cyan-200 transition-colors"
                title="Karta raqamini nusxalash"
              >
                <div className="font-mono text-xs font-bold tracking-wider">
                  {copiedCard === "stripe" ? "Nusxalandi!" : "**** 4242"}
                </div>
                <span className="text-[8px] opacity-60 font-mono block">5524 •••• •••• 4242</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Wise (Middle in stack) */}
        <div
          onClick={() => setActiveCard(activeCard === "wise" ? null : "wise")}
          className={`absolute left-[10px] w-[260px] h-[135px] rounded-2xl p-4 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_-4px_15px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out cursor-pointer group/card ${
            activeCard === "wise"
              ? "bottom-[110px] z-50 scale-105 rotate-0 shadow-2xl"
              : "bottom-[55px] z-20 bg-gradient-to-br from-[#80c844] to-[#4c8421] group-hover:translate-y-[-30px] group-hover:rotate-[2deg] hover:!z-50 hover:!scale-105 hover:!translate-y-[-55px]"
          }`}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
              <span>Wise Business</span>
              <div className="w-8 h-5 bg-white/20 rounded border border-white/30 backdrop-blur-sm"></div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[8px] opacity-70 uppercase block">Kompaniya</span>
                <span className="text-[10px] font-bold tracking-tight">ZENITH LLC</span>
              </div>
              <div
                onClick={(e) => handleCopy(e, "9012 4432 1198 8810", "wise")}
                className="text-right cursor-pointer hover:text-emerald-100 transition-colors"
                title="Karta raqamini nusxalash"
              >
                <div className="font-mono text-xs font-bold tracking-wider">
                  {copiedCard === "wise" ? "Nusxalandi!" : "**** 8810"}
                </div>
                <span className="text-[8px] opacity-60 font-mono block">9012 •••• •••• 8810</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: PayPal (Bottom in stack) */}
        <div
          onClick={() => setActiveCard(activeCard === "paypal" ? null : "paypal")}
          className={`absolute left-[10px] w-[260px] h-[135px] rounded-2xl p-4 text-slate-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_-4px_15px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out cursor-pointer group/card ${
            activeCard === "paypal"
              ? "bottom-[110px] z-50 scale-105 rotate-0 shadow-2xl"
              : "bottom-[30px] z-30 bg-gradient-to-br from-[#ffffff] via-[#f1f5f9] to-[#e2e8f0] group-hover:translate-y-[-10px] hover:!z-50 hover:!scale-105 hover:!translate-y-[-55px]"
          }`}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider">
              <span>Pay<b className="text-[#0079C1]">Pal</b></span>
              <div className="w-8 h-5 bg-black/10 rounded border border-black/15 backdrop-blur-sm"></div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[8px] text-slate-500 uppercase block">Email</span>
                <span className="text-[10px] font-bold text-slate-800">{user?.email || "alex@zenith.finance"}</span>
              </div>
              <div
                onClick={(e) => handleCopy(e, "3312 0045 7712 0094", "paypal")}
                className="text-right cursor-pointer hover:text-blue-700 transition-colors"
                title="Karta raqamini nusxalash"
              >
                <div className="font-mono text-xs font-bold tracking-wider text-[#003087]">
                  {copiedCard === "paypal" ? "Nusxalandi!" : "**** 0094"}
                </div>
                <span className="text-[8px] text-slate-500 font-mono block">3312 •••• •••• 0094</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pocket Front SVG (Stitched Leather Front) */}
        <div className="absolute bottom-0 w-[280px] h-[150px] z-40 drop-shadow-[0_12px_20px_rgba(0,0,0,0.6)] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 280 160" fill="none">
            <path
              d="M 0 20 C 0 10, 5 10, 10 10 C 20 10, 25 25, 40 25 L 240 25 C 255 25, 260 10, 270 10 C 275 10, 280 10, 280 20 L 280 120 C 280 155, 260 160, 240 160 L 40 160 C 20 160, 0 155, 0 120 Z"
              fill="#182c1b"
            ></path>
            <path
              d="M 8 22 C 8 16, 12 16, 15 16 C 23 16, 27 29, 40 29 L 240 29 C 253 29, 257 16, 265 16 C 268 16, 272 16, 272 22 L 272 120 C 272 150, 255 152, 240 152 L 40 152 C 25 152, 8 152, 8 120 Z"
              stroke="#345437"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            ></path>
          </svg>

          {/* Pocket Content (Balance & Live Indicator) */}
          <div className="absolute top-[42px] w-full text-center z-50 flex flex-col items-center gap-1">
            <div className="relative h-6 w-full flex items-center justify-center font-mono">
              <span
                className={`text-xl font-bold tracking-widest text-[#839e7b] transition-all duration-300 ${
                  isBalanceRevealed ? "opacity-0 scale-90" : "opacity-100 group-hover:opacity-0"
                }`}
              >
                ••••••
              </span>
              <span
                className={`absolute text-lg font-black text-emerald-400 font-mono transition-all duration-300 ${
                  isBalanceRevealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                }`}
              >
                ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="text-[11px] font-semibold text-[#80a579] tracking-wide">
              Umumiy Balans (Live)
            </div>
          </div>
        </div>
      </div>

      {/* Footer Helper Subtitle */}
      <p className="text-[11px] text-cyan-400 font-medium italic mt-2 animate-pulse">
        {isBalanceRevealed ? "Balans ochiq" : "Ko'rish uchun ustiga suring (Hover)"}
      </p>
    </div>
  );
};
