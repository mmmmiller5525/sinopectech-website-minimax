"use client";
import { useState, useTransition } from "react";
import type { Company } from "@/lib/types";
export function CompanyEditor({ initial }: { initial: Company }) {
  const [form, setForm] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  function onSave(e: React.FormEvent) {
    e.preventDefault(); setMsg(null);
    startTransition(async () => {
      const res = await fetch("/api/admin/company", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await res.json();
      setMsg(res.ok ? "已保存" : (d.error || "保存失败"));
    });
  }
  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="card p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Factory Entity (Mainland)</h2>
        <div className="grid sm:grid-cols-2 gap-4"><Field label="Name (CN)" value={form.name_cn} onChange={(v) => setForm({ ...form, name_cn: v })} /><Field label="Name (EN)" value={form.name_en} onChange={(v) => setForm({ ...form, name_en: v })} /></div>
        <div className="grid sm:grid-cols-2 gap-4"><Field label="Address (CN)" value={form.address_cn} onChange={(v) => setForm({ ...form, address_cn: v })} /><Field label="Address (EN)" value={form.address_en} onChange={(v) => setForm({ ...form, address_en: v })} /></div>
        <div className="grid sm:grid-cols-2 gap-4"><Textarea label="Description (CN)" value={form.description_cn} onChange={(v) => setForm({ ...form, description_cn: v })} /><Textarea label="Description (EN)" value={form.description_en} onChange={(v) => setForm({ ...form, description_en: v })} /></div>
        <div className="pt-3 border-t border-black/5">
          <div className="text-sm font-medium text-gray-900 mb-2">Map (Contact 页可拖动地图)</div>
          <div className="text-xs text-gray-500 mb-3">到 https://www.openstreetmap.org 找到你的工厂 → 点 "Show address" → 复制 URL 里的 lat/lng 填下面。东莞企石镇约 23.02, 113.82。</div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Latitude (纬度)" value={String(form.map_lat ?? 23.0225)} onChange={(v) => setForm({ ...form, map_lat: Number(v) })} />
            <Field label="Longitude (经度)" value={String(form.map_lng ?? 113.8188)} onChange={(v) => setForm({ ...form, map_lng: Number(v) })} />
            <Field label="Zoom (1-19)" value={String(form.map_zoom ?? 15)} onChange={(v) => setForm({ ...form, map_zoom: Number(v) })} />
          </div>
        </div>
      </div>
      {msg && <div className="rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700">{msg}</div>}
      <div className="flex justify-end gap-3"><button type="submit" className="btn-primary" disabled={pending}>{pending ? "Saving…" : "Save"}</button></div>
    </form>
  );
}
function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <div><label className="block text-xs font-medium text-gray-700 mb-1">{label}</label><input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm" /></div>;
}
function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <div><label className="block text-xs font-medium text-gray-700 mb-1">{label}</label><textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm" /></div>;
}
