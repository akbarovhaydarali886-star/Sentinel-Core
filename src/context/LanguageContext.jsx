import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../constants/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("zenith_lang");
    return saved || "uz";
  });

  useEffect(() => {
    localStorage.setItem("zenith_lang", lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === "uz" ? "en" : "uz"));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations["uz"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
