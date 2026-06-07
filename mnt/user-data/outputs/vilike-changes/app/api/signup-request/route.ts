import { NextResponse } from "next/server";
import { createSignupRequest, readCustomers } from "@/lib/customer-store";

// POST — new customer submits a signup / access request
export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, company } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Full name and email are required" },
      { status: 400 }
    );
  }

  // Reject duplicate emails
  const existing = readCustomers().find(
    (c) => c.email.toLowerCase() === email.toLowerCase()
  );
  if (existing) {
    return NextResponse.json(
      {
        error:
          existing.status === "active"
            ? "This email already has an account. Please log in using your passkey."
            : "A signup request for this email is already pending. Admin will contact you shortly.",
      },
      { status: 409 }
    );
  }

  createSignupRequest({
    name,
    email,
    phone: phone ?? "",
    company: company ?? "",
  });

  return NextResponse.json({ success: true });
}
