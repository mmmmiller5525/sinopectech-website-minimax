import { NextResponse } from "next/server";
import { getServerAuthClient } from "@/lib/auth";
import { getSupabaseUrl, getSupabaseAnonKey } from "@/lib/supabase";

export async function POST(req: Request) {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) return NextResponse.json({ error: "Supabase 未配置" }, { status: 503 });
  const { email, password } = (await req.json().catch(() => ({}))) as { email?: string; password?: string };
  if (!email || !password) return NextResponse.json({ error: "邮箱和密码必填" }, { status: 400 });
  const sb = await getServerAuthClient();
  if (!sb) return NextResponse.json({ error: "Supabase 未配置" }, { status: 503 });
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return NextResponse.json({ error: error.message }, { status: 401 });
  return NextResponse.json({ ok: true });
}
