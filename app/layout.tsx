import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSettings } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.sinopectechlimited.com"),
    title: { default: s.seo_title_en || "Sinopectech · ODM", template: "%s · Sinopectech" },
    description: s.seo_description_en || "Dongguan Red Color Materials Co., Ltd. — ODM factory",
    icons: s.favicon_url ? { icon: s.favicon_url } : undefined,
    openGraph: { type: "website", siteName: s.site_name_en || "Sinopectech", locale: "en_US", alternateLocale: "zh_CN", images: s.hero_image_url ? [s.hero_image_url] : undefined },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <LangProvider>
          <Header settings={settings} />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
        </LangProvider>
      </body>
    </html>
  );
}
