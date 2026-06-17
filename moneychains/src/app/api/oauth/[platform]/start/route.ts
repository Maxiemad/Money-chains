import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getOAuthConfig, hasRealOAuth } from "@/lib/oauth-config";
import { getPlatform } from "@/data/platforms";
import { currentUser } from "@/services/auth";
import { saveConnection } from "@/lib/store";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;
  const origin = new URL(req.url).origin;
  const cfg = getOAuthConfig(platform);

  // No real app credentials yet → connect in sandbox mode so the demo works.
  if (!cfg || !hasRealOAuth(platform)) {
    const user = await currentUser();
    const p = getPlatform(platform);
    await saveConnection(user.id, platform, {
      type: p?.type ?? "oauth",
      token: `sandbox::${platform}::${randomUUID().slice(0, 8)}`,
      label: `@${platform}_demo`,
    });
    return NextResponse.redirect(`${origin}/app/connections?connected=${platform}`);
  }

  // Real OAuth: send the user to the platform's consent screen.
  const state = randomUUID();
  const redirectUri = `${origin}/api/oauth/${platform}/callback`;
  const authUrl = new URL(cfg.authorizeUrl);
  authUrl.searchParams.set("client_id", process.env[cfg.clientIdEnv]!);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set(
    "scope",
    cfg.scopes.join(cfg.scopeSeparator ?? " ")
  );
  authUrl.searchParams.set("state", state);
  for (const [k, v] of Object.entries(cfg.extraAuthParams ?? {})) {
    authUrl.searchParams.set(k, v);
  }

  const res = NextResponse.redirect(authUrl.toString());
  res.cookies.set(`mc_oauth_state_${platform}`, state, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return res;
}
