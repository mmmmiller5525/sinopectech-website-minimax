"use client";
import Link from "next/link";
import { useLang } from "./LangProvider";
import type { Settings } from "@/lib/types";

export function Footer({ settings }: { settings: Settings }) {
  const { t, locale } = useLang();
  const year = new Date().getFullYear();
  const brandName = locale === "zh" ? settings.site_name_short_cn : settings.site_name_short_en || settings.site_name_en;
  const logoUrl = settings.logo_url;

  return (
    <footer className="mt-16 border-t border-black/5 bg-white">
      <div className="container-x py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={brandName} className="h-10 w-auto max-w-[180px] object-contain" />
            ) : (
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white font-bold">S</div>
            )}
            <div>
              <div className="text-sm font-semibold text-gray-900">{brandName}</div>
              <div className="text-xs text-gray-500">{t.brandTagline}</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600 max-w-md">{t.factoryEntity.role} · {t.exportEntity.role}</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">{t.factoryEntity.label}</div>
          <div className="text-sm font-medium text-gray-900">{t.factoryEntity.name}</div>
          <div className="text-sm text-gray-600 mt-1">{t.factoryEntity.address}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">{t.exportEntity.label}</div>
          <div className="text-sm font-medium text-gray-900">{t.exportEntity.name}</div>
          <div className="text-sm text-gray-600 mt-1">{t.exportEntity.address}</div>
        </div>
      </div>
      <div className="border-t border-black/5">
        <div className="container-x py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <div>© {year} {settings.site_name_en || t.factoryEntity.name}. {t.footer.rights}.</div>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-brand-700">{t.nav.contact}</Link>
            <span>·</span>
            <span>Sinopectech Limited (HK)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
