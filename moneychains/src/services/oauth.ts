import type { ConnectionType } from "@/lib/types";
import { getPlatform } from "@/data/platforms";

/**
 * Connection providers.
 *
 * Three connection types, one interface. OAuth providers do the
 * authorize → token → publish → metrics dance; api_key providers validate a
 * pasted key; manual providers just track. Every provider below is a SANDBOX
 * mock (clearly flagged) so the entire UX is demonstrable without real apps
 * or secrets. To go live, implement `authorizeUrl` + `exchangeCode` against
 * the real platform and drop the `sandbox` flag.
 */

export interface PublishResult {
  ok: boolean;
  externalUrl: string;
  message: string;
}

export interface PlatformMetrics {
  impressions: number;
  clicks: number;
}

export interface ConnectionProvider {
  platformId: string;
  type: ConnectionType;
  sandbox: boolean;
  /** OAuth: where to send the user to authorize. */
  authorizeUrl?(state: string): string;
  /** OAuth: exchange the returned code for tokens. */
  exchangeCode?(code: string): Promise<{ accessToken: string; refreshToken: string; label: string }>;
  /** api_key: validate a pasted key/id. */
  validateKey?(key: string): Promise<{ ok: boolean; label: string }>;
  /** Publish content (returns a fake-but-plausible external URL in sandbox). */
  publish?(payload: { title: string; body: string }): Promise<PublishResult>;
  /** Read back performance. */
  metrics?(): Promise<PlatformMetrics>;
}

function rand(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min));
}

/** Build a sandbox provider for any platform from its declared type. */
function sandboxProvider(platformId: string): ConnectionProvider {
  const p = getPlatform(platformId);
  const type: ConnectionType = p?.type ?? "manual";
  const base: ConnectionProvider = { platformId, type, sandbox: true };

  if (type === "oauth") {
    base.authorizeUrl = (state) =>
      `/api/oauth/${platformId}/callback?code=sandbox-code&state=${encodeURIComponent(state)}`;
    base.exchangeCode = async () => ({
      accessToken: `enc::oauth::${platformId}::${Math.random().toString(36).slice(2, 10)}`,
      refreshToken: `enc::refresh::${Math.random().toString(36).slice(2, 10)}`,
      label: `@${platformId}_demo`,
    });
    base.publish = async ({ title }) => ({
      ok: true,
      externalUrl: `https://sandbox.${platformId}.test/p/${Math.random().toString(36).slice(2, 8)}`,
      message: `Published "${title}" to ${p?.name ?? platformId} (sandbox)`,
    });
    base.metrics = async () => ({ impressions: rand(400, 4000), clicks: rand(10, 220) });
  }

  if (type === "api_key") {
    base.validateKey = async (key) => ({
      ok: key.trim().length >= 3,
      label: key.trim(),
    });
    base.metrics = async () => ({ impressions: 0, clicks: rand(5, 90) });
  }

  if (type === "manual") {
    base.publish = async ({ title }) => ({
      ok: true,
      externalUrl: "",
      message: `Draft ready for "${title}" — copy it into ${p?.name ?? platformId} and send.`,
    });
  }

  return base;
}

const registry = new Map<string, ConnectionProvider>();

export function getProvider(platformId: string): ConnectionProvider {
  if (!registry.has(platformId)) {
    registry.set(platformId, sandboxProvider(platformId));
  }
  return registry.get(platformId)!;
}
