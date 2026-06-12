import { AboutContent } from "@/components/AboutContent";
import { getAbout, getSettings } from "@/lib/db";

export const metadata = { title: "About", description: "Sinopec Technologies Limited + Dongguan Red Color Materials Co., Ltd." };
export const revalidate = 0;

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAbout(), getSettings()]);
  return <AboutContent about={about} settings={settings} />;
}
