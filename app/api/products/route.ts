import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createProduct } from "@/lib/api";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const product = await createProduct(body, session.accessToken);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);

    return NextResponse.json(
      { detail: "Failed to create product" },
      { status: 500 },
    );
  }
}
