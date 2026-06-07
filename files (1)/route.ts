import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  createDynamicCustomer,
  readCustomers,
  deleteCustomer,
} from "@/lib/customer-store";

// GET — list all dynamic customers (pending + active)
export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const customers = readCustomers();
  return NextResponse.json({ customers });
}

// POST — admin creates a new customer record + passkey
export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    name,
    email,
    phone,
    company,
    machineModel,
    machineDetails,
    lcCopy,
    shiftCopy,
    deliveryAddress,
    paymentDetails,
    bankName,
    rtgsNo,
  } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Customer name and email are required" },
      { status: 400 }
    );
  }

  // Check duplicate email
  const existing = readCustomers().find(
    (c) => c.email.toLowerCase() === email.toLowerCase()
  );
  if (existing) {
    return NextResponse.json(
      { error: "A customer with this email already exists" },
      { status: 409 }
    );
  }

  const customer = createDynamicCustomer({
    name,
    email,
    phone: phone ?? "",
    company: company ?? "",
    machineModel: machineModel ?? "",
    machineDetails: machineDetails ?? "",
    lcCopy: lcCopy ?? "",
    shiftCopy: shiftCopy ?? "",
    deliveryAddress: deliveryAddress ?? "",
    paymentDetails: paymentDetails ?? "",
    bankName: bankName ?? "",
    rtgsNo: rtgsNo ?? "",
  });

  /*
   * ── EMAIL HOOK ──────────────────────────────────────────────────────────────
   * To send the passkey via email, add your email provider here.
   * Example using Resend (https://resend.com):
   *
   *   const { Resend } = await import("resend");
   *   const resend = new Resend(process.env.RESEND_API_KEY);
   *   await resend.emails.send({
   *     from: "VILIKE FAB TECH <noreply@vilikefab.com>",
   *     to: email,
   *     subject: "Your VILIKE Customer Portal Login",
   *     html: `
   *       <p>Dear ${name},</p>
   *       <p>Your customer portal account has been created.</p>
   *       <p><strong>Login Email:</strong> ${email}</p>
   *       <p><strong>Passkey:</strong> ${customer.passkey}</p>
   *       <p>Login at: https://vilikefab.com/login</p>
   *     `,
   *   });
   * ───────────────────────────────────────────────────────────────────────────
   */

  return NextResponse.json({ success: true, customer });
}

// DELETE — remove a customer record
export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await request.json();
  const ok = deleteCustomer(id);
  return NextResponse.json({ success: ok });
}
