import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Runly",
  description: "Runly website",
  icons: {
    icon: [{ url: "/branding/runly.svg", type: "image/svg+xml" }],
    apple: [{ url: "/branding/runly.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${bricolageGrotesque.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
