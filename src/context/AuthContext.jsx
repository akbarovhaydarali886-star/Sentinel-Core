import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
];

export const calculatePasswordStrength = (password) => {
  if (!password) return { score: 0, label: "pwdWeak", color: "bg-red-500", percent: 0, criteria: { length: false, upper: false, number: false, special: false } };
  
  const criteria = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  let score = 0;
  if (criteria.length) score += 1;
  if (criteria.upper) score += 1;
  if (criteria.number) score += 1;
  if (criteria.special) score += 1;

  if (score <= 1) return { score: 1, label: "pwdWeak", color: "bg-red-500", percent: 25, criteria };
  if (score === 2) return { score: 2, label: "pwdFair", color: "bg-amber-500", percent: 50, criteria };
  if (score === 3) return { score: 3, label: "pwdGood", color: "bg-cyan-500", percent: 75, criteria };
  return { score: 4, label: "pwdStrong", color: "bg-emerald-500", percent: 100, criteria };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("zenith_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return {
      name: "Sardorbek Rahimov",
      email: "sardor@zenith.finance",
      avatar: AVATARS[1],
      isLoggedIn: true,
      walletAddress: "0x89D2...4F81",
      fullWalletAddress: "0x89D2A901F188B67C19842F992E5C398188244F81",
      tier: "VIP PRO Trader",
      kycStatus: "Level 2 Verified",
      twoFactorEnabled: true,
      joinDate: "2026-01-15",
      ipAddress: "178.218.201.42 (Tashkent, UZ)",
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("zenith_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("zenith_user");
    }
  }, [user]);

  const loginWithDemo = () => {
    const demoUser = {
      name: "Sardorbek Rahimov",
      email: "demo@zenith.finance",
      avatar: AVATARS[1],
      isLoggedIn: true,
      walletAddress: "0x89D2...4F81",
      fullWalletAddress: "0x89D2A901F188B67C19842F992E5C398188244F81",
      tier: "VIP PRO Trader",
      kycStatus: "Level 2 Verified",
      twoFactorEnabled: true,
      joinDate: "2026-01-15",
      ipAddress: "178.218.201.42 (Tashkent, UZ)",
    };
    setUser(demoUser);
    setIsAuthModalOpen(false);
    return demoUser;
  };

  const login = (email, password) => {
    const namePart = email.split("@")[0];
    const loggedUser = {
      name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      email,
      avatar: AVATARS[0],
      isLoggedIn: true,
      walletAddress: "0x3Fa9...99B2",
      fullWalletAddress: "0x3Fa9B912C098E451992984B2199201F8211999B2",
      tier: "VIP PRO Trader",
      kycStatus: "Level 2 Verified",
      twoFactorEnabled: true,
      joinDate: "2026-03-20",
      ipAddress: "178.218.201.42 (Tashkent, UZ)",
    };
    setUser(loggedUser);
    setIsAuthModalOpen(false);
    return loggedUser;
  };

  const register = (fullName, email, password, avatarUrl) => {
    const randomHex = Math.random().toString(16).substring(2, 6);
    const newUser = {
      name: fullName,
      email,
      avatar: avatarUrl || AVATARS[0],
      isLoggedIn: true,
      walletAddress: `0x${randomHex.toUpperCase()}...${Math.random().toString(16).substring(2, 6).toUpperCase()}`,
      fullWalletAddress: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      tier: "Standard PRO Trader",
      kycStatus: "Level 1 Verified",
      twoFactorEnabled: false,
      joinDate: new Date().toISOString().split("T")[0],
      ipAddress: "178.218.201.42 (Tashkent, UZ)",
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return newUser;
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  const logout = () => {
    setUser(null);
    setIsProfileModalOpen(false);
  };

  const openLoginModal = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        setIsAuthModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        openLoginModal,
        openRegisterModal,
        openProfileModal,
        login,
        register,
        loginWithDemo,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
