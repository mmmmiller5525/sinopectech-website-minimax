"use client";
import { useState, useTransition } from "react";
import type { Partner } from "@/lib/types";
const REGIONS: Partner["region"][] = ["USA", "Japan", "Europe", "South Africa", "Other"];
const EMPTY: Partial<Partner> = { name: "", region: "USA", logo_url: "", website: "" };
export function PartnersTable({ initial }: { initial: Partner[] }) {
  const [list, setList] = useState<Partner[]>(initial);
  const [draft, setDraft] = useState<Partial<Partner>>(EMPTY);
  const [pending, startTransition] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  function add(e: React.FormEvent) {
    e.preventDefault(); if (!draft.name) return; setErr(null);
    startTransition(async () => {
      const res = await fetch("/api/admin/partners", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const d = await res.json();
      if (!res.ok) { setErr(d.error); return; }
      setList(l => [...l, d.data]); setDraft(EMPTY);
    });
  }
  function remove(id: number) {
    if (!confirm("Remove this partner?")) return;
    startTransition(async () => {
      const res = await fetch(`/api/admin/partners/${id}`, { method: "DELETE" });
      if (res.ok) setList(l => l.filter(p => p.id !== id));
    });
  }
  return (
    <div className="space-y-6">
      <form onSubmit={add} className="card p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Add new partner</h2>
        <div className="grid sm:grid-cols-5 gap-3">
          <input className="rounded-xl border border-black/10 px-3 py-2 text-sm sm:col-span-2" placeholder="Name (e.g. Walmart)" value={draft.name || ""} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          <select className="rounded-xl border border-black/10 px-3 py-2 text-sm" value={draft.region} onChange={(e) => setDraft({ ...draft, region: e.target.value as Partner["region"] })}>{REGIONS.map(r => <option key={r} value={r}>{r}</option>)}</select>
          <input className="rounded-xl border border-black/10 px-3 py-2 text-sm" placeholder="Website (optional)" value={draft.website || ""} onChange={(e) => setDraft({ ...draft, website: e.target.value })} />
          <button type="submit" className="btn-primary" disabled={pending}>{pending ? "…" : "Add"}</button>
        </div>
        {err && <div className="mt-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">{err}</div>}
      </form>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left"><tr><th className="px-4 py-3 font-medium">Name</th><th className="px-4 py-3 font-medium">Region</th><th className="px-4 py-3 font-medium">Website</th><th className="px-4 py-3 font-medium w-20"></th></tr></thead>
          <tbody className="divide-y divide-black/5">
            {list.map(p => (
              <tr key={p.id}><td className="px-4 py-3 font-medium">{p.name}</td><td className="px-4 py-3 text-gray-600">{p.region}</td><td className="px-4 py-3 text-gray-600 truncate max-w-xs">{p.website || "—"}</td><td className="px-4 py-3 text-right"><button onClick={() => remove(p.id)} className="text-red-600 hover:underline text-sm">Remove</button></td></tr>
            ))}
            {list.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-500 text-sm">No partners yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
