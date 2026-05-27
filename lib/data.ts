import {
  clothSamples,
  customers,
  eligibilityLeads,
  financingOptions,
  machines,
  orderDocuments,
  orders,
  reviews,
  services,
} from "./demo-data";
import type { EligibilityLead, Machine, Order, OrderStatus } from "./types";

export function getMachines(): Machine[] {
  return machines;
}

export function getMachineBySlug(slug: string): Machine | undefined {
  return machines.find((m) => m.slug === slug);
}

export function getMachineById(id: string): Machine | undefined {
  return machines.find((m) => m.id === id);
}

export function getReviewsForMachine(machineId: string) {
  return reviews.filter((r) => r.machine_id === machineId);
}

export function getFeaturedReviews() {
  return reviews.filter((r) => r.featured);
}

export function getClothSamples() {
  return clothSamples;
}

export function getFinancingOptions() {
  return financingOptions;
}

export function getServices() {
  return services;
}

export function getOrdersForCustomer(customerId: string): Order[] {
  return orders.filter((o) => o.customer_id === customerId);
}

export function getAllOrders(): Order[] {
  return orders;
}

export function getOrderById(orderId: string): Order | undefined {
  return orders.find((o) => o.id === orderId);
}

export function getDocumentsForOrder(orderId: string) {
  return orderDocuments.filter((d) => d.order_id === orderId);
}

export function getAllCustomers() {
  return customers.map((c) => {
    const order = orders.find((o) => o.customer_id === c.id);
    const machine = order ? machines.find((m) => m.id === order.machine_id) : null;
    return {
      ...c,
      order,
      machine,
      outstanding: order ? order.total_amount - order.amount_paid : 0,
    };
  });
}

export function updateOrderStatus(orderId: string, status: OrderStatus): boolean {
  const order = orders.find((o) => o.id === orderId);
  if (!order) return false;
  order.status = status;
  return true;
}

export function updateOrderTracking(
  orderId: string,
  msnTrackingNumber: string
): boolean {
  const order = orders.find((o) => o.id === orderId);
  if (!order) return false;
  order.msn_tracking_number = msnTrackingNumber;
  order.last_tracking_event = `MSN tracking updated: ${msnTrackingNumber}`;
  return true;
}

export function refreshTracking(orderId: string): Order | null {
  const order = orders.find((o) => o.id === orderId);
  if (!order) return null;
  order.last_tracking_event = `Synced at ${new Date().toISOString()} — MSN ${order.msn_tracking_number}`;
  return order;
}

export function updateMachine(
  id: string,
  updates: Partial<Pick<Machine, "model_name" | "price" | "hero_image">>
): boolean {
  const m = machines.find((x) => x.id === id);
  if (!m) return false;
  Object.assign(m, updates);
  return true;
}

export function saveEligibilityLead(data: {
  machine_price: number;
  annual_turnover: number;
  down_payment_pct: number;
  tenure_months: number;
  recommended_option_id: string;
}): EligibilityLead {
  const lead: EligibilityLead = {
    id: `el-${Date.now()}`,
    ...data,
    created_at: new Date().toISOString(),
  };
  eligibilityLeads.push(lead);
  return lead;
}

export function getEligibilityLeads() {
  return eligibilityLeads;
}

export function recommendFinanceOption(
  machinePrice: number,
  turnover: number,
  downPct: number
): string {
  if (turnover >= machinePrice * 3) return "f1";
  if (downPct >= 25) return "f2";
  if (machinePrice > 3000000) return "f3";
  return "f4";
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
