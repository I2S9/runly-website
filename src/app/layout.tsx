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

export const metadata: Metadata = {
  title: "Runly | Download Today",
  description: "Runly website",
  icons: {
    icon: [
      { url: "/branding/runly.svg", type: "image/svg+xml" },
    ],
    shortcut: "/branding/runly.svg",
    apple: "/branding/runly.svg",
  },
};

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
        <Navbar tr={tr.navbar} locale={locale} />
        {children}
        <Footer tr={tr.footer} />
      </body>
    </html>
  );
}
