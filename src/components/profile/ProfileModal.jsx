import React, { useState } from "react";
import { useAuth, AVATARS, calculatePasswordStrength } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  X,
  User,
  Mail,
  ShieldCheck,
  Shield,
  Key,
  Wallet,
  Copy,
  Check,
  Smartphone,
  Lock,
  LogOut,
  Sparkles,
  Zap,
  Globe,
  Camera,
  Activity,
  Award
} from "lucide-react";
import confetti from "canvas-confetti";

export const ProfileModal = () => {
  const {
    user,
    isProfileModalOpen,
    setIsProfileModalOpen,
    updateProfile,
    logout
  } = useAuth();
  const { t, lang } = useLanguage();
  const { showToast, totalPortfolioValue } = usePortfolio();

  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "security" | "tier"
  const [copied, setCopied] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || "");

  // Password change form
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [pwdError, setPwdError] = useState("");

  if (!isProfileModalOpen || !user) return null;

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(user.fullWalletAddress || "0x89D2A901F188B67C19842F992E5C398188244F81");
    setCopied(true);
    showToast("Hamyon manzili nusxalandi!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveName = () => {
    if (!nameInput.trim()) return;
    updateProfile({ name: nameInput });
    setIsEditingName(false);
    showToast("Ism muvaffaqiyatli o'zgartirildi!");
  };

  const handleSelectAvatar = (avatarUrl) => {
    updateProfile({ avatar: avatarUrl });
    showToast("Profil avatari yangilandi!");
  };

  const handleToggle2FA = () => {
    const nextState = !user.twoFactorEnabled;
    updateProfile({ twoFactorEnabled: nextState });
    showToast(nextState ? "2FA Xavfsizligi faollashtirildi!" : "2FA o'chirildi.");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!oldPassword) {
      setPwdError("Amaldagi parolni kiriting");
      return;
    }
    if (newPassword.length < 8) {
      setPwdError("Yangi parol kamida 8 ta belgidan iborat bo'lsin");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPwdError("Yangi parollar mos kelmadi");
      return;
    }

    setPwdError("");
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    showToast("Parol muvaffaqiyatli yangilandi!");
  };

  const pwdStrength = calculatePasswordStrength(newPassword);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-neo rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Background Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-violet-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => setIsProfileModalOpen(false)}
          className="absolute top-5 right-5 p-2 glass-btn rounded-xl text-slate-400 hover:text-white cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-200/50 dark:border-white/10 shrink-0">
          
          {/* Avatar with Ring */}
          <div className="relative group">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-3xl object-cover ring-4 ring-cyan-500/40 shadow-xl"
            />
            <div className="absolute -bottom-1 -right-1 p-1.5 glass-neo rounded-xl text-cyan-400 shadow-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* Name & Tier Info */}
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="glass-inset px-3 py-1 rounded-xl text-sm font-bold text-white focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-500 text-white cursor-pointer"
                  >
                    Saqlash
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    {user.name}
                  </h2>
                  <button
                    onClick={() => {
                      setNameInput(user.name);
                      setIsEditingName(true);
                    }}
                    className="text-[11px] text-cyan-400 hover:underline font-semibold cursor-pointer"
                  >
                    Tahrirlash
                  </button>
                </div>
              )}

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/40">
                <Award className="w-3 h-3 text-amber-400" />
                {user.tier}
              </span>
            </div>

            <p className="text-xs text-slate-400 font-mono">
              {user.email} • A'zolik sanasi: {user.joinDate}
            </p>

            {/* Wallet Address Bar with Copy */}
            <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
              <div className="glass-inset px-3 py-1 rounded-xl flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Wallet className="w-3.5 h-3.5 text-slate-400" />
                <span>{user.walletAddress}</span>
              </div>
              <button
                onClick={handleCopyWallet}
                className="p-1.5 glass-btn rounded-xl text-slate-400 hover:text-white cursor-pointer"
                title="To'liq manzilni nusxalash"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Nav Tabs */}
        <div className="flex p-1 my-4 glass-inset rounded-2xl shrink-0">
          {[
            { id: "overview", label: "Umumiy & Avatar", icon: User },
            { id: "security", label: "Xavfsizlik & 2FA", icon: ShieldCheck },
            { id: "tier", label: "VIP Imtiyozlar", icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "glass-neo text-cyan-400 shadow-sm font-black"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          
          {/* TAB 1: OVERVIEW & AVATAR PICKER */}
          {activeTab === "overview" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Avatar Selector */}
              <div className="glass-neo rounded-2xl p-4">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-cyan-400" />
                  Profil Avatarini Tanlash
                </h4>
                <div className="grid grid-cols-6 gap-2">
                  {AVATARS.map((avatar, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAvatar(avatar)}
                      className={`relative p-0.5 rounded-2xl transition-all cursor-pointer ${
                        user.avatar === avatar
                          ? "ring-2 ring-cyan-400 scale-105"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={avatar}
                        alt={`Avatar ${idx}`}
                        className="w-full h-12 rounded-xl object-cover"
                      />
                      {user.avatar === avatar && (
                        <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Account Stats Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="glass-inset rounded-2xl p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    KYC Verifikatsiya Holati
                  </span>
                  <div className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    {user.kycStatus}
                  </div>
                </div>

                <div className="glass-inset rounded-2xl p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    So'nggi Kirish IP & Joylashuv
                  </span>
                  <div className="text-xs font-bold text-slate-300 font-mono">
                    {user.ipAddress}
                  </div>
                </div>
              </div>

              {/* Total Balance Snapshot */}
              <div className="glass-neo rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    Umumiy Portfel Qiymati
                  </span>
                  <div className="text-lg font-black font-mono text-cyan-400">
                    ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  Faol Hisob
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: SECURITY & 2FA & PASSWORD */}
          {activeTab === "security" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              
              {/* 2FA Toggle */}
              <div className="glass-neo rounded-2xl p-4 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                    Ikki Bosqichli Himoya (2FA)
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Google Authenticator yoki SMS orqali har bir kirishda tasdiqlash
                  </p>
                </div>

                <button
                  onClick={handleToggle2FA}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    user.twoFactorEnabled ? "bg-emerald-500" : "bg-slate-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 absolute top-0.5 ${
                      user.twoFactorEnabled ? "left-6.5" : "left-0.5"
                    }`}
                  ></div>
                </button>
              </div>

              {/* Change Password Form */}
              <form onSubmit={handleChangePassword} className="glass-neo rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-cyan-400" />
                  Parolni Yangilash
                </h4>

                {pwdError && (
                  <p className="text-[11px] text-rose-400 font-semibold">{pwdError}</p>
                )}

                <div>
                  <input
                    type="password"
                    placeholder="Amaldagi parol"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full glass-inset px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Yangi parol (kamida 8 ta belgi)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full glass-inset px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />

                  {/* Password Strength Progress Bar */}
                  {newPassword.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${pwdStrength.color} transition-all duration-300`}
                          style={{ width: `${pwdStrength.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Yangi parolni tasdiqlang"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full glass-inset px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md cursor-pointer"
                >
                  Yangi Parolni Saqlash
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: VIP TIER PRIVILEGES */}
          {activeTab === "tier" && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="glass-neo rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <span>VIP PRO Trader Status Imtiyozlari</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 glass-inset rounded-xl">
                    <span className="text-slate-300">Savdo Komissiyasi Chegirmasi:</span>
                    <span className="font-bold text-emerald-400 font-mono">0.05% (50% chegirma)</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 glass-inset rounded-xl">
                    <span className="text-slate-300">Zenith AI Sentinel Maslahatlari:</span>
                    <span className="font-bold text-cyan-400">Cheklovsiz (VIP Access)</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 glass-inset rounded-xl">
                    <span className="text-slate-300">DEX Slippage & Route Himoyasi:</span>
                    <span className="font-bold text-violet-400">Maksimal Tezkorlik</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 glass-inset rounded-xl">
                    <span className="text-slate-300">24/7 Shaxsiy Kripto Auditor:</span>
                    <span className="font-bold text-emerald-400">Faol</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Logout Button */}
        <div className="pt-4 mt-2 border-t border-slate-200/50 dark:border-white/10 shrink-0">
          <button
            onClick={() => {
              logout();
              showToast("Tizimdan muvaffaqiyatli chiqdingiz.");
            }}
            className="w-full py-3 glass-btn rounded-2xl text-xs font-bold text-rose-400 hover:text-rose-300 border border-rose-500/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Tizimdan Chiqish (Sign Out)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
