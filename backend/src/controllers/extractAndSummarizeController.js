import fs from "fs";
import path from "path";
import { extractPDF } from "../services/pdfService.js";
import { extractOCR } from "../services/ocrService.js";
import { summarizeWithGemini } from "../services/geminiService.js";

function safeUnlink(filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (e) {
    console.warn("safeUnlink failed:", e.message);
  }
}


function adjustSummary(summary, lengthPref) {
  const sentences = summary.split(/(?<=[.!?])\s+/);

  if (lengthPref === "short") return sentences.slice(0, 1).join(" ");
  if (lengthPref === "medium") return sentences.slice(0, 3).join(" ");
  if (lengthPref === "long") return sentences.join(" ");

  return summary;
}

export async function extractAndSummarizeController(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = path.resolve(req.file.path);
    const mimeType = req.file.mimetype;

    let extractedText = "";
    if (mimeType === "application/pdf") {
      extractedText = await extractPDF(filePath);
    } else if (["image/png", "image/jpeg", "image/jpg"].includes(mimeType)) {
      extractedText = await extractOCR(filePath);
    } else {
      safeUnlink(filePath);
      return res.status(400).json({ error: "Unsupported file type" });
    }

    const lengthPref = req.body.length || "medium";

    console.log(`Summarizing with Gemini | Length: ${lengthPref}`);

    let summary = await summarizeWithGemini(extractedText, { lengthPref });

    summary = adjustSummary(summary, lengthPref);

    safeUnlink(filePath);

    return res.json({ text: extractedText, summary });
  } catch (err) {
    console.error("extractAndSummarizeController error:", err);
    if (req?.file?.path) safeUnlink(req.file.path);
    return res.status(500).json({
      error: "Failed to extract and summarize",
      details: err.message,
    });
  }
}
