import type {
  ClothSample,
  Customer,
  EligibilityLead,
  FinancingOption,
  Machine,
  Order,
  OrderDocument,
  Review,
  Service,
} from "./types";
import { componentHotspots } from "./catalog-copy";

export const DEMO_MSN_TRACKING = "9876543210";

const engineering = [
  { title: "Franke German Wire Bearing", detail: "Lightweight, temperature insensitive, interior elasticity." },
  { title: "German 7075-T6 Cam Box", detail: "High corrosion resistance, lightweight, excellent heat absorption." },
  { title: "Sweden Cams", detail: "Superior quality and extended service life." },
  { title: "Ceramic Feeder", detail: "Excellent appearance finish and long operational life." },
  { title: "Alloy Steel Cylinder", detail: "Lightweight, strong, high heat dissipation." },
  { title: "CE Certified Electrical Kit", detail: "European assured quality for all electrical components." },
];

const HERO = "/images/machine-cutout-labeled.png";
const GALLERY = "/images/machine-gallery-6.png";
const INTERIOR = "/images/machine-interior.png";

const defaultHotspots = componentHotspots;

export const machines: Machine[] = [
  {
    id: "m1",
    slug: "vilike-30x18x60",
    model_name: "VILIKE 30\" × 18GG × 60F",
    category: "Lycra Attachment",
    price: 2850000,
    specs: { dia: 30, gauge: "18", feeders: 60, note: "100% Lycra" },
    images: [HERO, GALLERY, INTERIOR],
    hero_image: HERO,
    delivery_days: 30,
    featured: true,
    prominent_customer: "Anugragha Spinning Mills",
    engineering,
    hotspots: defaultHotspots,
  },
  {
    id: "m2",
    slug: "vilike-32x18x64",
    model_name: "VILIKE 32\" × 18GG × 64F",
    category: "Lycra Attachment",
    price: 2980000,
    specs: { dia: 32, gauge: "18", feeders: 64 },
    images: [GALLERY, HERO],
    hero_image: GALLERY,
    delivery_days: 30,
    featured: true,
    prominent_customer: null,
    engineering,
    hotspots: defaultHotspots,
  },
  {
    id: "m3",
    slug: "vilike-36x18x72",
    model_name: "VILIKE 36\" × 18GG × 72F",
    category: "Lycra Attachment",
    price: 3250000,
    specs: { dia: 36, gauge: "18", feeders: 72 },
    images: [HERO, "/images/machine-gallery-4.png"],
    hero_image: HERO,
    delivery_days: 30,
    featured: false,
    prominent_customer: "Anugragha Spinning Mills",
    engineering,
    hotspots: defaultHotspots,
  },
  {
    id: "m4",
    slug: "vilike-40x18x80",
    model_name: "VILIKE 40\" × 18GG × 80F",
    category: "RIB Machine",
    price: 3580000,
    specs: { dia: 40, gauge: "18", feeders: 80, note: "2F RIB" },
    images: [HERO, INTERIOR],
    hero_image: HERO,
    delivery_days: 35,
    featured: false,
    prominent_customer: null,
    engineering,
    hotspots: defaultHotspots,
  },
  {
    id: "m5",
    slug: "jersey-30x24x90",
    model_name: "Jersey 30\" × 24/28GG × 90F",
    category: "Single Jersey",
    price: 3100000,
    specs: { dia: 30, gauge: "24/28", feeders: 90 },
    images: [GALLERY, HERO],
    hero_image: GALLERY,
    delivery_days: 30,
    featured: true,
    prominent_customer: null,
    engineering,
    hotspots: defaultHotspots,
  },
  {
    id: "m6",
    slug: "vilike-34x18x68",
    model_name: "VILIKE 34\" × 18GG × 68F",
    category: "Lycra Attachment",
    price: 3120000,
    specs: { dia: 34, gauge: "18", feeders: 68 },
    images: [HERO, "/images/machine-gallery-4.png"],
    hero_image: HERO,
    delivery_days: 30,
    featured: false,
    prominent_customer: null,
    engineering,
    hotspots: defaultHotspots,
  },
  {
    id: "m7",
    slug: "vilike-38x18x76",
    model_name: "VILIKE 38\" × 18GG × 76F",
    category: "Lycra Attachment",
    price: 3420000,
    specs: { dia: 38, gauge: "18", feeders: 76 },
    images: [HERO, INTERIOR],
    hero_image: HERO,
    delivery_days: 30,
    featured: false,
    prominent_customer: null,
    engineering,
    hotspots: defaultHotspots,
  },
  {
    id: "m8",
    slug: "vilike-44x18x88",
    model_name: "VILIKE 44\" × 18GG × 88F",
    category: "Lycra Attachment",
    price: 3850000,
    specs: { dia: 44, gauge: "18", feeders: 88 },
    images: [GALLERY, HERO],
    hero_image: GALLERY,
    delivery_days: 30,
    featured: false,
    prominent_customer: null,
    engineering,
    hotspots: defaultHotspots,
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    machine_id: "m1",
    company_name: "Anugragha Spinning Mills",
    customer_name: "Mr. Rajesh Kumar",
    review_text: "Excellent stitch quality and stable high-speed production. VILIKE FAB TECH support in Tirupur is outstanding.",
    rating: 5,
    featured: true,
  },
  {
    id: "r2",
    machine_id: "m1",
    company_name: "SKM Knits",
    customer_name: "Director",
    review_text: "Smooth installation and training. German components make a visible difference in fabric hand-feel.",
    rating: 5,
    featured: false,
  },
  {
    id: "r3",
    machine_id: "m3",
    company_name: "Anugragha Spinning Mills",
    customer_name: "Production Head",
    review_text: "Our second VILIKE machine — delivery tracking from Xiamen to Chennai was transparent throughout.",
    rating: 5,
    featured: true,
  },
  {
    id: "r4",
    machine_id: "m5",
    company_name: "Eurotex Garments",
    customer_name: "Purchase Manager",
    review_text: "Competitive finance options helped us expand capacity without blocking working capital.",
    rating: 4,
    featured: false,
  },
];

