import Tesseract from "tesseract.js";
import fs from "fs";

export async function extractOCR(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File not found: " + filePath);
  }

  console.log("🔍 Running OCR on:", filePath);

  try {
    const { data: { text } } = await Tesseract.recognize(filePath, "eng", {
      logger: m => console.log("OCR progress:", m), 
    });

    const cleaned = text.replace(/\s+/g, " ").trim();
    console.log("✅ OCR extracted length:", cleaned.length);
    return cleaned;
  } catch (err) {
    console.error("OCR error:", err);
    throw err;
  }
}
