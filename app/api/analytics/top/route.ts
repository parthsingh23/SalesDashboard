import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function GET(request: NextRequest) {
  try {
    if (!API_URL) {
      return NextResponse.json(
        { error: "API_URL is not configured" },
        { status: 500 },
      );
    }

    const searchParams = request.nextUrl.searchParams;

    const limit = searchParams.get("limit") ?? "10";

    const startDate = searchParams.get("start_date");

    const endDate = searchParams.get("end_date");

    const params = new URLSearchParams();

    params.set("limit", limit);

    if (startDate) {
      params.set("start_date", startDate);
    }

    if (endDate) {
      params.set("end_date", endDate);
    }

    const response = await fetch(
      `${API_URL}/analytics/top?${params.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Backend request failed" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch top products" },
      { status: 500 },
    );
  }
}
