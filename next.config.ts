import type { NextConfig } from "next";
import path from "path";

// Logos des médias et couvertures d'articles servis par le Storage Supabase.
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: supabaseHost
      ? [
          {
            protocol: "https" as const,
            hostname: supabaseHost,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
  async rewrites() {
    return [
      // Apple impose ce chemin exact. Le route handler vit sous `well-known/`
      // (sans point) : l'App Router ignore les dossiers commençant par un point.
      {
        source: "/.well-known/apple-app-site-association",
        destination: "/well-known/apple-app-site-association",
      },
    ];
  },
};

export default nextConfig;
