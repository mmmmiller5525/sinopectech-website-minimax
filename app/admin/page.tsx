import Link from "next/link";
import { listInquiries, listProducts, listPartners } from "@/lib/db";
import { hasSupabase } from "@/lib/supabase";

export const metadata = { title: "Dashboard · Admin" };
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [inquiries, products, partners] = await Promise.all([listInquiries(), listProducts({ activeOnly: false }), listPartners()]);
  const newInq = inquiries.filter(i => i.status === "new").length;
  const total = inquiries.length;
  const ok = hasSupabase();

  return (
    <div className="space-y-8">
      {!ok && (
        <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
          <strong>未检测到 Supabase 配置。</strong> 当前显示的是 mock 数据。请在 <code className="bg-amber-100 px-1 rounded">.env.local</code> 填入 <code>NEXT_PUBLIC_SUPABASE_URL</code> 和 <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> 后重启。
        </div>
      )}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back. Here's what's happening with your site.</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="New Inquiries" value={newInq} accent="brand" link="/admin/inquiries" />
        <StatCard label="Total Inquiries" value={total} link="/admin/inquiries" />
        <StatCard label="Products" value={products.length} link="/admin/products" />
      </div>
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Manage</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MANAGE.map((m) => (
            <Link key={m.href} href={m.href} className="card p-4 hover:shadow-md transition">
              <div className="text-2xl mb-2">{m.icon}</div>
              <div className="text-sm font-semibold text-gray-900">{m.label}</div>
              <div className="text-xs text-gray-500 mt-1">{m.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const MANAGE = [
  { href: "/admin/products", label: "Products", icon: "🧸", desc: "CRUD" },
  { href: "/admin/about", label: "About Us", icon: "📖", desc: "Edit company intro" },
  { href: "/admin/company", label: "Company Info", icon: "🏭", desc: "Factory + HK entity" },
  { href: "/admin/partners", label: "Partners", icon: "🤝", desc: "Add / edit / remove" },
  { href: "/admin/contact", label: "Contact", icon: "☎️", desc: "Phone / email / wechat" },
  { href: "/admin/inquiries", label: "Inquiries", icon: "✉️", desc: "View & reply" },
  { href: "/admin/settings", label: "Site Settings", icon: "⚙️", desc: "Logo / SEO / hero" },
];

function StatCard({ label, value, accent, link }: { label: string; value: number; accent?: string; link?: string }) {
  const inner = (
    <div className="card p-5">
      <div className="text-xs text-gray-500">{label}</div>
      <div className={`mt-2 text-3xl font-bold ${accent === "brand" ? "text-brand-700" : "text-gray-900"}`}>{value}</div>
    </div>
  );
  return link ? <Link href={link}>{inner}</Link> : inner;
}
