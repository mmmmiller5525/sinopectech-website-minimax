import { getCompany } from "@/lib/db";
import { CompanyEditor } from "./CompanyEditor";
export const metadata = { title: "Company Info · Admin" };
export const dynamic = "force-dynamic";
export default async function CompanyAdmin() {
  const company = await getCompany();
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Company Info</h1><p className="text-sm text-gray-500 mt-1">Edit the factory and Hong Kong entity details.</p></div>
      <CompanyEditor initial={company} />
    </div>
  );
}
