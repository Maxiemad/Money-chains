import { cookies } from "next/headers";
import type { User } from "@/lib/types";
import { getUser, getUserByEmail, db, newId } from "@/lib/store";

/**
 * Auth service (mock of Supabase Auth).
 *
 * App login uses an httpOnly cookie holding the user id. In production this
 * becomes a Supabase session JWT; the call sites (`currentUser`, `setSession`,
 * `clearSession`) stay identical.
 *
 * For a frictionless demo, `currentUser()` falls back to the seeded demo user
 * when no session cookie is present — so `/app` is clickable on first run.
 */
const COOKIE = "mc_session";
const DEMO_ID = "u_demo";

export async function currentUser(): Promise<User> {
  const jar = await cookies();
  const id = jar.get(COOKIE)?.value;
  return (id && getUser(id)) || getUser(DEMO_ID)!;
}

/**
 * Real session check — returns the logged-in user ONLY if a session cookie is
 * present (no demo fallback). Used by public pages (landing) to decide whether
 * to show the avatar vs. the "Log in / Start free" buttons.
 */
export async function sessionUser(): Promise<User | null> {
  const jar = await cookies();
  const id = jar.get(COOKIE)?.value;
  return (id && getUser(id)) || null;
}

export async function setSession(userId: string): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

/** Mock email/password login. Any password is accepted in the demo. */
export async function login(email: string): Promise<User | null> {
  const user = getUserByEmail(email);
  if (!user) return null;
  await setSession(user.id);
  return user;
}

/** Mock signup — creates a fresh free-tier user. */
export async function signup(name: string, email: string): Promise<User> {
  const existing = getUserByEmail(email);
  if (existing) {
    await setSession(existing.id);
    return existing;
  }
  const user: User = {
    id: newId("u"),
    name,
    email,
    avatarColor: "#27d8a0",
    role: "user",
    plan: "free",
    createdAt: new Date().toISOString(),
    xp: 0,
    streak: 0,
  };
  db.users.push(user);
  db.usage.push({
    userId: user.id,
    aiCreditsUsed: 0,
    aiCreditsLimit: 50,
    automationRunsUsed: 0,
    automationRunsLimit: 0,
  });
  await setSession(user.id);
  return user;
}
