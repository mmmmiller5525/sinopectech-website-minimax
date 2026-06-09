"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { siteCopy, type Locale, type Copy } from "@/lib/copy";

type Ctx = { locale: Locale; setLocale: (l: Locale) => void; t: Copy };
const LangCtx = createContext<Ctx | null>(null);
const STORAGE_KEY = "sinopectech.locale";

function detectInitial(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "zh" || saved === "en") return saved;
  return (window.navigator?.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  useEffect(() => { setLocaleState(detectInitial()); }, []);
  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    }
  }, []);
  const value = useMemo<Ctx>(() => ({ locale, setLocale, t: siteCopy[locale] }), [locale, setLocale]);
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangCtx);
  if (!ctx) return { locale: "en", setLocale: () => {}, t: siteCopy.en };
  return ctx;
}
