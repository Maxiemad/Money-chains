import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOAuthConfig } from "@/lib/oauth-config";
import { getPlatform } from "@/data/platforms";
import { currentUser } from "@/services/auth";
import { saveConnection } from "@/lib/store";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;
  const origin = new URL(req.url).origin;
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cfg = getOAuthConfig(platform);
  const fail = (reason: string) =>
    NextResponse.redirect(`${origin}/app/connections?error=${reason}`);

  if (!cfg || !code) return fail("oauth_config");

  // CSRF: state must match the cookie we set in /start.
  const jar = await cookies();
  const expected = jar.get(`mc_oauth_state_${platform}`)?.value;
  if (!expected || expected !== state) return fail("state_mismatch");

  const redirectUri = `${origin}/api/oauth/${platform}/callback`;
  const clientId = process.env[cfg.clientIdEnv]!;
  const clientSecret = process.env[cfg.clientSecretEnv]!;

  // Exchange the code for an access token.
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });
  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  if (cfg.tokenAuth === "basic") {
    headers.Authorization = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
  } else {
    body.set("client_id", clientId);
    body.set("client_secret", clientSecret);
  }

  let accessToken = "";
  try {
    const r = await fetch(cfg.tokenUrl, { method: "POST", headers, body });
    if (!r.ok) return fail("token_exchange");
    const data = (await r.json()) as { access_token?: string };
    if (!data.access_token) return fail("no_token");
    accessToken = data.access_token;
  } catch {
    return fail("token_exchange");
  }

  const label = cfg.profile
    ? await cfg.profile(accessToken)
    : `@${platform}`;

  const user = await currentUser();
  const p = getPlatform(platform);
  // NOTE: store the token encrypted with TOKEN_ENCRYPTION_KEY in production.
  await saveConnection(user.id, platform, {
    type: p?.type ?? "oauth",
    token: `oauth::${platform}::${accessToken}`,
    label,
  });

  const res = NextResponse.redirect(`${origin}/app/connections?connected=${platform}`);
  res.cookies.delete(`mc_oauth_state_${platform}`);
  return res;
}
