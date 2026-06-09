"use client";
import { useLang } from "@/components/LangProvider";
import type { Partner } from "@/lib/types";

const REGION_NAMES: Record<string, { cn: string; en: string; flag: string }> = {
  USA: { cn: "美国", en: "United States", flag: "🇺🇸" },
  Japan: { cn: "日本", en: "Japan", flag: "🇯🇵" },
  Europe: { cn: "欧洲", en: "Europe", flag: "🇪🇺" },
  "South Africa": { cn: "南非", en: "South Africa", flag: "🇿🇦" },
  Other: { cn: "其他", en: "Other", flag: "🌍" },
};

export function PartnersContent({ partners }: { partners: Partner[] }) {
  const { t, locale } = useLang();

  // 按 region 分组
  const groups = partners.reduce<Record<string, Partner[]>>((acc, p) => {
    (acc[p.region] = acc[p.region] || []).push(p);
    return acc;
  }, {});

  return (
    <section className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.partners.title}</h1>
          <p className="mt-2 text-gray-600">{t.partners.subtitle}</p>
        </div>

        {partners.length === 0 ? (
          <div className="mt-10 card p-10 text-center text-gray-500 text-sm">{t.partners.coming}</div>
        ) : (
          <div className="mt-10 space-y-8">
            {Object.entries(groups).map(([region, list]) => {
              const r = REGION_NAMES[region] || REGION_NAMES.Other;
              return (
                <div key={region} className="card p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{r.flag}</span>
                    <h2 className="text-xl font-bold text-gray-900">{locale === "zh" ? r.cn : r.en}</h2>
                    <span className="text-sm text-gray-500">· {list.length}</span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {list.map((p) => (
                      <div key={p.id} className="rounded-xl border border-black/5 p-4 hover:shadow-sm transition bg-white">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-gray-100 grid place-items-center text-gray-400 text-xs shrink-0">
                            {p.logo_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={p.logo_url} alt={p.name} className="h-full w-full object-contain rounded-lg" />
                            ) : (
                              p.name.slice(0, 2)
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-semibold text-gray-900 truncate">{p.name}</div>
                            {p.website && (
                              <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-700 hover:underline truncate block">
                                {p.website.replace(/^https?:\/\//, "")}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
