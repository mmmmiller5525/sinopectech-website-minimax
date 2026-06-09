"use client";
import { useLang } from "./LangProvider";

export function LocaleSwitcher() {
  const { locale, setLocale } = useLang();
  return (
    <div className="inline-flex items-center rounded-full border border-black/10 bg-white p-0.5 text-xs">
      <button onClick={() => setLocale("zh")} className={`px-3 py-1.5 rounded-full transition ${locale === "zh" ? "bg-brand-600 text-white" : "text-gray-600 hover:text-brand-700"}`}>中文</button>
      <button onClick={() => setLocale("en")} className={`px-3 py-1.5 rounded-full transition ${locale === "en" ? "bg-brand-600 text-white" : "text-gray-600 hover:text-brand-700"}`}>EN</button>
    </div>
  );
}
