import { getAbout } from "@/lib/db";
import { AboutEditor } from "./AboutEditor";
export const metadata = { title: "About · Admin" };
export const dynamic = "force-dynamic";
export default async function AboutAdmin() {
  const about = await getAbout();
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">About Us</h1><p className="text-sm text-gray-500 mt-1">Edit the company introduction shown on the About page.</p></div>
      <AboutEditor initial={about} />
    </div>
  );
}
