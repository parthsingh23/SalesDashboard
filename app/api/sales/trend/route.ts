import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://sales-analytics-api-parth.onrender.com";

export async function GET(request: NextRequest) {
    const granularity = request.nextUrl.searchParams.get("granularity");

    if (
        granularity !== "daily" &&
        granularity !== "weekly" &&
        granularity !== "monthly" &&
        granularity !== "yearly"
    ) {
        return NextResponse.json(
            { error: "Invalid granularity" },
            { status: 400 }
        );
    }

    try {
        const response = await fetch(
            `${API_URL}/analytics/sales/trend?granularity=${granularity}`
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: `Backend returned ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: "Failed to contact analytics API" },
            { status: 500 }
        );
    }
}