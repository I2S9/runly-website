import type { Metadata } from "next";
import { AppLinkLanding } from "@/components/ui/AppLinkLanding";
import { appLinkMetadata } from "@/lib/app-link-metadata";

/** Cible des partages de post (`lib/post-share.ts` côté app). */
type Params = { params: Promise<{ postId: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { postId } = await params;
  return appLinkMetadata("post", `p/${encodeURIComponent(postId)}`);
}

export default async function PostLinkPage({ params }: Params) {
  const { postId } = await params;
  return <AppLinkLanding kind="post" appPath={`p/${encodeURIComponent(postId)}`} />;
}
