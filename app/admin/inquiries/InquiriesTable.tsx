"use client";
import { useState } from "react";
import type { Inquiry, InquiryStatus } from "@/lib/types";
const STATUS_COLOR: Record<InquiryStatus, string> = { new: "bg-brand-50 text-brand-700 border-brand-200", contacted: "bg-amber-50 text-amber-700 border-amber-200", closed: "bg-gray-100 text-gray-600 border-gray-200" };
export function InquiriesTable({ initial }: { initial: Inquiry[] }) {
  const [list, setList] = useState<Inquiry[]>(initial);
  const [open, setOpen] = useState<Inquiry | null>(null);
  async function changeStatus(id: number, status: InquiryStatus) {
    const res = await fetch(`/api/admin/inquiries/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (res.ok) setList(l => l.map(i => i.id === id ? { ...i, status } : i));
  }
  return (
    <>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left"><tr><th className="px-4 py-3 font-medium">Date</th><th className="px-4 py-3 font-medium">Name</th><th className="px-4 py-3 font-medium">Email</th><th className="px-4 py-3 font-medium">Product</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium w-20"></th></tr></thead>
          <tbody className="divide-y divide-black/5">
            {list.map(i => (
              <tr key={i.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{new Date(i.created_at).toLocaleString()}</td>
                <td className="px-4 py-3 font-medium">{i.name || "—"}</td>
                <td className="px-4 py-3 text-gray-600"><a href={`mailto:${i.email}`} className="text-brand-700 hover:underline">{i.email}</a></td>
                <td className="px-4 py-3 text-gray-600">{i.product || "—"}</td>
                <td className="px-4 py-3">
                  <select value={i.status} onChange={(e) => changeStatus(i.id, e.target.value as InquiryStatus)} className={`text-xs rounded-full px-2.5 py-1 border ${STATUS_COLOR[i.status]} font-semibold`}>
                    <option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right"><button onClick={() => setOpen(i)} className="text-brand-700 hover:underline text-sm">View</button></td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500 text-sm">No inquiries yet.</td></tr>}
          </tbody>
        </table>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setOpen(null)}>
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold">Inquiry #{open.id}</h3><button onClick={() => setOpen(null)} className="text-gray-400 hover:text-gray-700 text-xl">×</button></div>
            <dl className="space-y-2 text-sm">
              <Row k="Date" v={new Date(open.created_at).toLocaleString()} />
              <Row k="Name" v={open.name || "—"} />
              <Row k="Email" v={<a href={`mailto:${open.email}`} className="text-brand-700 hover:underline">{open.email}</a>} />
              <Row k="Phone" v={open.phone || "—"} />
              <Row k="Product" v={open.product || "—"} />
              <Row k="Status" v={open.status} />
            </dl>
            <div className="mt-4"><div className="text-xs font-medium text-gray-500 mb-1">Message</div><div className="rounded-xl bg-gray-50 p-4 text-sm whitespace-pre-wrap">{open.message}</div></div>
          </div>
        </div>
      )}
    </>
  );
}
function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return <div className="grid grid-cols-3 gap-2"><dt className="text-gray-500">{k}</dt><dd className="col-span-2 text-gray-900">{v}</dd></div>;
}
