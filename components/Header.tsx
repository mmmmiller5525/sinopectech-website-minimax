"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "./LangProvider";
import { LocaleSwitcher } from "./LocaleSwitcher";
import type { Settings } from "@/lib/types";

export function Header({ settings }: { settings: Settings }) {
  const { t, locale } = useLang();
  const pathname = usePathname() || "/";
  // URL 不带语言前缀——所有路由都是单语，靠 client LangProvider 切文案
  const items = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/products", label: t.nav.products },
    { href: "/partners", label: t.nav.partners },
    { href: "/contact", label: t.nav.contact },
  ];
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const brandName = locale === "zh" ? settings.site_name_short_cn : settings.site_name_short_en || settings.site_name_en;
  const logoUrl = settings.logo_url;

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-black/5">
      <div className="container-x flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 group">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={brandName} className="h-10 w-auto max-w-[160px] object-contain" />
          ) : (
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white font-bold">S</div>
          )}
          <div className="leading-tight hidden sm:block">
            <div className="text-sm font-semibold text-gray-900">{brandName}</div>
            <div className="text-[11px] text-gray-500">{locale === "zh" ? "丹彩日用品 · 出口" : "Red Color · Export"}</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className={`px-3 py-2 text-sm rounded-md transition ${isActive(it.href) ? "text-brand-700 bg-brand-50" : "text-gray-700 hover:text-brand-700 hover:bg-brand-50/60"}`}>{it.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2"><LocaleSwitcher /></div>
      </div>
      <nav className="md:hidden border-t border-black/5 overflow-x-auto">
        <div className="container-x flex gap-1 py-2">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap ${isActive(it.href) ? "text-brand-700 bg-brand-50" : "text-gray-700 hover:bg-brand-50/60"}`}>{it.label}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
