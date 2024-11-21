import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/app/api/utils/cloudinary/route";
import connectMongo from "@/app/api/utils/db/route";
import Image from "../schema/image_scema";

export async function POST(req: NextRequest) {
  try {
    // התחברות למסד הנתונים
    await connectMongo();

    // קרא את גוף הבקשה
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json(
        { success: false, message: "No image provided" },
        { status: 400 }
      );
    }

    // העלאת התמונה ל-Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "Images_Next_Project", // תיקיית יעד ב-Cloudinary
    });

    const url = uploadResponse.secure_url;

    const newImage = new Image({
      url,
    });

    await newImage.save();
    console.log(url);

    // החזרת תגובה עם הקישור לתמונה
    return NextResponse.json({ success: true, url }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error uploading image: " + error },
      { status: 500 }
    );
  }
}
