"use client";
import { useState, useTransition } from "react";
import type { Contact } from "@/lib/types";
export function ContactEditor({ initial }: { initial: Contact }) {
  const [form, setForm] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  function onSave(e: React.FormEvent) {
    e.preventDefault(); setMsg(null);
    startTransition(async () => {
      const res = await fetch("/api/admin/contact", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await res.json();
      setMsg(res.ok ? "已保存" : (d.error || "保存失败"));
    });
  }
  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="card p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Reach details</h2>
        <div className="grid sm:grid-cols-2 gap-4"><Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+86 150 1943 1630" /><Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="cherryshi2012@126.com" /></div>
        <div className="grid sm:grid-cols-2 gap-4"><Field label="WeChat" value={form.wechat || ""} onChange={(v) => setForm({ ...form, wechat: v })} placeholder="微信号 / WeChat ID" /><Field label="WhatsApp" value={form.whatsapp || ""} onChange={(v) => setForm({ ...form, whatsapp: v })} placeholder="+86 ..." /></div>
        <div className="grid sm:grid-cols-2 gap-4"><Field label="Address (CN)" value={form.address_cn} onChange={(v) => setForm({ ...form, address_cn: v })} /><Field label="Address (EN)" value={form.address_en} onChange={(v) => setForm({ ...form, address_en: v })} /></div>
      </div>
      {msg && <div className="rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700">{msg}</div>}
      <div className="flex justify-end"><button type="submit" className="btn-primary" disabled={pending}>{pending ? "Saving…" : "Save"}</button></div>
    </form>
  );
}
function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <div><label className="block text-xs font-medium text-gray-700 mb-1">{label}</label><input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm" /></div>;
}
