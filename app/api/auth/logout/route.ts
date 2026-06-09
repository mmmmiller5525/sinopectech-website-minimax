import { NextResponse } from "next/server";
import { getServerAuthClient } from "@/lib/auth";

export async function POST() {
  const sb = await getServerAuthClient();
  if (sb) await sb.auth.signOut();
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
}
