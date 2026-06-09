import { ProductsContent } from "@/components/ProductsContent";
import { getProducts } from "@/lib/products-data";

export const metadata = { title: "Products", description: "Browse our designer toy and action figure products." };
export const revalidate = 0;

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsContent products={products} />;
}
