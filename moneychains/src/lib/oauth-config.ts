/**
 * Real OAuth provider registry.
 *
 * Each entry is what MoneyChains needs to register itself as an app on that
 * platform. The flow goes live for a platform the moment its CLIENT_ID +
 * CLIENT_SECRET env vars are set (see hasRealOAuth). Until then, the Connect
 * button falls back to a sandbox connection so the demo keeps working.
 *
 * Redirect URI to register on each platform:
 *   {your-domain}/api/oauth/{platformId}/callback
 */
export interface OAuthProviderConfig {
  platformId: string;
  authorizeUrl: string;
  tokenUrl: string;
  scopes: string[];
  clientIdEnv: string;
  clientSecretEnv: string;
  /** Token endpoint auth style: "basic" (Authorization header) or "body". */
  tokenAuth: "basic" | "body";
  scopeSeparator?: string;
  /** Fetch a human-readable account label after we have the token. */
  profile?: (accessToken: string) => Promise<string>;
  extraAuthParams?: Record<string, string>;
}

export const OAUTH_PROVIDERS: Record<string, OAuthProviderConfig> = {
  pinterest: {
    platformId: "pinterest",
    authorizeUrl: "https://www.pinterest.com/oauth/",
    tokenUrl: "https://api.pinterest.com/v5/oauth/token",
    scopes: ["user_accounts:read", "boards:read", "pins:read", "pins:write"],
    clientIdEnv: "PINTEREST_CLIENT_ID",
    clientSecretEnv: "PINTEREST_CLIENT_SECRET",
    tokenAuth: "basic",
    scopeSeparator: ",",
    profile: async (token) => {
      try {
        const r = await fetch("https://api.pinterest.com/v5/user_account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!r.ok) return "@pinterest";
        const d = (await r.json()) as { username?: string };
        return d.username ? `@${d.username}` : "@pinterest";
      } catch {
        return "@pinterest";
      }
    },
  },

  youtube: {
    platformId: "youtube",
    authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    scopes: [
      "https://www.googleapis.com/auth/youtube.readonly",
      "https://www.googleapis.com/auth/yt-analytics.readonly",
    ],
    clientIdEnv: "YOUTUBE_CLIENT_ID",
    clientSecretEnv: "YOUTUBE_CLIENT_SECRET",
    tokenAuth: "body",
    extraAuthParams: { access_type: "offline", prompt: "consent" },
  },

  facebook: {
    platformId: "facebook",
    authorizeUrl: "https://www.facebook.com/v19.0/dialog/oauth",
    tokenUrl: "https://graph.facebook.com/v19.0/oauth/access_token",
    scopes: ["public_profile", "pages_manage_posts", "pages_read_engagement"],
    clientIdEnv: "FACEBOOK_CLIENT_ID",
    clientSecretEnv: "FACEBOOK_CLIENT_SECRET",
    tokenAuth: "body",
  },
};

export function getOAuthConfig(id: string): OAuthProviderConfig | undefined {
  return OAUTH_PROVIDERS[id];
}

/** A platform has real OAuth wired only if its client id + secret are present. */
export function hasRealOAuth(id: string): boolean {
  const c = OAUTH_PROVIDERS[id];
  return !!(
    c &&
    process.env[c.clientIdEnv] &&
    process.env[c.clientSecretEnv]
  );
}
