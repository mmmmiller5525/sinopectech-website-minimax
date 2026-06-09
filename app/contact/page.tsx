import { ContactContent } from "@/components/ContactContent";
import { getContact, getCompany } from "@/lib/db";

export const metadata = { title: "Contact", description: "Get in touch with our factory or Hong Kong trade office." };
export const revalidate = 0;

export default async function ContactPage() {
  const [contact, company] = await Promise.all([getContact(), getCompany()]);
  return <ContactContent contact={contact} company={company} />;
}
