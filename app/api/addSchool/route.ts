import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const contact = formData.get("contact") as string;
    const email = formData.get("email_id") as string;
    const imageFile = formData.get("image") as File | null;

    let imagePath: string | null = null;

    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Vercel Blob
      const { url } = await put(`schoolImages/${Date.now()}-${imageFile.name}`, buffer, {
        access: "public",
      });

      imagePath = url; // ✅ Save URL in DB instead of local path
    }

    const db = await connectToDatabase();
    await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email, imagePath]
    );

    return NextResponse.json({ success: true, message: "School added successfully!" });
  } catch (error) {
    console.error("Error in /api/addSchool:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
