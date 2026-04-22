import { cookies, headers } from "next/headers";
import type { Locale } from "@/i18n/translations";

const FRENCH_RE = /^fr\b/i;

export async function getLocale(): Promise<Locale> {
  // 1. Cookie already set by proxy on a previous visit (most reliable)
  const c = await cookies();
  const fromCookie = c.get("locale")?.value;
  if (fromCookie === "fr" || fromCookie === "en") return fromCookie;

  // 2. x-locale header injected by proxy on the current request
  const h = await headers();
  const fromHeader = h.get("x-locale");
  if (fromHeader === "fr" || fromHeader === "en") return fromHeader;

  // 3. Read Accept-Language directly (fallback for dev / first visit)
  const acceptLang = h.get("accept-language") ?? "";
  const primary = acceptLang.split(",")[0]?.split(";")[0]?.trim() ?? "en";
  return FRENCH_RE.test(primary) ? "fr" : "en";
}
