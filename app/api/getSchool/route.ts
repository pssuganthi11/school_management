import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    const db = await connectToDatabase();

    const [rows] = await db.execute(
      "SELECT id, name, address, city, image FROM schools ORDER BY id DESC"
    );

    // ✅ Convert RowDataPacket[] into plain objects
    const schools = JSON.parse(JSON.stringify(rows));

    return NextResponse.json(schools);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
