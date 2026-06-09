"use client";
import { useLang } from "@/components/LangProvider";
import type { About } from "@/lib/types";

export function AboutContent({ about }: { about: About }) {
  const { t } = useLang();
  return (
    <>
      <section className="section">
        <div className="container-x max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{about.title_en || t.about.title}</h1>
          <p className="mt-2 text-gray-600">{about.subtitle_en || t.about.subtitle}</p>
          <h2 className="mt-10 text-xl font-semibold text-gray-900">{t.about.storyTitle}</h2>
          <p className="mt-3 text-gray-600 leading-relaxed whitespace-pre-line">{about.content_en || t.about.storyBody}</p>
        </div>
      </section>
      <section className="section bg-brand-50">
        <div className="container-x grid lg:grid-cols-2 gap-8">
          <div className="card p-8">
            <div className="text-xs uppercase tracking-wider text-brand-700">{t.about.factoryTitle}</div>
            <div className="mt-2 text-lg font-semibold text-gray-900">{t.factoryEntity.name}</div>
            <div className="text-sm text-gray-500">{t.factoryEntity.address}</div>
            <p className="mt-4 text-sm text-gray-700 leading-relaxed">{t.about.factoryBody}</p>
          </div>
          <div className="card p-8">
            <div className="text-xs uppercase tracking-wider text-brand-700">{t.about.exportTitle}</div>
            <div className="mt-2 text-lg font-semibold text-gray-900">{t.exportEntity.name}</div>
            <div className="text-sm text-gray-500">{t.exportEntity.address}</div>
            <p className="mt-4 text-sm text-gray-700 leading-relaxed">{t.about.exportBody}</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.about.values.map((v) => (
            <div key={v.title} className="card p-6">
              <div className="text-base font-semibold text-gray-900">{v.title}</div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
