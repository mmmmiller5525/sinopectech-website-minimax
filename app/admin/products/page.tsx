import Link from "next/link";
import { listProducts } from "@/lib/db";
export const metadata = { title: "Products · Admin" };
export const dynamic = "force-dynamic";
export default async function ProductsAdmin() {
  const products = await listProducts({ activeOnly: false });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Products</h1><p className="text-sm text-gray-500 mt-1">{products.length} products</p></div>
        <Link href="/admin/products/new" className="btn-primary">+ New Product</Link>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr><th className="px-4 py-3 font-medium">Image</th><th className="px-4 py-3 font-medium">Name (EN)</th><th className="px-4 py-3 font-medium">Category</th><th className="px-4 py-3 font-medium">Series</th><th className="px-4 py-3 font-medium">Order</th><th className="px-4 py-3 font-medium">Active</th><th className="px-4 py-3 font-medium w-32"></th></tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3"><div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden">{p.image_url && <img src={p.image_url} alt="" className="h-full w-full object-cover" />}</div></td>
                <td className="px-4 py-3 font-medium text-gray-900">{p.name_en}</td>
                <td className="px-4 py-3 text-gray-600">{p.category}</td>
                <td className="px-4 py-3 text-gray-600">{p.series}</td>
                <td className="px-4 py-3 text-gray-600">{p.display_order}</td>
                <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 text-xs ${p.is_active ? "text-green-700" : "text-gray-400"}`}><span className={`h-1.5 w-1.5 rounded-full ${p.is_active ? "bg-green-500" : "bg-gray-300"}`}></span>{p.is_active ? "Active" : "Hidden"}</span></td>
                <td className="px-4 py-3 text-right"><Link href={`/admin/products/${p.id}`} className="text-brand-700 hover:underline text-sm">Edit</Link></td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500 text-sm">No products yet. Create your first one.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
