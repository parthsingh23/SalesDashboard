import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { updateProduct } from "@/lib/api";

export async function PUT(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json(
      { detail: "Unauthorized" },
      { status: 401 },
    );
  }

  const { id } = await context.params;
  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    return NextResponse.json(
      { detail: "Invalid product ID" },
      { status: 400 },
    );
  }

  try {
    const body = await request.json();

    const product = await updateProduct(
      productId,
      body,
      session.accessToken,
    );

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to update product:", error);

    return NextResponse.json(
      {
        detail:
          error instanceof Error
            ? error.message
            : "Failed to update product",
      },
      { status: 500 },
    );
  }
}