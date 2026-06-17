"use server";

import { redirect } from "next/navigation";
import { login } from "@/services/auth";

/**
 * Log the current visitor in as the seeded admin user and drop them on the
 * internal /admin dashboard. Used by the access-denied gate on /admin so the
 * role-gated experience is clickable in the demo.
 */
export async function enterAdminDemoAction() {
  await login("admin@moneychains.app");
  redirect("/admin");
}
