import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    const db = await connectToDatabase();

    // Get only needed columns
    const [rows] = await db.execute(
      "SELECT id, name, address, city, image FROM schools ORDER BY id DESC"
    );

    return NextResponse.json(rows); // ✅ return rows directly
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
