// Supabase 客户端封装
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _adminClient: SupabaseClient | null = null;

export function getSupabaseUrl(): string | null {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || null;
}
export function getSupabaseAnonKey(): string | null {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null;
}
export function getServiceRoleKey(): string | null {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || null;
}
export function hasSupabase(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

export function getBrowserSupabase(): SupabaseClient | null {
  if (typeof window === "undefined") return null;
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true } });
}

export function getServerSupabase(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

// 服务端管理员：绕过 RLS，**只能服务端用**
export function getAdminSupabase(): SupabaseClient | null {
  if (_adminClient) return _adminClient;
  const url = getSupabaseUrl();
  const serviceKey = getServiceRoleKey();
  const anonKey = getSupabaseAnonKey();
  if (!url || (!serviceKey && !anonKey)) return null;
  _adminClient = createClient(url, serviceKey || anonKey!, { auth: { persistSession: false, autoRefreshToken: false } });
  return _adminClient;
}
