import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newProduct = await client.create({
      _type: "product",
      ...body,
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 });
  }
}
