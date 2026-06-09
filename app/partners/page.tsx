import { PartnersContent } from "@/components/PartnersContent";
import { listPartners } from "@/lib/db";

export const metadata = { title: "Partners", description: "Our global partners across North America, Japan, Europe and South Africa." };
export const revalidate = 0;

export default async function PartnersPage() {
  const partners = await listPartners();
  return <PartnersContent partners={partners} />;
}
