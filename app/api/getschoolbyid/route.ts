import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const db = await connectToDatabase();
    const [rows] = await db.execute(
      "SELECT id, name, address, city, image FROM schools WHERE id = ?",
      [id]
    );

    return NextResponse.json(rows || null);
  } catch (error) {
    console.error("Error fetching school:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
