import { NextResponse } from "next/server";
import { matchKeywords } from "@/lib/keyword-matcher";

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Missing text input" },
        { status: 400 }
      );
    }

    const result = matchKeywords(resumeText, jobDescription);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Keyword matching failed" },
      { status: 500 }
    );
  }
}
