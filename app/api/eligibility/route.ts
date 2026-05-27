import { NextResponse } from "next/server";
import {
  getFinancingOptions,
  recommendFinanceOption,
  saveEligibilityLead,
} from "@/lib/data";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    machine_price,
    annual_turnover,
    down_payment_pct,
    tenure_months,
  } = body;

  if (!machine_price || !annual_turnover) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const recommended_option_id = recommendFinanceOption(
    Number(machine_price),
    Number(annual_turnover),
    Number(down_payment_pct ?? 25)
  );

  const lead = saveEligibilityLead({
    machine_price: Number(machine_price),
    annual_turnover: Number(annual_turnover),
    down_payment_pct: Number(down_payment_pct ?? 25),
    tenure_months: Number(tenure_months ?? 60),
    recommended_option_id,
  });

  const options = getFinancingOptions();
  const recommended = options.find((o) => o.id === recommended_option_id);

  return NextResponse.json({
    lead,
    recommended_option: recommended,
    disclaimer:
      "Final eligibility and CIBIL score confirmed by bank offline. This is an estimate only.",
  });
}
