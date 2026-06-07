import { NextResponse } from "next/server";
import { DEMO_USERS } from "@/lib/demo-data";
import { SESSION_COOKIE, sessionCookieValue } from "@/lib/auth";
import type { SessionUser } from "@/lib/types";
import { findCustomerByEmail } from "@/lib/customer-store";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  let user: SessionUser | null = null;

  // 1. Check demo / hardcoded users
  if (email === DEMO_USERS.admin.email && password === DEMO_USERS.admin.password) {
    user = { email, role: "admin", name: DEMO_USERS.admin.name };
  } else if (
    email === DEMO_USERS.customer.email &&
    password === DEMO_USERS.customer.password
  ) {
    user = {
      email,
      role: "customer",
      name: DEMO_USERS.customer.name,
      customerId: DEMO_USERS.customer.customerId,
    };
  }

  // 2. Check dynamically created customers (admin-issued passkeys)
  if (!user) {
    const dynCustomer = findCustomerByEmail(email);
    if (dynCustomer && dynCustomer.passkey === password) {
      user = {
        email,
        role: "customer",
        name: dynCustomer.name,
        customerId: dynCustomer.id,
      };
    }
  }

  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or passkey" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ role: user.role });
  res.cookies.set(SESSION_COOKIE, sessionCookieValue(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
