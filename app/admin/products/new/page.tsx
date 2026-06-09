import { ProductForm } from "../ProductForm";
export const metadata = { title: "New Product · Admin" };
export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">New Product</h1><p className="text-sm text-gray-500 mt-1">Add a new product to your catalogue.</p></div>
      <ProductForm mode="create" />
    </div>
  );
}
