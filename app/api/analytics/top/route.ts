import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://sales-analytics-api-parth.onrender.com";

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get("limit") ?? "10";

  const numericLimit = Number(limit);

  if (
    !Number.isInteger(numericLimit) ||
    numericLimit < 1 ||
    numericLimit > 100
  ) {
    return NextResponse.json(
      {
        error: "Limit must be an integer between 1 and 100.",
      },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `${API_URL}/analytics/top?limit=${numericLimit}`,
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Backend returned ${response.status}`,
        },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {
        error: "Failed to contact analytics API.",
      },
      { status: 500 },
    );
  }
}
