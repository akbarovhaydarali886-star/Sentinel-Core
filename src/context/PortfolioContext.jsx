import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_ASSETS, INITIAL_TRANSACTIONS } from "../constants/mockData";
import confetti from "canvas-confetti";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [cashBalance, setCashBalance] = useState(() => {
    const saved = localStorage.getItem("zenith_cash_balance");
    return saved !== null ? parseFloat(saved) : 18450.00;
  });

  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem("zenith_assets");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ASSETS;
      }
    }
    return INITIAL_ASSETS;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("zenith_transactions");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_TRANSACTIONS;
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev?.id ? null : prev));
    }, 4000);
  };

  useEffect(() => {
    localStorage.setItem("zenith_cash_balance", cashBalance.toString());
  }, [cashBalance]);

  useEffect(() => {
    localStorage.setItem("zenith_assets", JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem("zenith_transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Live price fluctuation simulation every 6 seconds for dynamic feel
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prevAssets) =>
        prevAssets.map((asset) => {
          const deltaPct = (Math.random() - 0.49) * 0.4; // +/- 0.2%
          const newPrice = Math.max(0.01, asset.price * (1 + deltaPct / 100));
          const roundedPrice = Math.round(newPrice * 100) / 100;
          const newSparkline = [...asset.sparkline.slice(1), roundedPrice];
          return {
            ...asset,
            price: roundedPrice,
            change24h: Math.round((asset.change24h + deltaPct * 0.2) * 100) / 100,
            sparkline: newSparkline,
          };
        })
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const totalAssetValue = assets.reduce(
    (acc, asset) => acc + asset.holdings * asset.price,
    0
  );

  const totalPortfolioValue = cashBalance + totalAssetValue;

  const totalDailyPnl = assets.reduce(
    (acc, asset) => acc + (asset.holdings * asset.price * asset.change24h) / 100,
    0
  );

  const dailyPnlPercentage =
    totalPortfolioValue > 0 ? (totalDailyPnl / totalPortfolioValue) * 100 : 0;

  const buyAsset = (assetId, usdAmount) => {
    const asset = assets.find((a) => a.id === assetId || a.symbol === assetId);
    if (!asset) return { success: false, message: "Asset not found" };

    const cost = parseFloat(usdAmount);
    if (isNaN(cost) || cost <= 0) return { success: false, message: "Invalid amount" };
    if (cost > cashBalance) return { success: false, message: "Insufficient funds" };

    const coinsToBuy = cost / asset.price;
    setCashBalance((prev) => prev - cost);
    setAssets((prev) =>
      prev.map((a) =>
        a.id === asset.id ? { ...a, holdings: a.holdings + coinsToBuy } : a
      )
    );

    const newTx = {
      id: "TX-" + Math.floor(10000 + Math.random() * 90000),
      type: "buy",
      asset: asset.symbol,
      amount: `${coinsToBuy.toFixed(4)} ${asset.symbol}`,
      price: `$${asset.price.toLocaleString()}`,
      total: `$${cost.toFixed(2)}`,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "completed",
      hash: "0x" + Math.random().toString(16).substring(2, 6) + "..." + Math.random().toString(16).substring(2, 6),
    };

    setTransactions((prev) => [newTx, ...prev]);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#10B981", "#06B6D4", "#3B82F6"],
    });

    showToast(`Muvaffaqiyatli xarid: ${coinsToBuy.toFixed(4)} ${asset.symbol}`);
    return { success: true, coinsBought: coinsToBuy };
  };

  const sellAsset = (assetId, coinAmount) => {
    const asset = assets.find((a) => a.id === assetId || a.symbol === assetId);
    if (!asset) return { success: false, message: "Asset not found" };

    const amount = parseFloat(coinAmount);
    if (isNaN(amount) || amount <= 0) return { success: false, message: "Invalid amount" };
    if (amount > asset.holdings) return { success: false, message: "Insufficient coin balance" };

    const usdGained = amount * asset.price;
    setCashBalance((prev) => prev + usdGained);
    setAssets((prev) =>
      prev.map((a) =>
        a.id === asset.id ? { ...a, holdings: a.holdings - amount } : a
      )
    );

    const newTx = {
      id: "TX-" + Math.floor(10000 + Math.random() * 90000),
      type: "sell",
      asset: asset.symbol,
      amount: `${amount.toFixed(4)} ${asset.symbol}`,
      price: `$${asset.price.toLocaleString()}`,
      total: `$${usdGained.toFixed(2)}`,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "completed",
      hash: "0x" + Math.random().toString(16).substring(2, 6) + "..." + Math.random().toString(16).substring(2, 6),
    };

    setTransactions((prev) => [newTx, ...prev]);

    showToast(`Muvaffaqiyatli sotildi: ${amount.toFixed(4)} ${asset.symbol} ($${usdGained.toFixed(2)})`);
    return { success: true, usdGained };
  };

  const swapTokens = (fromSymbol, toSymbol, fromAmount) => {
    const fromAsset = assets.find((a) => a.symbol === fromSymbol);
    const toAsset = assets.find((a) => a.symbol === toSymbol);

    if (!fromAsset || !toAsset) return { success: false, message: "Asset not found" };
    const amount = parseFloat(fromAmount);
    if (isNaN(amount) || amount <= 0) return { success: false, message: "Invalid amount" };
    if (amount > fromAsset.holdings) return { success: false, message: "Insufficient balance" };

    const usdValue = amount * fromAsset.price;
    const toAmount = usdValue / toAsset.price;

    setAssets((prev) =>
      prev.map((a) => {
        if (a.symbol === fromSymbol) return { ...a, holdings: a.holdings - amount };
        if (a.symbol === toSymbol) return { ...a, holdings: a.holdings + toAmount };
        return a;
      })
    );

    const newTx = {
      id: "TX-" + Math.floor(10000 + Math.random() * 90000),
      type: "swap",
      asset: `${fromSymbol} → ${toSymbol}`,
      amount: `${amount.toFixed(4)} ${fromSymbol}`,
      price: `1 ${fromSymbol} = ${(fromAsset.price / toAsset.price).toFixed(4)} ${toSymbol}`,
      total: `$${usdValue.toFixed(2)}`,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "completed",
      hash: "0x" + Math.random().toString(16).substring(2, 6) + "..." + Math.random().toString(16).substring(2, 6),
    };

    setTransactions((prev) => [newTx, ...prev]);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#8B5CF6", "#06B6D4", "#10B981"],
    });

    showToast(`Almashtirish bajarildi: ${amount} ${fromSymbol} → ${toAmount.toFixed(4)} ${toSymbol}`);
    return { success: true, toAmount };
  };

  const depositFunds = (amount = 5000) => {
    setCashBalance((prev) => prev + amount);
    const newTx = {
      id: "TX-" + Math.floor(10000 + Math.random() * 90000),
      type: "deposit",
      asset: "USD",
      amount: `$${amount.toLocaleString()}`,
      price: "$1.00",
      total: `$${amount.toFixed(2)}`,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "completed",
      hash: "0x" + Math.random().toString(16).substring(2, 6) + "..." + Math.random().toString(16).substring(2, 6),
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`+$${amount.toLocaleString()} USD depozit qilindi!`);
  };

  const resetDemoBalance = () => {
    setCashBalance(18450.0);
    setAssets(INITIAL_ASSETS);
    setTransactions(INITIAL_TRANSACTIONS);
    showToast("Demo hisob qayta tiklandi ($50,000 qiymat)!");
  };

  return (
    <PortfolioContext.Provider
      value={{
        cashBalance,
        assets,
        transactions,
        totalPortfolioValue,
        totalAssetValue,
        totalDailyPnl,
        dailyPnlPercentage,
        buyAsset,
        sellAsset,
        swapTokens,
        depositFunds,
        resetDemoBalance,
        toast,
        showToast,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
