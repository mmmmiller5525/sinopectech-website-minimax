import { getContact } from "@/lib/db";
import { ContactEditor } from "./ContactEditor";
export const metadata = { title: "Contact · Admin" };
export const dynamic = "force-dynamic";
export default async function ContactAdmin() {
  const contact = await getContact();
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Contact</h1><p className="text-sm text-gray-500 mt-1">Edit phone, email, WeChat, WhatsApp. Shown site-wide.</p></div>
      <ContactEditor initial={contact} />
    </div>
  );
}
