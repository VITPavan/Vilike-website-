import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getMachines, updateMachine } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ machines: getMachines() });
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, model_name, price, hero_image } = await request.json();
  const ok = updateMachine(id, { model_name, price, hero_image });
  if (!ok) return NextResponse.json({ error: "Machine not found" }, { status: 404 });
  return NextResponse.json({ machines: getMachines() });
}
