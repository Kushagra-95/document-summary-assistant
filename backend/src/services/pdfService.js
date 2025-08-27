import fs from "fs";
import path from "path";
import pdfParse from 'pdf-parse/lib/pdf-parse.js'


export async function extractPDF(filePath) {
  const absolutePath = path.resolve(filePath);  
  console.log("Reading PDF from:", absolutePath); 
  const dataBuffer = fs.readFileSync(absolutePath);
  const pdfData = await pdfParse(dataBuffer);
  return pdfData.text;
}
