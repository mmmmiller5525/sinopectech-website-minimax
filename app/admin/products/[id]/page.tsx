import { notFound } from "next/navigation";
import { getProduct, getSettings } from "@/lib/db";
import { ProductForm } from "../ProductForm";
export const metadata = { title: "Edit Product · Admin" };
export const dynamic = "force-dynamic";
export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, settings] = await Promise.all([getProduct(params.id), getSettings()]);
  if (!product) notFound();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Edit Product</h1><p className="text-sm text-gray-500 mt-1">{product.name_en}</p></div>
      </div>
      <ProductForm mode="edit" initial={product} categories={settings.product_categories || []} />
    </div>
  );
}
