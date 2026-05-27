import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  getDocumentsForOrder,
  getMachines,
  getOrdersForCustomer,
  formatINR,
} from "@/lib/data";
import { machines as allMachines } from "@/lib/demo-data";
import OrderTracker from "@/components/OrderTracker";
import ShipmentTracker from "@/components/ShipmentTracker";
import FinanceCalc from "@/components/FinanceCalc";
import OrderDocuments from "@/components/OrderDocuments";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session || session.role !== "customer") redirect("/login");

  const orders = getOrdersForCustomer(session.customerId || "cust1");
  const order = orders[0];
  const machine = order ? allMachines.find((m) => m.id === order.machine_id) : null;
  const documents = order ? getDocumentsForOrder(order.id) : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Welcome, {session.name}</h1>
      <p className="text-vilike-muted">Your booked machine & shipment details</p>

      {order && machine ? (
        <>
          <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">{machine.model_name}</h2>
            <OrderTracker status={order.status} />
          </section>

          <section className="mt-8">
            <ShipmentTracker order={order} />
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 p-5">
              <h3 className="font-bold text-vilike-accent">Payments</h3>
              <p className="mt-2">Total: {formatINR(order.total_amount)}</p>
              <p className="text-green-400">Paid: {formatINR(order.amount_paid)}</p>
              <p className="text-amber-400">
                Outstanding: {formatINR(order.total_amount - order.amount_paid)}
              </p>
              <p className="mt-2 text-sm text-vilike-muted">
                Finance: {order.finance_option} · {order.finance_bank} · {order.emi_months} mo EMI
              </p>
            </div>
            <div className="rounded-xl border border-white/10 p-5">
              <h3 className="font-bold text-vilike-accent">Order Details</h3>
              <ul className="mt-2 space-y-1 text-sm text-vilike-muted">
                <li>LC Ref: {order.lc_reference}</li>
                <li>GST Paid: {formatINR(order.gst_paid)}</li>
                <li>Customs Duty: {formatINR(order.duty_amount)}</li>
                <li>Warranty until: {order.warranty_until}</li>
                <li>Delivery: {order.delivery_address}</li>
                <li>Banking: {order.banking_notes}</li>
              </ul>
            </div>
          </section>

          <section className="mt-8">
            <OrderDocuments documents={documents} />
          </section>

          {order.crane_required && (
            <p className="mt-4 rounded-lg bg-vilike-gold/10 p-3 text-sm text-vilike-gold">
              Crane service: {order.crane_notes}
            </p>
          )}
        </>
      ) : (
        <p className="mt-8 text-vilike-muted">No active orders. Contact VILIKE FAB TECH for a quote.</p>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-bold">Finance Calculator</h2>
        <div className="mt-4">
          <FinanceCalc defaultPrice={machine?.price ?? 2850000} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Browse Models</h2>
        <ul className="mt-4 space-y-2">
          {getMachines().map((m) => (
            <li key={m.id}>
              <a href={`/machines/${m.slug}`} className="text-vilike-accent hover:underline">
                {m.model_name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
