import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { SessionUser, UserRole } from "./types";

const SESSION_COOKIE = "vilike_session";

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as SessionUser;
  } catch {
    return null;
  }
}

export async function requireRole(role: UserRole): Promise<SessionUser> {
  const session = await getSession();
  if (!session || session.role !== role) {
    redirect("/login");
  }
  return session;
}

export function sessionCookieValue(user: SessionUser): string {
  return encodeURIComponent(JSON.stringify(user));
}

export { SESSION_COOKIE };
