import { AppSidebar } from "@/components/app/app-sidebar";
import { AppTopbar } from "@/components/app/app-topbar";
import { ThemeProvider } from "@/components/app/theme-provider";
import { currentUser } from "@/services/auth";
import { usageFor, getDb } from "@/lib/store";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const usage = await usageFor(user.id);
  const db = await getDb();
  const counts = {
    chains: db.userChains.filter(
      (c) => c.userId === user.id && c.status === "active"
    ).length,
    connections: db.connections.filter(
      (c) => c.userId === user.id && c.status === "connected"
    ).length,
    content: db.content.filter((c) => c.userId === user.id).length,
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-cloud">
        {/* Fixed left rail — content scrolls independently */}
        <AppSidebar isAdmin={user.role === "admin"} counts={counts} />
        <div className="flex min-h-screen flex-col md:pl-60">
          <AppTopbar user={user} usage={usage} />
          <main className="flex-1 px-5 py-7">
            <div className="mx-auto max-w-5xl">{children}</div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
