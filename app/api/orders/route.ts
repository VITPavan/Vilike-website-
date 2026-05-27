import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getAllOrders,
  getOrdersForCustomer,
  updateOrderStatus,
} from "@/lib/data";
import type { OrderStatus } from "@/lib/types";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (session.role === "admin") {
    return NextResponse.json({ orders: getAllOrders() });
  }
  const orders = getOrdersForCustomer(session.customerId || "cust1");
  return NextResponse.json({ orders });
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { orderId, status } = await request.json();
  const ok = updateOrderStatus(orderId, status as OrderStatus);
  if (!ok) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