export const clothSamples: ClothSample[] = [
  { id: "c1", name: "Single Jersey Cotton", image_url: INTERIOR, machine_id: "m5", description: "Soft hand-feel single jersey wound on take-up — ideal for export T-shirts and basics." },
  { id: "c2", name: "Lycra Blend Fabric", image_url: HERO, machine_id: "m1", description: "100% Lycra attachment sample with excellent stretch recovery and surface clarity." },
  { id: "c3", name: "RIB Structure Sample", image_url: GALLERY, machine_id: "m4", description: "RIB 2F structure for premium innerwear and cuff applications." },
];

export const financingOptions: FinancingOption[] = [
  { id: "f1", title: "Unsecured Business Loan", description: "Competitive interest vs nationalised banks. Minimal documentation for established units.", min_down_pct: 20, max_tenure_months: 60, interest_range: "10.5% – 12.5%", partner_bank: "Partner NBFC" },
  { id: "f2", title: "Secured Term Loan", description: "Machine hypothecation with flexible EMI structuring.", min_down_pct: 25, max_tenure_months: 84, interest_range: "9.5% – 11.5%", partner_bank: "Co-operative / Nationalised Bank" },
  { id: "f3", title: "LC / Import Finance", description: "For Xiamen factory orders — LC-backed import with duty planning support.", min_down_pct: 30, max_tenure_months: 12, interest_range: "As per bank LC terms", partner_bank: "Import Finance Desk" },
  { id: "f4", title: "MSME / Subsidy Linked", description: "Guidance on eligible state and central schemes for textile machinery.", min_down_pct: 15, max_tenure_months: 60, interest_range: "Subsidised / variable", partner_bank: "MSME Cell" },
];

export const services: Service[] = [
  { id: "s1", type: "crane", title: "Crane & Rigging Service", description: "Port unloading at Chennai and factory placement with certified crane operators.", contact_phone: "8190908383" },
  { id: "s2", type: "installation", title: "Installation & Commissioning", description: "Leveling, power checklist, trial run, and operator training at your mill.", contact_phone: "8190905353" },
  { id: "s3", type: "amc", title: "AMC & Spare Parts", description: "Annual maintenance contracts and genuine Vilike spare parts from Tirupur.", contact_phone: "8190906363" },
];

export const customers: Customer[] = [
  { id: "cust1", profile_id: "p1", full_name: "Demo Customer", company: "Anugragha Spinning Mills", phone: "9876543210", email: "customer@demo.com" },
];

const trackingEvents = [
  { status: "under_production", location: "Xiamen, China", timestamp: "2026-01-15T08:00:00Z", description: "Machine assembly completed at Vilike factory" },
  { status: "shipped_from_xiamen", location: "Xiamen Port", timestamp: "2026-02-01T10:00:00Z", description: "Container loaded — handed to MSN Logistics" },
  { status: "in_transit", location: "Indian Ocean", timestamp: "2026-02-20T14:00:00Z", description: "Vessel in transit — MSN ref active" },
  { status: "in_chennai_port", location: "Chennai Port", timestamp: "2026-03-10T06:00:00Z", description: "Arrived Chennai port — customs processing" },
];

export const orderDocuments: OrderDocument[] = [
  { id: "d1", order_id: "o1", label: "LC Copy", file_url: "#" },
  { id: "d2", order_id: "o1", label: "GST Invoice", file_url: "#" },
  { id: "d3", order_id: "o1", label: "Bank Sanction Letter", file_url: "#" },
  { id: "d4", order_id: "o1", label: "Bill of Lading (MSN)", file_url: "#" },
];

export const eligibilityLeads: EligibilityLead[] = [];

export const orders: Order[] = [
  {
    id: "o1",
    customer_id: "cust1",
    machine_id: "m1",
    status: "in_chennai_port",
    amount_paid: 1500000,
    total_amount: 2850000,
    delivery_address: "Anugragha Spinning Mills, SIDCO, Tirupur - 641 602",
    warranty_until: "2028-03-15",
    duty_amount: 185000,
    gst_paid: 342000,
    lc_reference: "LC-2026-VLK-001",
    banking_notes: "HDFC Tirupur — Term loan sanctioned. Disbursement on port clearance.",
    finance_bank: "HDFC Bank",
    finance_option: "Secured Term Loan",
    emi_months: 60,
    origin_port: "Xiamen",
    msn_tracking_number: DEMO_MSN_TRACKING,
    vessel_name: "MSC PACIFIC",
    eta_chennai: "2026-03-12",
    last_tracking_event: "Arrived Chennai port — customs processing",
    tracking_events: trackingEvents,
    crane_required: true,
    crane_notes: "20T crane booked for mill delivery after customs.",
    created_at: "2025-12-01T00:00:00Z",
  },
];

export const DEMO_USERS = {
  admin: { email: "admin@vilikefab.com", password: "demo123", role: "admin" as const, name: "Admin (Dad)" },
  customer: { email: "customer@demo.com", password: "demo123", role: "customer" as const, name: "Demo Customer", customerId: "cust1" },
};
