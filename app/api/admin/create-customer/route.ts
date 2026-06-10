import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  createDynamicCustomer,
  readCustomers,
  deleteCustomer,
} from "@/lib/customer-store";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const customers = readCustomers();
  return NextResponse.json({ customers });
}

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
    machinePrice,
    amountPaid,
    dollarRate,
    gstPercentage,
    trackingNumber,
  } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Customer name and email are required" },
      { status: 400 }
    );
  }

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
    machinePrice: machinePrice ?? "",
    amountPaid: amountPaid ?? "",
    dollarRate: dollarRate ?? "",
    gstPercentage: gstPercentage ?? "",
    trackingNumber: trackingNumber ?? "",
  });

  return NextResponse.json({ success: true, customer });
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await request.json();
  const ok = deleteCustomer(id);
  return NextResponse.json({ success: ok });
}
