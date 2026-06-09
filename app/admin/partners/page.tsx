import { listPartners } from "@/lib/db";
import { PartnersTable } from "./PartnersTable";
export const metadata = { title: "Partners · Admin" };
export const dynamic = "force-dynamic";
export default async function PartnersAdmin() {
  const partners = await listPartners();
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Partners</h1><p className="text-sm text-gray-500 mt-1">{partners.length} partners</p></div>
      <PartnersTable initial={partners} />
    </div>
  );
}
