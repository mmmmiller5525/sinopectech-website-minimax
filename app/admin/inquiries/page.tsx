import { listInquiries } from "@/lib/db";
import { InquiriesTable } from "./InquiriesTable";
export const metadata = { title: "Inquiries · Admin" };
export const dynamic = "force-dynamic";
export default async function InquiriesAdmin() {
  const inquiries = await listInquiries();
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Inquiries</h1><p className="text-sm text-gray-500 mt-1">{inquiries.length} total · {inquiries.filter(i => i.status === "new").length} new</p></div>
      <InquiriesTable initial={inquiries} />
    </div>
  );
}
