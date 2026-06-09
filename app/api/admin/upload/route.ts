// 服务端上传：service_role 写 Storage，绕过 RLS
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getAdminSupabase } from "@/lib/supabase";

const PRODUCT_BUCKET = "product-images";
const ASSET_BUCKET = "assets";

function safeExt(name: string, fallback = "jpg"): string {
  const ext = name.split(".").pop() || "";
  const clean = ext.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return clean || fallback;
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = getAdminSupabase();
  if (!sb) return NextResponse.json({ error: "Supabase 未配置（缺少 SUPABASE_SERVICE_ROLE_KEY）" }, { status: 503 });
  const form = await req.formData();
  const file = form.get("file") as File | null;
  const bucketHint = (form.get("bucket") as string) || "products";
  if (!file) return NextResponse.json({ error: "no file" }, { status: 400 });
  const bucket = bucketHint === "assets" ? ASSET_BUCKET : PRODUCT_BUCKET;
  const ext = safeExt(file.name);
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  const { error } = await sb.storage.from(bucket).upload(path, buf, {
    cacheControl: "3600", upsert: false,
    contentType: file.type || `image/${ext === "jpg" ? "jpeg" : ext}`,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const { data } = sb.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ ok: true, url: data.publicUrl });
}
