export type UserRole = "customer" | "admin";

export type OrderStatus =
  | "inquiry"
  | "confirmed"
  | "under_production"
  | "shipped_from_xiamen"
  | "in_transit"
  | "in_chennai_port"
  | "customs_clearance"
  | "delivered";

export interface Hotspot {
  id: string;
  label: string;
  x: number;
  y: number;
  zoomImage: string;
  description: string;
}

export interface Machine {
  id: string;
  slug: string;
  model_name: string;
  category: string;
  price: number;
  specs: { dia: number; gauge: string; feeders: number; note?: string };
  images: string[];
  hero_image: string;
  delivery_days: number;
  featured: boolean;
  prominent_customer: string | null;
  engineering: { title: string; detail: string }[];
  hotspots: Hotspot[];
}

export interface Review {
  id: string;
  machine_id: string;
  company_name: string;
  customer_name: string;
  review_text: string;
  rating: number;
  featured: boolean;
}

export interface ClothSample {
  id: string;
  name: string;
  image_url: string;
  machine_id: string | null;
  description: string;
}

export interface FinancingOption {
  id: string;
  title: string;
  description: string;
  min_down_pct: number;
  max_tenure_months: number;
  interest_range: string;
  partner_bank: string;
}

export interface Service {
  id: string;
  type: string;
  title: string;
  description: string;
  contact_phone: string;
}

export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

export interface Order {
  id: string;
  customer_id: string;
  machine_id: string;
  status: OrderStatus;
  amount_paid: number;
  total_amount: number;
  delivery_address: string;
  warranty_until: string;
  duty_amount: number;
  gst_paid: number;
  lc_reference: string;
  banking_notes: string;
  finance_bank: string;
  finance_option: string;
  emi_months: number;
  origin_port: string;
  msn_tracking_number: string;
  vessel_name: string;
  eta_chennai: string;
  last_tracking_event: string;
  tracking_events: TrackingEvent[];
  crane_required: boolean;
  crane_notes: string;
  created_at: string;
}

export interface Customer {
  id: string;
  profile_id: string;
  full_name: string;
  company: string;
  phone: string;
  email: string;
}

export interface OrderDocument {
  id: string;
  order_id: string;
  label: string;
  file_url: string;
}

export interface EligibilityLead {
  id: string;
  machine_price: number;
  annual_turnover: number;
  down_payment_pct: number;
  tenure_months: number;
  recommended_option_id: string;
  created_at: string;
}

export interface SessionUser {
  email: string;
  role: UserRole;
  customerId?: string;
  name: string;
}
