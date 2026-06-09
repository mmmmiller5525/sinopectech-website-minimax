"use client";
import Link from "next/link";
import { useLang } from "@/components/LangProvider";
import { InquiryForm } from "@/components/InquiryForm";
import type { Product } from "@/lib/types";

export function ProductDetailContent({ product: p }: { product: Product }) {
  const { t, locale } = useLang();
  const name = locale === "zh" ? p.name_cn : p.name_en;
  const desc = locale === "zh" ? p.description_cn : p.description_en;
  const gallery = (p.gallery_images && p.gallery_images.length > 0 ? p.gallery_images : [p.image_url]).filter(Boolean) as string[];

  return (
    <section className="section">
      <div className="container-x grid lg:grid-cols-2 gap-10">
        <div>
          <div className="card overflow-hidden">
            <div className="aspect-square bg-gray-100">
              {gallery[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={gallery[0]} alt={name} className="w-full h-full object-cover" loading="lazy" />
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-brand-700">{p.category} · {p.series}</div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>
          <p className="mt-4 text-gray-600 leading-relaxed">{desc}</p>
          {p.specs && p.specs.length > 0 && (
            <div className="mt-6">
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">{t.products.detailSpecs}</div>
              <div className="card divide-y divide-black/5">
                {p.specs.map((s, i) => (
                  <div key={i} className="grid grid-cols-2 px-4 py-2.5 text-sm">
                    <div className="text-gray-500">{locale === "zh" ? s.k_cn : s.k_en}</div>
                    <div className="text-gray-900">{locale === "zh" ? s.v_cn : s.v_en}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6 flex gap-3">
            <Link href="/contact" className="btn-primary">{t.products.detailCta}</Link>
            <Link href="/products" className="btn-ghost">← {t.products.title}</Link>
          </div>
        </div>
      </div>
      <div className="container-x mt-10"><div className="card p-6 sm:p-8"><InquiryForm productName={name} /></div></div>
    </section>
  );
}
