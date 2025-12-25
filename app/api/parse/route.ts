import { NextResponse } from "next/server";
import { parseResume } from "@/lib/resume-parser";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No resume uploaded" },
        { status: 400 }
      );
    }

    const text = await parseResume(file);

    return NextResponse.json({
      success: true,
      text,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}
