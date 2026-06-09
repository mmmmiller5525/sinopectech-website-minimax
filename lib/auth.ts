// 服务端鉴权
"use server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { getSupabaseUrl, getSupabaseAnonKey } from "./supabase";

export async function getServerAuthClient() {
  const cookieStore = cookies();
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) return null;
  return createServerClient(url, key, {
    cookies: {
      get(name: string) { return cookieStore.get(name)?.value; },
      set(name: string, value: string, options: CookieOptions) { try { cookieStore.set({ name, value, ...options }); } catch {} },
      remove(name: string, options: CookieOptions) { try { cookieStore.set({ name, value: "", ...options }); } catch {} },
    },
  });
}
export async function getCurrentUser() {
  const sb = await getServerAuthClient();
  if (!sb) return null;
  const { data: { user } } = await sb.auth.getUser();
  return user;
}
