import Link from "next/link";
import { Check } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Card, Input } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { signupAction } from "@/lib/actions";
import { sessionUser } from "@/services/auth";
import { redirect } from "next/navigation";

const PERKS = [
  "1 active money chain, free forever",
  "50 AI content credits / month",
  "Earnings dashboard with real attribution",
  "OAuth security — we never see your passwords",
];

export default async function SignupPage() {
  if (await sessionUser()) redirect("/app");
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* form */}
      <div className="flex items-center justify-center bg-white px-5 py-12">
        <Card className="w-full max-w-md border-0 p-8 shadow-none">
          <Logo />
          <h1 className="mt-6 font-display text-2xl font-semibold text-navy">
            Start free
          </h1>
          <p className="mt-1 text-sm text-muted">
            No card required. Earn your first rupee.
          </p>

          <form action={signupAction} className="mt-6 space-y-3">
            <Input name="name" placeholder="Your name" required />
            <Input name="email" type="email" placeholder="you@email.com" required />
            <Input name="password" type="password" placeholder="Create a password" />
            <Button type="submit" className="w-full">
              Create my account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-teal hover:underline">
              Log in
            </Link>
          </p>
        </Card>
      </div>

      {/* aside */}
      <div className="relative hidden overflow-hidden bg-navy lg:block">
        <div className="mesh absolute inset-0 opacity-80" />
        <div className="relative flex h-full flex-col justify-center px-12 text-ink">
          <h2 className="font-display text-3xl font-semibold leading-tight">
            Your skills are already worth something.
          </h2>
          <p className="mt-3 max-w-sm text-ink/70">
            Join 12,000+ builders turning what they know into income — one
            proven chain at a time.
          </p>
          <ul className="mt-8 space-y-3">
            {PERKS.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-navy">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-sm text-ink/80">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
