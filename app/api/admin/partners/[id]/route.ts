import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { hasSupabase, getAdminSupabase } from "@/lib/supabase";
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasSupabase()) return NextResponse.json({ error: "Supabase 未配置" }, { status: 503 });
  const sb = getAdminSupabase()!;
  const { error } = await sb.from("partners").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
