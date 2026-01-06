import mammoth from "mammoth";
import WordExtractor from "word-extractor";

/**
 * Parses Resume files (PDF, DOCX, DOC) into clean text.
 * MUST be run in a Node.js environment (Server Action or API Route).
 */
export async function parseResume(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.toLowerCase();
  const fileType = file.type;

  // 1. PDF Parsing
 // 1. PDF Parsing
 // 1. PDF Parsing
  if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
    try {
      // Using require bypasses the "Module not found" TypeScript error 
      // and handles the CommonJS export correctly.
      const pdfParse = require("pdf-parse");
      
      const data = await pdfParse(buffer);
      return cleanText(data.text);
    } catch (error) {
      console.error("PDF Parsing Error:", error);
      throw new Error("Failed to extract text from PDF.");
    }
  }

  // 2. DOCX Parsing (Modern Word)
  if (
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx")
  ) {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return cleanText(result.value);
    } catch (error) {
      console.error("DOCX Parsing Error:", error);
      throw new Error("Failed to extract text from DOCX.");
    }
  }

  // 3. DOC Parsing (Legacy Word 97-2003)
  if (
    fileType === "application/msword" || 
    fileName.endsWith(".doc")
  ) {
    try {
      const extractor = new WordExtractor();
      const extracted = await extractor.extract(buffer);
      return cleanText(extracted.getBody());
    } catch (error) {
      console.error("DOC Parsing Error:", error);
      throw new Error("Failed to extract text from legacy DOC file.");
    }
  }

  throw new Error("Unsupported file format. Please upload PDF, DOCX, or DOC.");
}

/**
 * Cleans extracted text to remove excessive whitespace and normalize line breaks.
 */
function cleanText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")       // Normalize line endings
    .replace(/\n{3,}/g, "\n\n")  // Keep max 2 consecutive newlines to preserve paragraphs
    .replace(/[^\S\r\n]+/g, " ") // Replace multiple horizontal spaces with a single space
    .trim();
}