import { AppSidebar } from "@/components/app/app-sidebar";
import { AppTopbar } from "@/components/app/app-topbar";
import { currentUser } from "@/services/auth";
import { usageFor } from "@/lib/store";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const usage = usageFor(user.id);

  return (
    <div className="flex min-h-screen w-full bg-cloud">
      <AppSidebar isAdmin={user.role === "admin"} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar user={user} usage={usage} />
        <main className="flex-1 px-5 py-7">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
