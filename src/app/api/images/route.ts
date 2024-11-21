import { NextResponse } from "next/server";
import Image from "@/app/api/schema/image_scema";
import connectMongo from "@/app/api/utils/db/route";

export async function GET() {
  try {
    // התחבר למסד הנתונים
    await connectMongo();

    // שלוף את כל התמונות
    const images = await Image.find();

    // החזר את התמונות בפורמט JSON
    return NextResponse.json({ success: true, data: images }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching images: " + error },
      { status: 500 }
    );
  }
}
