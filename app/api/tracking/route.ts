import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getAllOrders,
  getOrdersForCustomer,
  refreshTracking,
  updateOrderTracking,
} from "@/lib/data";
import { DEMO_MSN_TRACKING } from "@/lib/demo-data";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  const orderList =
    session.role === "admin"
      ? getAllOrders()
      : getOrdersForCustomer(session.customerId || "cust1");

  const order = orderId
    ? orderList.find((o) => o.id === orderId)
    : orderList[0];
  if (!order) return NextResponse.json({ error: "No order" }, { status: 404 });

  return NextResponse.json({
    msn_tracking_number: order.msn_tracking_number || DEMO_MSN_TRACKING,
    origin_port: order.origin_port,
    vessel_name: order.vessel_name,
    eta_chennai: order.eta_chennai,
    events: order.tracking_events,
    last_event: order.last_tracking_event,
  });
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId, msn_tracking_number, action } = await request.json();

  if (action === "refresh" && orderId) {
    const order = refreshTracking(orderId);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json({ order, events: order.tracking_events });
  }

  if (orderId && msn_tracking_number) {
    const ok = updateOrderTracking(orderId, msn_tracking_number);
    if (!ok) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    const order = getAllOrders().find((o) => o.id === orderId);
    return NextResponse.json({ order });
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
