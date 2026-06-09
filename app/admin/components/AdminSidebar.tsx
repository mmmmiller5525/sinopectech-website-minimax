"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "🧸" },
  { href: "/admin/about", label: "About Us", icon: "📖" },
  { href: "/admin/company", label: "Company Info", icon: "🏭" },
  { href: "/admin/partners", label: "Partners", icon: "🤝" },
  { href: "/admin/contact", label: "Contact", icon: "☎️" },
  { href: "/admin/inquiries", label: "Inquiries", icon: "✉️" },
  { href: "/admin/settings", label: "Site Settings", icon: "⚙️" },
];
export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname() || "/admin";
  return (
    <aside className="w-60 shrink-0 bg-white border-r border-black/5 flex flex-col">
      <div className="px-5 py-5 border-b border-black/5">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white font-bold text-sm">S</div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Sinopectech</div>
            <div className="text-[11px] text-gray-500">Admin Console</div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {ITEMS.map((it) => {
          const active = it.href === "/admin" ? pathname === "/admin" : pathname.startsWith(it.href);
          return (
            <Link key={it.href} href={it.href} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${active ? "bg-brand-50 text-brand-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
              <span className="text-base">{it.icon}</span><span>{it.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-black/5">
        <div className="px-3 py-2 text-[11px] text-gray-500">Signed in as</div>
        <div className="px-3 text-xs text-gray-700 truncate" title={userEmail}>{userEmail}</div>
        <form action="/api/auth/logout" method="post" className="mt-2">
          <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Sign out</button>
        </form>
        <Link href="/" className="block mt-1 px-3 py-2 rounded-lg text-sm text-brand-700 hover:bg-brand-50">← Back to site</Link>
      </div>
    </aside>
  );
}
