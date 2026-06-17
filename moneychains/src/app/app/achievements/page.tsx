import {
  Plug,
  Send,
  Coins,
  Trophy,
  Flame,
  Sparkles,
  Link2,
  Crown,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { Card, Badge, IconCircle } from "@/components/ui/primitives";
import { currentUser } from "@/services/auth";
import { achievementsFor, earningsFor } from "@/lib/store";
import { inr, timeAgo } from "@/lib/utils";

/** Badge catalog. `key`s that match earned achievements light up. */
const BADGES: {
  key: string;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    key: "first_connection",
    label: "First Connection",
    description: "Linked your first platform.",
    icon: Plug,
  },
  {
    key: "first_publish",
    label: "First Publish",
    description: "Shipped your first piece of content.",
    icon: Send,
  },
  {
    key: "first_rupee",
    label: "First ₹ Earned",
    description: "Logged your very first rupee.",
    icon: Coins,
  },
  {
    key: "chain_complete",
    label: "Chain Complete",
    description: "Finished every step of a chain.",
    icon: Link2,
  },
  {
    key: "streak_7",
    label: "Week Warrior",
    description: "Stayed active 7 days in a row.",
    icon: Flame,
  },
  {
    key: "ten_thousand",
    label: "₹10k Club",
    description: "Crossed ₹10,000 in total earnings.",
    icon: Trophy,
  },
  {
    key: "content_machine",
    label: "Content Machine",
    description: "Generated 25 pieces of content.",
    icon: Sparkles,
  },
  {
    key: "multi_chain",
    label: "Diversified",
    description: "Ran three chains at once.",
    icon: Crown,
  },
];

/** Privacy-safe leaderboard — anonymized handles only, opt-in. */
const LEADERBOARD: { handle: string; earned: number }[] = [
  { handle: "builder_4821", earned: 184200 },
  { handle: "quiet_otter_77", earned: 96400 },
  { handle: "maker_2099", earned: 61750 },
  { handle: "fern_and_co", earned: 38900 },
  { handle: "builder_5510", earned: 21300 },
  { handle: "slow_river_12", earned: 9050 },
];

export default async function AchievementsPage() {
  const user = await currentUser();
  const earned = await achievementsFor(user.id);
  const earnedMap = new Map(earned.map((a) => [a.key, a]));

  const xp = user.xp;
  const level = Math.floor(xp / 100) + 1;
  const intoLevel = xp % 100;
  const pct = Math.min(100, intoLevel);
  const xpToNext = 100 - intoLevel;

  const myTotal = (await earningsFor(user.id)).reduce((s, e) => s + e.amount, 0);

  // Insert the current user into the leaderboard, ranked by total earned.
  const rows = [
    ...LEADERBOARD.map((r) => ({ ...r, me: false })),
    { handle: "you", earned: myTotal, me: true },
  ]
    .sort((a, b) => b.earned - a.earned)
    .map((r, i) => ({ ...r, rank: i + 1 }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">
          Achievements
        </h1>
        <p className="mt-1 text-sm text-muted">
          Progress, badges, and a little friendly competition — to keep the
          chain-building habit going.
        </p>
      </div>

      {/* level + streak */}
      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-4">
          <IconCircle className="h-12 w-12 bg-mint/15 text-teal">
            <Trophy className="h-5 w-5" />
          </IconCircle>
          <div>
            <p className="font-display text-xl font-semibold text-navy">
              Level {level}
            </p>
            <p className="text-sm text-muted">
              {xp.toLocaleString("en-IN")} XP total
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-700">
            <Flame className="h-4 w-4" />
            {user.streak}-day streak
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs text-muted">
            <span>Level {level}</span>
            <span>{xpToNext} XP to level {level + 1}</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-cloud">
            <div
              className="h-full rounded-full bg-teal transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </Card>

      {/* badges */}
      <div>
        <h2 className="font-display text-base font-semibold text-navy">
          Badges
        </h2>
        <p className="mt-1 text-sm text-muted">
          {earnedMap.size} of {BADGES.length} earned.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BADGES.map((b) => {
            const hit = earnedMap.get(b.key);
            const unlocked = Boolean(hit);
            return (
              <Card
                key={b.key}
                className={`flex flex-col items-center p-5 text-center ${
                  unlocked ? "" : "opacity-60"
                }`}
              >
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${
                    unlocked
                      ? "bg-teal/10 text-teal"
                      : "bg-cloud text-muted"
                  }`}
                >
                  {unlocked ? (
                    <b.icon className="h-5 w-5" />
                  ) : (
                    <Lock className="h-5 w-5" />
                  )}
                </span>
                <p className="mt-3 text-sm font-semibold text-navy">
                  {b.label}
                </p>
                <p className="mt-1 text-xs text-muted">{b.description}</p>
                {unlocked ? (
                  <Badge tone="mint" className="mt-3">
                    Earned {timeAgo(hit!.earnedAt)}
                  </Badge>
                ) : (
                  <Badge tone="neutral" className="mt-3">
                    Locked
                  </Badge>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* leaderboard */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-semibold text-navy">
            Leaderboard
          </h2>
          <Badge tone="neutral">Opt-in</Badge>
        </div>
        <p className="mt-1 text-xs text-muted">
          Opt-in only, and we show anonymized handles — never your name or
          email. Totals are illustrative.
        </p>
        <div className="mt-4 divide-y divide-line">
          {rows.map((r) => (
            <div
              key={r.handle}
              className={`flex items-center gap-3 py-3 ${
                r.me ? "-mx-2 rounded-xl bg-mint/10 px-2" : ""
              }`}
            >
              <span
                className={`w-6 text-sm font-semibold ${
                  r.me ? "text-teal" : "text-muted"
                }`}
              >
                {r.rank}
              </span>
              <span
                className={`min-w-0 flex-1 truncate text-sm ${
                  r.me ? "font-semibold text-navy" : "text-navy"
                }`}
              >
                {r.me ? "you" : r.handle}
                {r.me && (
                  <span className="ml-2 text-xs font-normal text-teal">
                    (that's you)
                  </span>
                )}
              </span>
              <span
                className={`text-sm font-semibold ${
                  r.me ? "text-teal" : "text-navy"
                }`}
              >
                {inr(r.earned)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
