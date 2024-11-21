import { Schema, model, models } from "mongoose";

interface IImage {
  url: string; // הקישור לתמונה המאוחסנת
  createdAt: Date; // תאריך העלאת התמונה
}

const ImageSchema = new Schema<IImage>({
  
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = models.Image || model<IImage>("Image", ImageSchema);

export default Image;
