import mammoth from "mammoth";

export async function parseResume(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  // ✅ PDF parsing (dynamic import – App Router safe)
  if (file.type === "application/pdf") {
    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(buffer);
    return cleanText(data.text);
  }

  // ✅ DOCX parsing
  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return cleanText(result.value);
  }

  throw new Error("Unsupported file format");
}

function cleanText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .replace(/[^\S\r\n]+/g, " ")
    .trim();
}
