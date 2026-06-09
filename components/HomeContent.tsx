"use client";
import Link from "next/link";
import { useLang } from "./LangProvider";
import { InquiryForm } from "./InquiryForm";
import type { Product, Company, Settings } from "@/lib/types";

export function HomeContent({ products, company, settings }: { products: Product[]; company: Company; settings: Settings }) {
  const { t, locale } = useLang();
  const featured = products.slice(0, 4);
  const factoryName = locale === "zh" ? company.name_cn : company.name_en;
  const factoryAddr = locale === "zh" ? company.address_cn : company.address_en;
  const factoryRole = locale === "zh" ? company.description_cn : company.description_en;
  const heroTitle = (locale === "zh" ? settings.hero_title_cn : settings.hero_title_en).replace(/\\n/g, "\n");
  const heroSub = locale === "zh" ? settings.hero_subtitle_cn : settings.hero_subtitle_en;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-90" style={{ background: "radial-gradient(1200px 600px at 80% -10%, #f4cda9 0%, transparent 60%), radial-gradient(900px 500px at -10% 20%, #fae8d8 0%, transparent 60%), linear-gradient(180deg, #fdf6f0 0%, #ffffff 100%)" }} />
        <div className="container-x section grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-white/80 ring-1 ring-black/5 px-3 py-1 text-xs text-brand-700">{t.home.heroEyebrow}</span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] whitespace-pre-line">{heroTitle}</h1>
            <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-xl">{heroSub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">{t.home.heroCtaPrimary}</Link>
              <Link href="/contact" className="btn-ghost">{t.home.heroCtaSecondary}</Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[5/4] w-full rounded-3xl bg-gradient-to-br from-brand-200 via-brand-100 to-white shadow-2xl ring-1 ring-black/5 grid place-items-center overflow-hidden">
              {settings.hero_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={settings.hero_image_url} alt="Hero" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center px-8">
                  <div className="text-7xl mb-4">🧸</div>
                  <div className="text-sm uppercase tracking-widest text-brand-700 font-semibold">{locale === "zh" ? "玩具原创设计与制造" : "Original Design Manufacturer"}</div>
                  <div className="mt-2 text-xs text-gray-500">PVC · ABS · TPR · Resin · Alloy</div>
                </div>
              )}
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:block card px-4 py-3">
              <div className="text-xs text-gray-500">{t.factoryEntity.label}</div>
              <div className="text-sm font-semibold">{factoryName}</div>
            </div>
            <div className="absolute -top-4 -right-4 hidden sm:block card px-4 py-3">
              <div className="text-xs text-gray-500">{t.exportEntity.label}</div>
              <div className="text-sm font-semibold">Sinopec Technologies Limited</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x -mt-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          {(settings.home_stats || []).map((s, i) => (
            <div key={i} className="card p-5 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-brand-700">{locale === "zh" ? s.value_cn : s.value_en}</div>
              <div className="mt-1 text-xs sm:text-sm text-gray-600">{locale === "zh" ? s.label_cn : s.label_en}</div>
            </div>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section">
          <div className="container-x">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{locale === "zh" ? settings.home_featured_title_cn : settings.home_featured_title_en}</h2>
                <p className="text-sm text-gray-600 mt-1">{locale === "zh" ? settings.home_featured_subtitle_cn : settings.home_featured_subtitle_en}</p>
              </div>
              <Link href="/products" className="text-sm text-brand-700 hover:underline">{locale === "zh" ? settings.home_featured_cta_cn : settings.home_featured_cta_en}</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="card group hover:shadow-md transition">
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image_url} alt={locale === "zh" ? p.name_cn : p.name_en} className="w-full h-full object-cover group-hover:scale-[1.02] transition" loading="lazy" />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-gray-300 text-sm">No image</div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] uppercase tracking-wider text-brand-700">{p.category}</div>
                    <div className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2">{locale === "zh" ? p.name_cn : p.name_en}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-gradient-to-b from-white to-brand-50">
        <div className="container-x grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{locale === "zh" ? settings.home_about_title_cn : settings.home_about_title_en}</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">{locale === "zh" ? settings.home_about_body_cn : settings.home_about_body_en}</p>
            <Link href="/about" className="btn-ghost mt-6">{locale === "zh" ? settings.home_about_cta_cn : settings.home_about_cta_en}</Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card p-6">
              <div className="text-xs text-gray-500">{t.factoryEntity.label}</div>
              <div className="mt-1 font-semibold">{factoryName}</div>
              <div className="mt-1 text-sm text-gray-600">{factoryAddr}</div>
              <div className="mt-3 text-xs text-gray-500">{factoryRole}</div>
            </div>
            <div className="card p-6">
              <div className="text-xs text-gray-500">{t.exportEntity.label}</div>
              <div className="mt-1 font-semibold">Sinopec Technologies Limited</div>
              <div className="mt-1 text-sm text-gray-600">{locale === "zh" ? "中国香港" : "Hong Kong"}</div>
              <div className="mt-3 text-xs text-gray-500">{locale === "zh" ? "全球贸易、订单与物流对接" : "Global trade, order handling and logistics"}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.nav.contact}</h2>
            <p className="mt-3 text-gray-600">{t.contact.subtitle}</p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
