import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const contact = formData.get("contact") as string;
    const email = formData.get("email_id") as string;
    const imageFile = formData.get("image"); // ❌ Do not check with "instanceof File"

    let imagePath: string | null = null;

    // ✅ Handle image if it’s actually a file
    if (imageFile && typeof imageFile === "object" && "arrayBuffer" in imageFile) {
      const bytes = await (imageFile as any).arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/schoolImages");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filename = `${Date.now()}-${(imageFile as any).name}`;
      imagePath = `/schoolImages/${filename}`;
      fs.writeFileSync(path.join(uploadDir, filename), buffer);
    }

    // ✅ Insert into DB
    const db = await connectToDatabase();
    await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email, imagePath]
    );

    return NextResponse.json({ success: true, message: "School added successfully!" });
  } catch (error) {
    console.error("Error in /api/addSchool:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
