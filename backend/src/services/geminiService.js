import dotenv from "dotenv";

import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in .env");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);


const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export async function summarizeWithGemini(text, { lengthPref = "medium" } = {}) {
  if (!text || !text.trim()) return "";

  const lengthHints = {
    short: "Give a very brief summary in 1-2 sentences.",
    medium: "Give a concise summary in about 3-4 sentences.",
    long: "Give a detailed summary in 6-8 sentences or more.",
  };

  const prompt = `
You are a document summarizer.
Summarize the following content. ${lengthHints[lengthPref] || lengthHints.medium}

Content:
${text}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
