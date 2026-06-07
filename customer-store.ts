import fs from "fs";
import path from "path";

export interface DynamicCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  machineModel: string;
  machineDetails: string;
  lcCopy: string;
  shiftCopy: string;
  deliveryAddress: string;
  paymentDetails: string;
  bankName: string;
  rtgsNo: string;
  passkey: string;
  status: "pending" | "active";
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "dynamic-customers.json");

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE))
    fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

export function readCustomers(): DynamicCustomer[] {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as DynamicCustomer[];
  } catch {
    return [];
  }
}

function writeCustomers(list: DynamicCustomer[]) {
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
}

export function generatePasskey(): string {
  const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length: 8 },
    () => charset[Math.floor(Math.random() * charset.length)]
  ).join("");
}

export function createDynamicCustomer(
  data: Omit<DynamicCustomer, "id" | "passkey" | "createdAt" | "status">
): DynamicCustomer {
  const list = readCustomers();
  const passkey = generatePasskey();
  const customer: DynamicCustomer = {
    ...data,
    id: `cust-${Date.now()}`,
    passkey,
    status: "active",
    createdAt: new Date().toISOString(),
  };
  list.push(customer);
  writeCustomers(list);
  return customer;
}

export function createSignupRequest(
  data: Pick<DynamicCustomer, "name" | "email" | "phone" | "company">
): DynamicCustomer {
  const list = readCustomers();
  const customer: DynamicCustomer = {
    ...data,
    id: `req-${Date.now()}`,
    machineModel: "",
    machineDetails: "",
    lcCopy: "",
    shiftCopy: "",
    deliveryAddress: "",
    paymentDetails: "",
    bankName: "",
    rtgsNo: "",
    passkey: "",
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  list.push(customer);
  writeCustomers(list);
  return customer;
}

export function findCustomerByEmail(email: string): DynamicCustomer | null {
  const list = readCustomers();
  return (
    list.find(
      (c) =>
        c.email.toLowerCase() === email.toLowerCase() &&
        c.status === "active"
    ) ?? null
  );
}

export function deleteCustomer(id: string): boolean {
  const list = readCustomers();
  const filtered = list.filter((c) => c.id !== id);
  if (filtered.length === list.length) return false;
  writeCustomers(filtered);
  return true;
}
