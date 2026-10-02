import React, { useState, useEffect } from "react";
import { useAuth, AVATARS, calculatePasswordStrength } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  X,
  Mail,
  Lock,
  User,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Zap,
  Check,
  ArrowRight
} from "lucide-react";
import confetti from "canvas-confetti";

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    login,
    register,
    loginWithDemo
  } = useAuth();
  const { t, lang } = useLanguage();
  const { showToast } = usePortfolio();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [showPassword, setShowPassword] = useState(false);

  // Errors & Touched
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors({});
    setTouched({});
  }, [authMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pwdStrength = calculatePasswordStrength(password);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = t("errEmailRequired");
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = t("errEmailInvalid");
    }

    if (!password) {
      newErrors.password = t("errPasswordRequired");
    } else if (password.length < 6) {
      newErrors.password = t("errPasswordLength");
    }

    if (authMode === "register") {
      if (!fullName.trim()) {
        newErrors.fullName = t("errNameRequired");
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = t("errPasswordMatch");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      fullName: true
    });

    if (!validateForm()) return;

    if (authMode === "login") {
      login(email, password);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#06B6D4", "#10B981", "#8B5CF6"]
      });
      showToast(t("authSuccessLogin"));
    } else {
      register(fullName, email, password, selectedAvatar);
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#10B981", "#06B6D4", "#3B82F6"]
      });
      showToast(t("authSuccessRegister"));
    }
  };

  const handleQuickDemo = () => {
    loginWithDemo();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast("Demo hisobga muvaffaqiyatli kirdingiz!");
  };

  const handleSocialLogin = (provider) => {
    login(`${provider.toLowerCase()}@zenith.finance`, "DemoPassword123!");
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    showToast(`${provider} orqali muvaffaqiyatli kirdingiz!`);
  };

  const isEmailValid = emailRegex.test(email.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Uiverse Custom Aesthetic Card Container with Glassmorphism + Neumorphism Fusion */}
      <div className="relative w-full max-w-[390px] rounded-[40px] p-6 sm:p-8 bg-gradient-to-b from-white via-[#f4f7fb] to-[#ebf1f8] dark:from-[#151c2e] dark:via-[#0f1422] dark:to-[#090d16] border-[5px] border-white dark:border-white/10 shadow-[0_30px_35px_-20px_rgba(6,182,212,0.4)] dark:shadow-[0_30px_35px_-20px_rgba(0,0,0,0.8)] overflow-hidden max-h-[95vh] overflow-y-auto">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white glass-btn cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1089D3] dark:text-cyan-400">
            {authMode === "login" ? (lang === "uz" ? "Kirish" : "Sign In") : (lang === "uz" ? "Ro'yxatdan o'tish" : "Sign Up")}
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {authMode === "login" ? t("authSubtitleLogin") : t("authSubtitleRegister")}
          </p>
        </div>

        {/* Tabs: Sign In / Sign Up */}
        <div className="flex p-1 mb-4 rounded-2xl glass-inset">
          <button
            type="button"
            onClick={() => setAuthMode("login")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              authMode === "login"
                ? "bg-white dark:bg-slate-800 text-[#1089D3] dark:text-cyan-400 shadow-md font-black"
                : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
            }`}
          >
            {t("login")}
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("register")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              authMode === "register"
                ? "bg-white dark:bg-slate-800 text-[#1089D3] dark:text-cyan-400 shadow-md font-black"
                : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
            }`}
          >
            {t("register")}
          </button>
        </div>

        {/* 1-Click Demo Login Button */}
        <button
          type="button"
          onClick={handleQuickDemo}
          className="w-full mb-3 py-2.5 px-4 rounded-2xl text-xs font-black text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer hover:bg-cyan-500/20 transition-all group shadow-sm"
        >
          <Zap className="w-4 h-4 text-cyan-500 group-hover:scale-125 transition-transform" />
          <span>{t("demoLoginBtn")}</span>
        </button>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          
          {/* Full Name for Registration */}
          {authMode === "register" && (
            <div>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => handleBlur("fullName")}
                  placeholder={t("fullNamePlaceholder")}
                  className={`w-full bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white px-5 py-3.5 rounded-[20px] text-xs shadow-[0_10px_10px_-5px_#cff0ff] dark:shadow-none border-x-2 border-transparent focus:border-x-[#12B1D1] focus:outline-none transition-all placeholder-slate-400 ${
                    touched.fullName && errors.fullName ? "!border-x-rose-500" : ""
                  }`}
                />
              </div>
              {touched.fullName && errors.fullName && (
                <p className="text-[10px] text-rose-500 mt-1 font-semibold pl-2">
                  {errors.fullName}
                </p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder={t("emailPlaceholder")}
                className={`w-full bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white px-5 py-3.5 rounded-[20px] text-xs shadow-[0_10px_10px_-5px_#cff0ff] dark:shadow-none border-x-2 border-transparent focus:border-x-[#12B1D1] focus:outline-none transition-all placeholder-slate-400 ${
                  touched.email && errors.email ? "!border-x-rose-500" : ""
                }`}
              />
              {isEmailValid && (
                <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
              )}
            </div>
            {touched.email && errors.email && (
              <p className="text-[10px] text-rose-500 mt-1 font-semibold pl-2">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                placeholder={t("passwordPlaceholder")}
                className={`w-full bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white px-5 py-3.5 rounded-[20px] text-xs shadow-[0_10px_10px_-5px_#cff0ff] dark:shadow-none border-x-2 border-transparent focus:border-x-[#12B1D1] focus:outline-none transition-all placeholder-slate-400 ${
                  touched.password && errors.password ? "!border-x-rose-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-[10px] text-rose-500 mt-1 font-semibold pl-2">
                {errors.password}
              </p>
            )}

            {/* Password Criteria for Register Mode */}
            {authMode === "register" && password.length > 0 && (
              <div className="mt-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/60 space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-300">
                  <span>{t("passwordStrength")}:</span>
                  <span className="text-cyan-500">{t(pwdStrength.label)}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${pwdStrength.color} transition-all duration-300`}
                    style={{ width: `${pwdStrength.percent}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password for Register Mode */}
          {authMode === "register" && (
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => handleBlur("confirmPassword")}
                  placeholder={t("confirmPasswordLabel")}
                  className={`w-full bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white px-5 py-3.5 rounded-[20px] text-xs shadow-[0_10px_10px_-5px_#cff0ff] dark:shadow-none border-x-2 border-transparent focus:border-x-[#12B1D1] focus:outline-none transition-all placeholder-slate-400 ${
                    touched.confirmPassword && errors.confirmPassword ? "!border-x-rose-500" : ""
                  }`}
                />
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-[10px] text-rose-500 mt-1 font-semibold pl-2">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Avatar Selector (Register Mode) */}
          {authMode === "register" && (
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {t("chooseAvatar")}
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {AVATARS.map((avatar, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`p-0.5 rounded-xl shrink-0 transition-all cursor-pointer ${
                      selectedAvatar === avatar
                        ? "ring-2 ring-cyan-500 scale-105"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-9 h-9 rounded-lg object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Forgot password link */}
          {authMode === "login" && (
            <div className="flex justify-end pr-2">
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Parolni tiklash havolasi emailingizga yuborildi!");
                }}
                className="text-[11px] text-[#0099ff] hover:underline cursor-pointer"
              >
                {t("forgotPassword")}
              </a>
            </div>
          )}

          {/* Login / Register Button with Uiverse Gradient Effect */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-[20px] font-bold text-xs text-white bg-gradient-to-r from-[#1089D3] to-[#12B1D1] hover:scale-[1.03] active:scale-[0.96] shadow-[0_20px_10px_-15px_rgba(133,189,215,0.88)] dark:shadow-[0_10px_20px_rgba(18,177,209,0.3)] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            <span>{authMode === "login" ? t("login") : t("register")}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Social Accounts Container */}
        <div className="mt-5 text-center">
          <span className="text-[10px] text-slate-400 block mb-2.5">
            {lang === "uz" ? "Yoki ijtimoiy tarmoqlar orqali" : "Or Sign in with"}
          </span>
          <div className="flex justify-center gap-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={() => handleSocialLogin("Google")}
              title="Google bilan kirish"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-white border-[3px] border-white dark:border-slate-800 flex items-center justify-center shadow-[0_12px_10px_-8px_rgba(133,189,215,0.88)] hover:scale-125 active:scale-90 transition-transform duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
            </button>

            {/* Apple Button */}
            <button
              type="button"
              onClick={() => handleSocialLogin("Apple")}
              title="Apple bilan kirish"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-white border-[3px] border-white dark:border-slate-800 flex items-center justify-center shadow-[0_12px_10px_-8px_rgba(133,189,215,0.88)] hover:scale-125 active:scale-90 transition-transform duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
              </svg>
            </button>

            {/* X / Twitter Button */}
            <button
              type="button"
              onClick={() => handleSocialLogin("Twitter")}
              title="X (Twitter) bilan kirish"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-white border-[3px] border-white dark:border-slate-800 flex items-center justify-center shadow-[0_12px_10px_-8px_rgba(133,189,215,0.88)] hover:scale-125 active:scale-90 transition-transform duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* License Agreement Footer */}
        <div className="text-center mt-4">
          <a href="#license" className="text-[10px] text-[#0099ff] hover:underline">
            {lang === "uz" ? "Foydalanuvchi litsenziya shartlari" : "Learn user licence agreement"}
          </a>
        </div>
      </div>
    </div>
  );
};
