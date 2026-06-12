"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { uploadImage } from "@/lib/upload";
import type { Product } from "@/lib/types";

type Mode = "create" | "edit";
const EMPTY: Partial<Product> = { name_cn: "", name_en: "", category: "PVC", series: "", description_cn: "", description_en: "", image_url: "", gallery_images: [], is_active: true, display_order: 1, specs: [] };

export function ProductForm({ mode, initial, categories }: { mode: Mode; initial?: Product; categories: string[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState<Partial<Product>>(initial || EMPTY);
  const [uploading, setUploading] = useState(false);
  const cats = categories.length > 0 ? categories : ["PVC", "ABS", "TPR", "Resin", "Alloy", "Other"];
  const [err, setErr] = useState<string | null>(null);
  const set = <K extends keyof Product>(k: K, v: Product[K]) => setForm(f => ({ ...f, [k]: v }));

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setErr(null);
    const r = await uploadImage(file);
    setUploading(false);
    if (!r.ok) { setErr(r.error); return; }
    set("image_url", r.url);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setErr(null);
    startTransition(async () => {
      const url = mode === "create" ? "/api/admin/products" : `/api/admin/products/${initial!.id}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setErr(data.error || "保存失败"); return; }
      router.push("/admin/products"); router.refresh();
    });
  }

  async function onDelete() {
    if (!initial) return;
    if (!confirm(`Delete "${initial.name_en}"?`)) return;
    setErr(null);
    startTransition(async () => {
      const res = await fetch(`/api/admin/products/${initial.id}`, { method: "DELETE" });
      if (!res.ok) { const d = await res.json(); setErr(d.error || "删除失败"); return; }
      router.push("/admin/products"); router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Basic Info</h2>
          <Field label="Name (Chinese)" value={form.name_cn || ""} onChange={(v) => set("name_cn", v)} />
          <Field label="Name (English)" value={form.name_en || ""} onChange={(v) => set("name_en", v)} required />
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="Category" value={(form.category as string) || cats[0]} options={cats} onChange={(v) => set("category", v)} />
            <Field label="Series" value={form.series || ""} onChange={(v) => set("series", v)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Display Order" type="number" value={String(form.display_order ?? 1)} onChange={(v) => set("display_order", Number(v))} />
            <label className="flex items-center gap-2 mt-7 text-sm"><input type="checkbox" checked={!!form.is_active} onChange={(e) => set("is_active", e.target.checked)} />Active (show on site)</label>
          </div>
        </div>
        <div className="card p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Image</h2>
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
            {form.image_url ? <img src={form.image_url} alt="" className="w-full h-full object-cover" /> : <div className="text-gray-400 text-sm">No image</div>}
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-medium text-gray-700">Upload from computer</label>
            <input type="file" accept="image/*" onChange={onUpload} disabled={uploading} />
            {uploading && <div className="text-xs text-gray-500">Uploading…</div>}
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700">Or paste an image URL</label>
            <input type="url" value={form.image_url || ""} onChange={(e) => set("image_url", e.target.value)} placeholder="https://…" className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm mt-1" />
            <p className="text-[11px] text-gray-500 mt-1">支持任意公网 URL（包括国内图床）</p>
          </div>
        </div>
      </div>
      <div className="card p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Description</h2>
        <Textarea label="Description (Chinese)" value={form.description_cn || ""} onChange={(v) => set("description_cn", v)} />
        <Textarea label="Description (English)" value={form.description_en || ""} onChange={(v) => set("description_en", v)} />
      </div>
      <div className="card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Specs (产品参数)</h2>
          <button type="button" onClick={() => set("specs", [...(form.specs || []), { k_en: "", k_cn: "", v_en: "", v_cn: "" }] as any)} className="text-xs text-brand-700 hover:underline">+ Add spec</button>
        </div>
        <p className="text-xs text-gray-500">每行 4 个字段：英文标签 / 中文标签 / 英文值 / 中文值</p>
        <div className="space-y-2">
          {(form.specs || []).map((s, i) => (
            <div key={i} className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 items-center">
              <input value={s.k_en} onChange={(e) => { const next = [...(form.specs || [])]; next[i] = { ...next[i], k_en: e.target.value }; set("specs", next as any); }} placeholder="Label (EN)" className="rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
              <input value={s.k_cn} onChange={(e) => { const next = [...(form.specs || [])]; next[i] = { ...next[i], k_cn: e.target.value }; set("specs", next as any); }} placeholder="标签 (CN)" className="rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
              <input value={s.v_en} onChange={(e) => { const next = [...(form.specs || [])]; next[i] = { ...next[i], v_en: e.target.value }; set("specs", next as any); }} placeholder="Value (EN)" className="rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
              <input value={s.v_cn} onChange={(e) => { const next = [...(form.specs || [])]; next[i] = { ...next[i], v_cn: e.target.value }; set("specs", next as any); }} placeholder="值 (CN)" className="rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
              <button type="button" onClick={() => set("specs", (form.specs || []).filter((_, idx) => idx !== i) as any)} className="text-xs text-red-600 hover:underline px-1">Remove</button>
            </div>
          ))}
          {(form.specs || []).length === 0 && <div className="text-xs text-gray-400 text-center py-3">No specs yet. Click "Add spec" above.</div>}
        </div>
      </div>
      {err && <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">{err}</div>}
      <div className="flex items-center justify-between">
        <div>{mode === "edit" && <button type="button" onClick={onDelete} className="text-sm text-red-600 hover:underline" disabled={pending}>Delete product</button>}</div>
        <div className="flex gap-3">
          <a href="/admin/products" className="btn-ghost">Cancel</a>
          <button type="submit" className="btn-primary" disabled={pending}>{pending ? "Saving…" : mode === "create" ? "Create" : "Save changes"}</button>
        </div>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
    </div>
  );
}
function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm">{options.map((o) => <option key={o} value={o}>{o}</option>)}</select>
    </div>
  );
}
function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
    </div>
  );
}
