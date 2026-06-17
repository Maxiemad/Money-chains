import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Card, Input } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { loginAction, demoLoginAction } from "@/lib/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-cloud px-5 py-12">
      <Card className="w-full max-w-md p-8">
        <Logo />
        <h1 className="mt-6 font-display text-2xl font-semibold text-navy">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-muted">
          Log in to continue building your chains.
        </p>

        {error === "notfound" && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            We couldn't find that account. Try the demo or sign up.
          </p>
        )}

        <form action={loginAction} className="mt-6 space-y-3">
          <Input name="email" type="email" placeholder="you@email.com" required />
          <Input name="password" type="password" placeholder="Password" />
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
        </div>

        <form action={demoLoginAction}>
          <Button type="submit" variant="outline" className="w-full">
            Try the live demo →
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          New here?{" "}
          <Link href="/signup" className="font-medium text-teal hover:underline">
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  );
}
