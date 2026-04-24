import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getLocale } from "@/lib/locale";
import { t } from "@/i18n/translations";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const ICONS = {
  icon: [{ url: "/branding/runly.svg", type: "image/svg+xml" }],
  shortcut: "/branding/runly.svg",
  apple: "/branding/runly.svg",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "fr" ? "Runly | Télécharge maintenant" : "Runly | Download Today",
    description:
      locale === "fr"
        ? "Runly – trouve ton partenaire de running et progresse ensemble."
        : "Runly – find your running partner and progress together.",
    icons: ICONS,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const tr = t(locale);

  return (
    <html
      lang={locale}
      className={`${bricolageGrotesque.variable} ${geistMono.variable} h-full bg-white antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans">
        <Navbar tr={tr.navbar} trModal={tr.downloadModal} locale={locale} />
        {children}
        <Footer tr={tr.footer} trModal={tr.downloadModal} trBlogModal={tr.blogModal} />
      </body>
    </html>
  );
}
