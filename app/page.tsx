import { HomeContent } from "@/components/HomeContent";
import { getProducts } from "@/lib/products-data";
import { getCompany, getSettings } from "@/lib/db";

export const revalidate = 0;

export default async function Home() {
  const [products, company, settings] = await Promise.all([getProducts(), getCompany(), getSettings()]);
  return <HomeContent products={products} company={company} settings={settings} />;
}
