import type { Metadata } from "next";
import { AppLinkLanding } from "@/components/ui/AppLinkLanding";
import { appLinkMetadata } from "@/lib/app-link-metadata";

/** Cible des invitations de groupe (`lib/group-chat.ts` côté app). */
type Params = { params: Promise<{ groupId: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { groupId } = await params;
  return appLinkMetadata("group", `join/${encodeURIComponent(groupId)}`);
}

export default async function GroupLinkPage({ params }: Params) {
  const { groupId } = await params;
  return <AppLinkLanding kind="group" appPath={`join/${encodeURIComponent(groupId)}`} />;
}
