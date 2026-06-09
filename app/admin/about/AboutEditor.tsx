"use client";
import { useState, useTransition } from "react";
import type { About } from "@/lib/types";
export function AboutEditor({ initial }: { initial: About }) {
  const [form, setForm] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  function onSave(e: React.FormEvent) {
    e.preventDefault(); setMsg(null);
    startTransition(async () => {
      const res = await fetch("/api/admin/about", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await res.json();
      setMsg(res.ok ? "已保存" : (d.error || "保存失败"));
    });
  }
  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="card p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Title & Subtitle</h2>
        <div className="grid sm:grid-cols-2 gap-4"><Field label="Title (CN)" value={form.title_cn} onChange={(v) => setForm({ ...form, title_cn: v })} /><Field label="Title (EN)" value={form.title_en} onChange={(v) => setForm({ ...form, title_en: v })} /></div>
        <div className="grid sm:grid-cols-2 gap-4"><Field label="Subtitle (CN)" value={form.subtitle_cn} onChange={(v) => setForm({ ...form, subtitle_cn: v })} /><Field label="Subtitle (EN)" value={form.subtitle_en} onChange={(v) => setForm({ ...form, subtitle_en: v })} /></div>
      </div>
      <div className="card p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Content</h2>
        <Textarea label="Content (CN)" value={form.content_cn} onChange={(v) => setForm({ ...form, content_cn: v })} />
        <Textarea label="Content (EN)" value={form.content_en} onChange={(v) => setForm({ ...form, content_en: v })} />
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
  return <div><label className="block text-xs font-medium text-gray-700 mb-1">{label}</label><textarea value={value} onChange={(e) => onChange(e.target.value)} rows={6} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm" /></div>;
}
