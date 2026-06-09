"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangProvider";
import type { Product } from "@/lib/types";

export function ProductsContent({ products }: { products: Product[] }) {
  const { t, locale } = useLang();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const cats = useMemo(() => ["All", ...Array.from(new Set(products.map(p => p.category))).sort()], [products]);
  const list = useMemo(() => products.filter(p => {
    if (cat !== "All" && p.category !== cat) return false;
    if (!q.trim()) return true;
    return `${p.name_cn} ${p.name_en} ${p.series}`.toLowerCase().includes(q.trim().toLowerCase());
  }), [q, cat, products]);

  return (
    <section className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.products.title}</h1>
          <p className="mt-2 text-gray-600">{t.products.subtitle}</p>
        </div>
        <div className="mt-8">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.products.searchPlaceholder} className="w-full rounded-full border border-black/10 bg-white px-5 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-1.5 rounded-full text-sm transition ${cat === c ? "bg-brand-600 text-white" : "bg-white border border-black/10 text-gray-700 hover:border-brand-300"}`}>{c}</button>
          ))}
        </div>
        {list.length === 0 ? (
          <div className="mt-10 card p-10 text-center text-gray-500 text-sm">{t.products.empty}</div>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="card group hover:shadow-md transition">
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  {p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image_url} alt={locale === "zh" ? p.name_cn : p.name_en} className="w-full h-full object-cover group-hover:scale-[1.02] transition" loading="lazy" />
                  ) : <div className="w-full h-full grid place-items-center text-gray-300 text-sm">No image</div>}
                </div>
                <div className="p-4">
                  <div className="text-[11px] uppercase tracking-wider text-brand-700">{p.category}</div>
                  <div className="mt-1 text-base font-semibold text-gray-900">{locale === "zh" ? p.name_cn : p.name_en}</div>
                  <div className="mt-1 text-xs text-gray-500">Series · {p.series}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
