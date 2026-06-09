// 数据访问层
import { hasSupabase, getServerSupabase } from "./supabase";
import { MOCK_PRODUCTS, MOCK_ABOUT, MOCK_COMPANY, MOCK_PARTNERS, MOCK_CONTACT, MOCK_SETTINGS } from "./mock-data";
import type { Product, About, Company, Partner, Contact, Settings, Inquiry } from "./types";

export async function listProducts(opts?: { activeOnly?: boolean }): Promise<Product[]> {
  if (!hasSupabase()) return MOCK_PRODUCTS;
  const sb = getServerSupabase()!;
  let q = sb.from("products").select("*").order("display_order", { ascending: true });
  if (opts?.activeOnly !== false) q = q.eq("is_active", true);
  const { data, error } = await q;
  if (error) return MOCK_PRODUCTS;
  return (data || []) as Product[];
}
export async function getProduct(id: string | number): Promise<Product | null> {
  if (!hasSupabase()) return MOCK_PRODUCTS.find(p => String(p.id) === String(id)) || null;
  const sb = getServerSupabase()!;
  const { data } = await sb.from("products").select("*").eq("id", id).single();
  return (data as Product) || null;
}
export async function getAbout(): Promise<About> { if (!hasSupabase()) return MOCK_ABOUT; const sb = getServerSupabase()!; const { data } = await sb.from("about").select("*").eq("id", 1).single(); return (data as About) || MOCK_ABOUT; }
export async function getCompany(): Promise<Company> { if (!hasSupabase()) return MOCK_COMPANY; const sb = getServerSupabase()!; const { data } = await sb.from("company").select("*").eq("id", 1).single(); return (data as Company) || MOCK_COMPANY; }
export async function listPartners(): Promise<Partner[]> { if (!hasSupabase()) return MOCK_PARTNERS; const sb = getServerSupabase()!; const { data } = await sb.from("partners").select("*").order("id", { ascending: true }); return (data as Partner[]) || MOCK_PARTNERS; }
export async function getContact(): Promise<Contact> { if (!hasSupabase()) return MOCK_CONTACT; const sb = getServerSupabase()!; const { data } = await sb.from("contact").select("*").eq("id", 1).single(); return (data as Contact) || MOCK_CONTACT; }
export async function getSettings(): Promise<Settings> { if (!hasSupabase()) return MOCK_SETTINGS; const sb = getServerSupabase()!; const { data } = await sb.from("settings").select("*").eq("id", 1).single(); return (data as Settings) || MOCK_SETTINGS; }
export async function listInquiries(): Promise<Inquiry[]> {
  if (!hasSupabase()) return [];
  const sb = getServerSupabase()!;
  const { data } = await sb.from("inquiries").select("*").order("created_at", { ascending: false });
  return (data as Inquiry[]) || [];
}
