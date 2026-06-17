import { LandingPage } from "@/components/landing/landing-page";
import { sessionUser } from "@/services/auth";

// Root route — the cinematic MoneyChains landing page (everything on one domain).
export default async function Page() {
  const user = await sessionUser();
  return (
    <LandingPage
      user={user ? { name: user.name, avatarColor: user.avatarColor } : null}
    />
  );
}
