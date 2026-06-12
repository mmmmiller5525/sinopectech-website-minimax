"use client";
import { useState, useTransition } from "react";
import type { Settings, HomeStat } from "@/lib/types";
import { uploadImage } from "@/lib/upload";

export function SettingsEditor({ initial }: { initial: Settings }) {
  const [form, setForm] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  function onSave(e: React.FormEvent) {
    e.preventDefault(); setMsg(null);
    startTransition(async () => {
      const res = await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await res.json();
      setMsg(res.ok ? "已保存" : (d.error || "保存失败"));
    });
  }
  async function onUpload(field: "logo_url" | "favicon_url" | "hero_image_url", file: File) {
    setUploading(field); setMsg(null);
    const r = await uploadImage(file, { bucket: "assets" });
    setUploading(null);
    if (!r.ok) { setMsg(r.error); return; }
    setForm(f => ({ ...f, [field]: r.url }));
  }

  return (
    <form onSubmit={onSave} className="space-y-6">
      <Section title="Brand">
        <div className="grid sm:grid-cols-2 gap-4">
          <F label="Site Name (CN)" v={form.site_name_cn} onChange={(x) => setForm({ ...form, site_name_cn: x })} />
          <F label="Site Name (EN)" v={form.site_name_en} onChange={(x) => setForm({ ...form, site_name_en: x })} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <F label="Short Name (CN, 顶部导航用)" v={form.site_name_short_cn || ""} onChange={(x) => setForm({ ...form, site_name_short_cn: x })} />
          <F label="Short Name (EN)" v={form.site_name_short_en || ""} onChange={(x) => setForm({ ...form, site_name_short_en: x })} />
        </div>
      </Section>

      <Section title="Home Stats (首页 4 个数字)">
        <StatsEditor stats={form.home_stats || []} onChange={(s) => setForm({ ...form, home_stats: s })} />
      </Section>

      <Section title="About Page (关于页)">
        <ImageField label="About Hero 大图 (显示在文字下方)" field="about_image_url" value={form.about_image_url || ""} onChange={(v) => setForm({ ...form, about_image_url: v })} onUpload={(f) => onUpload("about_image_url", f)} uploading={uploading === "about_image_url"} />
        <div className="pt-2 border-t border-black/5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-medium text-gray-900">About 页 4 个 stat 数字</div>
              <div className="text-xs text-gray-500 mt-1">显示在 About 页正文下方</div>
            </div>
            {(!form.about_stats || form.about_stats.length < 4) && (
              <button type="button" onClick={() => setForm({ ...form, about_stats: [...(form.about_stats || []), { value_cn: "", value_en: "", label_cn: "", label_en: "" }] })} className="text-xs text-brand-700 hover:underline">+ Add stat</button>
            )}
          </div>
          <div className="space-y-2">
            {(form.about_stats || []).map((s, i) => (
              <div key={i} className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 items-center">
                <input value={s.value_cn} onChange={(e) => { const next = [...(form.about_stats || [])]; next[i] = { ...next[i], value_cn: e.target.value }; setForm({ ...form, about_stats: next }); }} placeholder="数字 (CN)" className="rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
                <input value={s.value_en} onChange={(e) => { const next = [...(form.about_stats || [])]; next[i] = { ...next[i], value_en: e.target.value }; setForm({ ...form, about_stats: next }); }} placeholder="Value (EN)" className="rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
                <input value={s.label_cn} onChange={(e) => { const next = [...(form.about_stats || [])]; next[i] = { ...next[i], label_cn: e.target.value }; setForm({ ...form, about_stats: next }); }} placeholder="标签 (CN)" className="rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
                <input value={s.label_en} onChange={(e) => { const next = [...(form.about_stats || [])]; next[i] = { ...next[i], label_en: e.target.value }; setForm({ ...form, about_stats: next }); }} placeholder="Label (EN)" className="rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
                <button type="button" onClick={() => setForm({ ...form, about_stats: (form.about_stats || []).filter((_, idx) => idx !== i) })} className="text-xs text-red-600 hover:underline px-1">Remove</button>
              </div>
            ))}
            {(form.about_stats || []).length === 0 && <div className="text-xs text-gray-400 text-center py-3">No stats yet.</div>}
          </div>
        </div>
      </Section>

      <Section title="Product Categories (产品分类)">
        <div className="text-xs text-gray-500">后台产品管理用。修改后下拉菜单立即生效。</div>
        <div className="space-y-2">
          {(form.product_categories || []).map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <input value={c} onChange={(e) => { const next = [...(form.product_categories || [])]; next[i] = e.target.value; setForm({ ...form, product_categories: next }); }} className="flex-1 rounded-lg border border-black/10 px-3 py-1.5 text-sm" />
              <button type="button" onClick={() => setForm({ ...form, product_categories: (form.product_categories || []).filter((_, idx) => idx !== i) })} className="text-xs text-red-600 hover:underline px-1">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => setForm({ ...form, product_categories: [...(form.product_categories || []), ""] })} className="text-xs text-brand-700 hover:underline">+ Add category</button>
        </div>
      </Section>

      <Section title="Home Featured (首页 'New for XXXX' 段)">
        <div className="grid sm:grid-cols-2 gap-4">
          <F label="标题 (CN)" v={form.home_featured_title_cn} onChange={(x) => setForm({ ...form, home_featured_title_cn: x })} />
          <F label="标题 (EN)" v={form.home_featured_title_en} onChange={(x) => setForm({ ...form, home_featured_title_en: x })} />
        </div>
        <T label="副标题 (CN)" v={form.home_featured_subtitle_cn} onChange={(x) => setForm({ ...form, home_featured_subtitle_cn: x })} />
        <T label="副标题 (EN)" v={form.home_featured_subtitle_en} onChange={(x) => setForm({ ...form, home_featured_subtitle_en: x })} />
        <div className="grid sm:grid-cols-2 gap-4">
          <F label="CTA (CN)" v={form.home_featured_cta_cn} onChange={(x) => setForm({ ...form, home_featured_cta_cn: x })} />
          <F label="CTA (EN)" v={form.home_featured_cta_en} onChange={(x) => setForm({ ...form, home_featured_cta_en: x })} />
        </div>
      </Section>

      <Section title="Home About Preview (首页 'About Us' 段)">
        <div className="grid sm:grid-cols-2 gap-4">
          <F label="标题 (CN)" v={form.home_about_title_cn} onChange={(x) => setForm({ ...form, home_about_title_cn: x })} />
          <F label="标题 (EN)" v={form.home_about_title_en} onChange={(x) => setForm({ ...form, home_about_title_en: x })} />
        </div>
        <T label="正文 (CN)" v={form.home_about_body_cn} onChange={(x) => setForm({ ...form, home_about_body_cn: x })} />
        <T label="正文 (EN)" v={form.home_about_body_en} onChange={(x) => setForm({ ...form, home_about_body_en: x })} />
        <div className="grid sm:grid-cols-2 gap-4">
          <F label="CTA (CN)" v={form.home_about_cta_cn} onChange={(x) => setForm({ ...form, home_about_cta_cn: x })} />
          <F label="CTA (EN)" v={form.home_about_cta_en} onChange={(x) => setForm({ ...form, home_about_cta_en: x })} />
        </div>
      </Section>

      <Section title="Logo & Favicon">
        <ImageField label="Logo (Header / Footer 显示)" field="logo_url" value={form.logo_url || ""} onChange={(v) => setForm({ ...form, logo_url: v })} onUpload={(f) => onUpload("logo_url", f)} uploading={uploading === "logo_url"} />
        <ImageField label="Favicon (浏览器标签页图标, 建议 .ico 或 .png)" field="favicon_url" value={form.favicon_url || ""} onChange={(v) => setForm({ ...form, favicon_url: v })} onUpload={(f) => onUpload("favicon_url", f)} uploading={uploading === "favicon_url"} />
      </Section>

      <Section title="Hero (首页首屏)">
        <div className="grid sm:grid-cols-2 gap-4">
          <T label="Hero Title (CN)" v={form.hero_title_cn} onChange={(x) => setForm({ ...form, hero_title_cn: x })} />
          <T label="Hero Title (EN)" v={form.hero_title_en} onChange={(x) => setForm({ ...form, hero_title_en: x })} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <T label="Hero Subtitle (CN)" v={form.hero_subtitle_cn} onChange={(x) => setForm({ ...form, hero_subtitle_cn: x })} />
          <T label="Hero Subtitle (EN)" v={form.hero_subtitle_en} onChange={(x) => setForm({ ...form, hero_subtitle_en: x })} />
        </div>
        <F label="Hero Video URL" v={form.hero_video_url} onChange={(x) => setForm({ ...form, hero_video_url: x })} placeholder="https://…" />
        <ImageField label="Hero 配图 (可选)" field="hero_image_url" value={form.hero_image_url || ""} onChange={(v) => setForm({ ...form, hero_image_url: v })} onUpload={(f) => onUpload("hero_image_url", f)} uploading={uploading === "hero_image_url"} />
      </Section>

      <Section title="SEO">
        <div className="grid sm:grid-cols-2 gap-4"><F label="SEO Title (CN)" v={form.seo_title_cn} onChange={(x) => setForm({ ...form, seo_title_cn: x })} /><F label="SEO Title (EN)" v={form.seo_title_en} onChange={(x) => setForm({ ...form, seo_title_en: x })} /></div>
        <div className="grid sm:grid-cols-2 gap-4"><T label="SEO Description (CN)" v={form.seo_description_cn} onChange={(x) => setForm({ ...form, seo_description_cn: x })} /><T label="SEO Description (EN)" v={form.seo_description_en} onChange={(x) => setForm({ ...form, seo_description_en: x })} /></div>
        <div className="grid sm:grid-cols-2 gap-4"><T label="SEO Keywords (CN)" v={form.seo_keywords_cn} onChange={(x) => setForm({ ...form, seo_keywords_cn: x })} /><T label="SEO Keywords (EN)" v={form.seo_keywords_en} onChange={(x) => setForm({ ...form, seo_keywords_en: x })} /></div>
      </Section>

      {msg && <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-800">{msg}</div>}
      <div className="flex justify-end"><button type="submit" className="btn-primary" disabled={pending}>{pending ? "Saving…" : "Save"}</button></div>
    </form>
  );
}

function ImageField({ label, value, onChange, onUpload, uploading }: { label: string; field: string; value: string; onChange: (v: string) => void; onUpload: (f: File) => void; uploading: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-start gap-3">
        <div className="h-16 w-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-black/5 shrink-0">
          {value ? <img src={value} alt="" className="max-h-full max-w-full object-contain" /> : <span className="text-xs text-gray-400">未设置</span>}
        </div>
        <div className="flex-1 space-y-2">
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} disabled={uploading} className="text-sm" />
          {uploading && <div className="text-xs text-gray-500">上传中…</div>}
          <input type="url" value={value} onChange={(e) => onChange(e.target.value)} placeholder="或粘贴图片 URL" className="w-full rounded-xl border border-black/10 bg-white px-3 py-1.5 text-sm" />
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="card p-5 space-y-4"><h2 className="text-sm font-semibold text-gray-900">{title}</h2>{children}</div>;
}

function StatsEditor({ stats, onChange }: { stats: HomeStat[]; onChange: (s: HomeStat[]) => void }) {
  function update(i: number, patch: Partial<HomeStat>) {
    const next = [...stats];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }
  function add() {
    if (stats.length >= 4) return;
    onChange([...stats, { value_cn: "", value_en: "", label_cn: "", label_en: "" }]);
  }
  function remove(i: number) {
    onChange(stats.filter((_, idx) => idx !== i));
  }
  return (
    <div className="space-y-3">
      {stats.map((s, i) => (
        <div key={i} className="rounded-xl border border-black/5 p-3 bg-white">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-semibold text-gray-500">#{i + 1}</div>
            <button type="button" onClick={() => remove(i)} className="text-xs text-red-600 hover:underline">Remove</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <input value={s.value_cn} onChange={(e) => update(i, { value_cn: e.target.value })} placeholder="数字 (CN)" className="rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
            <input value={s.value_en} onChange={(e) => update(i, { value_en: e.target.value })} placeholder="Value (EN)" className="rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
            <input value={s.label_cn} onChange={(e) => update(i, { label_cn: e.target.value })} placeholder="标签 (CN)" className="rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
            <input value={s.label_en} onChange={(e) => update(i, { label_en: e.target.value })} placeholder="Label (EN)" className="rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
          </div>
        </div>
      ))}
      {stats.length < 4 && (
        <button type="button" onClick={add} className="text-sm text-brand-700 hover:underline">+ Add stat (max 4)</button>
      )}
    </div>
  );
}
function F({ label, v, onChange, placeholder }: { label: string; v: string; onChange: (x: string) => void; placeholder?: string }) {
  return <div><label className="block text-xs font-medium text-gray-700 mb-1">{label}</label><input value={v} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm" /></div>;
}
function T({ label, v, onChange }: { label: string; v: string; onChange: (x: string) => void }) {
  return <div><label className="block text-xs font-medium text-gray-700 mb-1">{label}</label><textarea value={v} rows={3} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm" /></div>;
}
