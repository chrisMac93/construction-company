import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const imageBuffer = Buffer.from(req.body.image, "base64");
    const optimizedImageBuffer = await sharp(imageBuffer)
      .resize(800, 800, { fit: "inside", withoutEnlargement: true }) // Resize the image to fit within 800x800 pixels without enlarging
      .jpeg({ quality: 80 }) // Convert the image to JPEG with a quality of 80
      .toBuffer();

    res.status(200).json({ image: optimizedImageBuffer.toString("base64") });
  } catch (error) {
    res.status(500).json({ message: "Error optimizing image", error: error.message });

  }
}
