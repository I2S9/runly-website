import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Locale } from "@/i18n/translations";

const FRENCH_RE = /^fr\b/i;

function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get("locale")?.value;
  if (cookie === "fr" || cookie === "en") return cookie;

  const acceptLang = request.headers.get("accept-language") ?? "";
  const primary = acceptLang.split(",")[0]?.split(";")[0]?.trim() ?? "en";
  return FRENCH_RE.test(primary) ? "fr" : "en";
}

export function proxy(request: NextRequest) {
  const locale = detectLocale(request);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.cookies.set("locale", locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|branding|images).*)"],
};
