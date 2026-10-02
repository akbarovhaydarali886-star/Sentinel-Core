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
  ArrowRight,
  Shield
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
  const { t } = useLanguage();
  const { showToast } = usePortfolio();

  // Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

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
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#06B6D4", "#10B981", "#8B5CF6"]
      });
      showToast(t("authSuccessLogin"));
    } else {
      register(fullName, email, password, selectedAvatar);
      confetti({
        particleCount: 80,
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

  const isEmailValid = emailRegex.test(email.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-neo rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        
        {/* Ambient Neon Glows */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 glass-btn rounded-xl text-slate-400 hover:text-white cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl glass-neo text-cyan-400 mb-2 neon-glow-cyan">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            {authMode === "login" ? t("authWelcomeBack") : t("authCreateAccount")}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {authMode === "login" ? t("authSubtitleLogin") : t("authSubtitleRegister")}
          </p>
        </div>

        {/* Tabs: Sign In / Sign Up */}
        <div className="flex p-1 mb-4 glass-inset rounded-2xl">
          <button
            type="button"
            onClick={() => setAuthMode("login")}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              authMode === "login"
                ? "glass-neo text-cyan-400 font-black shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t("login")}
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("register")}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              authMode === "register"
                ? "glass-neo text-cyan-400 font-black shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t("register")}
          </button>
        </div>

        {/* Quick Demo 1-Click Login Button */}
        <button
          type="button"
          onClick={handleQuickDemo}
          className="w-full mb-4 py-2.5 px-4 glass-btn rounded-2xl text-xs font-black text-cyan-400 border border-cyan-500/40 flex items-center justify-center gap-2 cursor-pointer group hover:bg-cyan-500/10"
        >
          <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-125 transition-transform" />
          <span>{t("demoLoginBtn")}</span>
        </button>

        <div className="relative flex items-center justify-center mb-4">
          <div className="border-t border-slate-200/50 dark:border-white/10 w-full"></div>
          <span className="bg-transparent px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            yoki elektron pochta
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* Full Name (Register Mode) */}
          {authMode === "register" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t("fullNameLabel")}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => handleBlur("fullName")}
                  placeholder={t("fullNamePlaceholder")}
                  className={`w-full glass-inset pl-10 pr-4 py-2.5 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                    touched.fullName && errors.fullName
                      ? "focus:ring-rose-500 border-rose-500/50"
                      : "focus:ring-cyan-500"
                  }`}
                />
              </div>
              {touched.fullName && errors.fullName && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName}
                </p>
              )}
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {t("emailLabel")}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder={t("emailPlaceholder")}
                className={`w-full glass-inset pl-10 pr-10 py-2.5 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                  touched.email && errors.email
                    ? "focus:ring-rose-500 border-rose-500/50"
                    : "focus:ring-cyan-500"
                }`}
              />
              {isEmailValid && (
                <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
              )}
            </div>
            {touched.email && errors.email && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {t("passwordLabel")}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                placeholder={t("passwordPlaceholder")}
                className={`w-full glass-inset pl-10 pr-10 py-2.5 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                  touched.password && errors.password
                    ? "focus:ring-rose-500 border-rose-500/50"
                    : "focus:ring-cyan-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {errors.password}
              </p>
            )}

            {/* Live 4-Criteria Password Strength Meter */}
            {authMode === "register" && password.length > 0 && (
              <div className="mt-2.5 p-3 glass-inset rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-[11px] font-semibold">
                  <span className="text-slate-400">{t("passwordStrength")}:</span>
                  <span className="font-bold text-cyan-400">{t(pwdStrength.label)}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${pwdStrength.color} transition-all duration-300`}
                    style={{ width: `${pwdStrength.percent}%` }}
                  ></div>
                </div>

                {/* 4 Checks Checklist */}
                <div className="grid grid-cols-2 gap-1.5 text-[10px] pt-1">
                  <div className={`flex items-center gap-1 ${pwdStrength.criteria.length ? "text-emerald-400 font-bold" : "text-slate-400"}`}>
                    <Check className="w-3 h-3" /> 8+ ta belgi
                  </div>
                  <div className={`flex items-center gap-1 ${pwdStrength.criteria.upper ? "text-emerald-400 font-bold" : "text-slate-400"}`}>
                    <Check className="w-3 h-3" /> Katta harf (A-Z)
                  </div>
                  <div className={`flex items-center gap-1 ${pwdStrength.criteria.number ? "text-emerald-400 font-bold" : "text-slate-400"}`}>
                    <Check className="w-3 h-3" /> Raqam (0-9)
                  </div>
                  <div className={`flex items-center gap-1 ${pwdStrength.criteria.special ? "text-emerald-400 font-bold" : "text-slate-400"}`}>
                    <Check className="w-3 h-3" /> Maxsus belgi (!@#)
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password (Register Mode) */}
          {authMode === "register" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t("confirmPasswordLabel")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => handleBlur("confirmPassword")}
                  placeholder={t("passwordPlaceholder")}
                  className={`w-full glass-inset pl-10 pr-4 py-2.5 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "focus:ring-rose-500 border-rose-500/50"
                      : "focus:ring-cyan-500"
                  }`}
                />
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Avatar Selector (Register Mode) */}
          {authMode === "register" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                {t("chooseAvatar")}
              </label>
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {AVATARS.map((avatar, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`p-0.5 rounded-2xl shrink-0 transition-all cursor-pointer ${
                      selectedAvatar === avatar
                        ? "ring-2 ring-cyan-400 scale-105"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-2xl text-xs font-black text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg neon-glow-cyan cursor-pointer transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>{authMode === "login" ? t("login") : t("register")}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer switch */}
        <div className="text-center mt-4 text-xs text-slate-400">
          {authMode === "login" ? (
            <p>
              {t("dontHaveAccount")}{" "}
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className="font-bold text-cyan-400 hover:underline cursor-pointer ml-1"
              >
                {t("register")}
              </button>
            </p>
          ) : (
            <p>
              {t("alreadyHaveAccount")}{" "}
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="font-bold text-cyan-400 hover:underline cursor-pointer ml-1"
              >
                {t("login")}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
