import { getSettings } from "@/lib/db";
import { SettingsEditor } from "./SettingsEditor";
export const metadata = { title: "Site Settings · Admin" };
export const dynamic = "force-dynamic";
export default async function SettingsAdmin() {
  const settings = await getSettings();
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Site Settings</h1><p className="text-sm text-gray-500 mt-1">Brand, logo, hero, SEO. Affects every page.</p></div>
      <SettingsEditor initial={settings} />
    </div>
  );
}
