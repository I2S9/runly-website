import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Runly – icône de l'app",
  robots: { index: false, follow: false },
};

// Page volontairement nue : uniquement l'icône de l'app, sans navbar ni footer,
// pour pouvoir la copier / l'enregistrer (signature Google Workspace, etc.).
export default function IconPage() {
  return (
    <>
      <style>{`body > header, body > footer { display: none !important; }`}</style>
      <main className="flex min-h-screen items-center justify-center bg-white p-6">
        <Image
          src="/branding/runly-icon-1024.png"
          alt="Icône de l'application Runly"
          width={1024}
          height={1024}
          className="h-auto w-full max-w-[512px]"
          priority
          unoptimized
        />
      </main>
    </>
  );
}
