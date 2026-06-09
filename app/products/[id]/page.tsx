import { ProductDetailContent } from "@/components/ProductDetailContent";
import { getProduct, getProducts } from "@/lib/products-data";

export const revalidate = 0;
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ id: String(p.id) }));
}
export async function generateMetadata({ params }: { params: { id: string } }) {
  const p = await getProduct(params.id);
  if (!p) return { title: "Product" };
  return { title: p.name_en, description: p.description_en };
}
export default async function ProductPage({ params }: { params: { id: string } }) {
  const p = await getProduct(params.id);
  if (!p) return <div className="container-x section">Not found.</div>;
  return <ProductDetailContent product={p} />;
}
