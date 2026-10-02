import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { PortfolioProvider } from "./context/PortfolioContext";

import { LeftSidebar } from "./components/common/LeftSidebar";
import { Header } from "./components/common/Header";
import { CommandPalette } from "./components/common/CommandPalette";
import { NotificationToast } from "./components/common/NotificationToast";
import { AuthModal } from "./components/auth/AuthModal";
import { ProfileModal } from "./components/profile/ProfileModal";

// 5 Dedicated Top-Tier Pages
import { DashboardPage } from "./components/pages/DashboardPage";
import { TradePage } from "./components/pages/TradePage";
import { SwapPage } from "./components/pages/SwapPage";
import { AIBotPage } from "./components/pages/AIBotPage";
import { HistoryPage } from "./components/pages/HistoryPage";

const MainLayout = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedAssetId, setSelectedAssetId] = useState("bitcoin");
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300 flex flex-col selection:bg-cyan-500 selection:text-white relative overflow-x-hidden">
      
      {/* Background Ambient Neon Glow Orbs (Tri-Fusion Atmosphere) */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Left Dedicated Sidebar (Desktop fixed, Mobile sliding drawer) */}
      <LeftSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content Area shifted right for the left sidebar */}
      <div className="lg:pl-80 flex-1 flex flex-col min-h-screen z-10">
        
        {/* Top Header Bar */}
        <Header
          activePage={activePage}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Dynamic 5-Page Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
          
          {/* PAGE 1: 📊 Executive Dashboard */}
          {activePage === "dashboard" && (
            <DashboardPage
              setActivePage={setActivePage}
              setSelectedAssetId={setSelectedAssetId}
            />
          )}

          {/* PAGE 2: 📈 Pro Spot Trading Terminal */}
          {activePage === "trade" && (
            <TradePage
              selectedAssetId={selectedAssetId}
              setSelectedAssetId={setSelectedAssetId}
            />
          )}

          {/* PAGE 3: 🔄 DEX Swap & Liquidity Hub */}
          {activePage === "swap" && <SwapPage />}

          {/* PAGE 4: 🧠 Zenith AI Sentinel Bot */}
          {activePage === "ai-bot" && <AIBotPage />}

          {/* PAGE 5: 📜 Transactions & Blockchain Audit */}
          {activePage === "history" && <HistoryPage />}
        </main>

        {/* Global Footer */}
        <footer className="mt-auto border-t border-slate-200/60 dark:border-white/10 py-6 px-4 sm:px-8 text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 dark:text-white tracking-wider">
                ZENITH CAPITAL OS
              </span>
              <span>•</span>
              <span>Glassmorphism + Neumorphism + Neonism Architecture</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Core Engine 100% Operational
              </span>
              <span className="font-mono">Gas: 14 Gwei</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals & Overlays */}
      <AuthModal />
      <ProfileModal />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        setActivePage={setActivePage}
      />
      <NotificationToast />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <PortfolioProvider>
            <MainLayout />
          </PortfolioProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
