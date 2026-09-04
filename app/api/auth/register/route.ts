import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(request: NextRequest) {
  try {
    if (!API_URL) {
      return NextResponse.json(
        { error: "API_URL is not configured" },
        { status: 500 },
      );
    }

    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const params = new URLSearchParams();
    params.set("email", email);
    params.set("password", password);

    const response = await fetch(
      `${API_URL}/auth/register?${params.toString()}`,
      {
        method: "POST",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.detail || "Registration failed" },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to connect to backend" },
      { status: 500 },
    );
  }
}
