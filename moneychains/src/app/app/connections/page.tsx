import { ShieldCheck, Plug, KeyRound, Hand } from "lucide-react";
import { Card, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { PlatformIcon } from "@/components/brand/platform-icon";
import { currentUser } from "@/services/auth";
import { connectionsFor } from "@/lib/store";
import { PLATFORMS } from "@/data/platforms";
import { connectAction, disconnectAction } from "@/lib/actions";
import { timeAgo } from "@/lib/utils";

const TYPE_META = {
  oauth: { icon: Plug, label: "OAuth", tone: "teal" as const },
  api_key: { icon: KeyRound, label: "API key", tone: "neutral" as const },
  manual: { icon: Hand, label: "Manual", tone: "amber" as const },
};

export default async function ConnectionsPage() {
  const user = await currentUser();
  const conns = await connectionsFor(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">
          Connections
        </h1>
        <p className="mt-1 text-sm text-muted">
          Connect the platforms your chains use. We store encrypted, revocable
          tokens — never your passwords.
        </p>
      </div>

      <Card className="flex items-start gap-3 border-0 bg-teal/5 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
        <p className="text-sm text-navy">
          <strong>You're in control.</strong> OAuth connections hand us a token
          that you can revoke any time. We never see or store your platform
          passwords.
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {PLATFORMS.map((p) => {
          const conn = conns.find((c) => c.platformId === p.id);
          const connected = conn?.status === "connected";
          const needsReauth = conn?.status === "needs_reauth";
          const meta = TYPE_META[p.type];
          return (
            <Card key={p.id} className="p-5">
              <div className="flex items-start gap-3">
                <PlatformIcon platformId={p.id} size={44} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-navy">{p.name}</p>
                    <Badge tone={meta.tone}>
                      <meta.icon className="h-3 w-3" /> {meta.label}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted">{p.blurb}</p>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-xs">
                      {connected ? (
                        <span className="text-teal">
                          Connected · {conn?.accountLabel}
                          {conn?.lastSyncedAt && (
                            <span className="text-muted">
                              {" "}
                              · synced {timeAgo(conn.lastSyncedAt)}
                            </span>
                          )}
                        </span>
                      ) : needsReauth ? (
                        <span className="text-amber-600">Needs reauth</span>
                      ) : (
                        <span className="text-muted">Not connected</span>
                      )}
                    </span>

                    {connected ? (
                      <form action={disconnectAction.bind(null, conn!.id)}>
                        <Button variant="ghost" size="sm" type="submit">
                          Disconnect
                        </Button>
                      </form>
                    ) : (
                      <form action={connectAction} className="flex gap-2">
                        <input type="hidden" name="platformId" value={p.id} />
                        {p.type === "api_key" && (
                          <input
                            name="key"
                            placeholder="key / id"
                            required
                            className="h-9 w-28 rounded-lg border border-line px-2 text-xs outline-none focus:border-teal"
                          />
                        )}
                        <Button size="sm" type="submit">
                          Connect
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
