import { NextResponse } from "next/server";
import { hasSupabase, getAdminSupabase, getSupabaseUrl, getSupabaseAnonKey, getServiceRoleKey } from "@/lib/supabase";
import { sendInquiryEmail } from "@/lib/email";

type Payload = { name?: string | null; company?: string | null; email?: string | null; phone?: string | null; product?: string | null; message?: string | null };

function isEmail(s: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s); }

export async function POST(req: Request) {
  // 调试：报告环境变量状态
  const url = getSupabaseUrl();
  const anon = getSupabaseAnonKey();
  const service = getServiceRoleKey();
  console.log("[inquiry-debug] url=", url ? url.slice(0, 30) + "..." : "MISSING", "anon=", anon ? "set" : "MISSING", "service=", service ? "set" : "MISSING", "resend=", process.env.RESEND_API_KEY ? "set" : "MISSING");

  let body: Payload;
  try { body = (await req.json()) as Payload; } catch { return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 }); }
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  if (!email || !isEmail(email) || !message) return NextResponse.json({ ok: false, error: "email_and_message_required" }, { status: 400 });
  const payload = { name: body.name?.trim() || null, company: body.company?.trim() || null, email, phone: body.phone?.trim() || null, product: body.product?.trim() || null, message, products_interested: body.product ? [body.product] : null, status: "new" };
  let dbOk = false;
  let dbErr: string | null = null;
  if (hasSupabase()) {
    const sb = getAdminSupabase();
    if (sb) { const { error } = await sb.from("inquiries").insert(payload); if (!error) dbOk = true; else { dbErr = error.message; console.error("[inquiry] db error:", error.message); } }
    else dbErr = "getAdminSupabase returned null";
  } else { dbErr = "hasSupabase() returned false"; console.log("[inquiry] (no Supabase)"); }
  const emailRes = await sendInquiryEmail({ name: payload.name || undefined, company: payload.company || undefined, email: payload.email, phone: payload.phone || undefined, product: payload.product || undefined, message: payload.message });
  if (!emailRes.ok) console.error("[inquiry] email error:", emailRes.error);
  console.log("[inquiry-debug] result:", { dbOk, dbErr, emailOk: emailRes.ok, emailErr: emailRes.error });
  return NextResponse.json({ ok: true, db: dbOk, dbErr, email: emailRes.ok, emailErr: emailRes.error });
}
