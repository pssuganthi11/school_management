import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.execute(
      "SELECT id, name, address, city, image FROM schools ORDER BY id DESC"
    );

    return NextResponse.json(JSON.parse(JSON.stringify(rows))); // ✅ ensures plain array
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json([], { status: 200 }); // ✅ return [] instead of crashing
  }
}
