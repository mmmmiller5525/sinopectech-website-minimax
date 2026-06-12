import { ProductForm } from "../ProductForm";
import { getSettings } from "@/lib/db";
export const metadata = { title: "New Product · Admin" };
export const dynamic = "force-dynamic";
export default async function NewProductPage() {
  const settings = await getSettings();
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">New Product</h1><p className="text-sm text-gray-500 mt-1">Add a new product to your catalogue.</p></div>
      <ProductForm mode="create" categories={settings.product_categories || []} />
    </div>
  );
}
