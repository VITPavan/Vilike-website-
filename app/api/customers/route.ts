import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getAllCustomers } from "@/lib/data";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customers = getAllCustomers();
  const booked = customers.reduce((s, c) => s + (c.order?.total_amount ?? 0), 0);
  const collected = customers.reduce((s, c) => s + (c.order?.amount_paid ?? 0), 0);

  return NextResponse.json({
    customers,
    stats: {
      booked,
      collected,
      outstanding: booked - collected,
    },
  });
}
