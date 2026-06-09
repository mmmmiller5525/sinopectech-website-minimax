"use client";
import { useState } from "react";

export function InquiryForm({ productName }: { productName?: string }) {
  const t = (k: string) => {
    const en: Record<string, string> = {
      name: "Your name", company: "Company (optional)", email: "Email *", phone: "Phone / WhatsApp (optional)",
      product: "Product of interest (optional)", message: "Your message *", submit: "Submit Inquiry", submitting: "Submitting…",
      ok: "We've received your inquiry and will be in touch soon.", err: "Submission failed. Please try again or email us directly.",
    };
    return en[k] || k;
  };
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | "ok" | "err">(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setDone(null);
    const fd = new FormData(e.currentTarget);
    const payload = { name: fd.get("name"), company: fd.get("company"), email: fd.get("email"), phone: fd.get("phone"), product: productName || fd.get("product"), message: fd.get("message") };
    try {
      const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("bad status");
      setDone("ok");
      (e.target as HTMLFormElement).reset();
    } catch { setDone("err"); }
    finally { setSubmitting(false); }
  }

  if (done === "ok") return <div className="rounded-2xl bg-green-50 border border-green-200 p-6 text-sm text-green-800">{t("ok")}</div>;

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="name" label={t("name")} /><Field name="company" label={t("company")} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="email" label={t("email")} type="email" required />
        <Field name="phone" label={t("phone")} />
      </div>
      {!productName && <Field name="product" label={t("product")} />}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">{t("message")}</label>
        <textarea name="message" required rows={5} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
      </div>
      {done === "err" && <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">{t("err")}</div>}
      <button type="submit" className="btn-primary" disabled={submitting}>{submitting ? t("submitting") : t("submit")}</button>
    </form>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <input name={name} type={type} required={required} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
    </div>
  );
}
