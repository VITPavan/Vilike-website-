import { NextResponse } from "next/server";
import { createSignupRequest } from "@/lib/customer-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Create signup request (stored as pending customer)
    const signupRequest = createSignupRequest({
      name,
      email,
      phone: phone || "",
      company: company || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Signup request submitted successfully",
        requestId: signupRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An error occurred during signup" },
      { status: 500 }
    );
  }
}
