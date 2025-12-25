import { STOPWORDS } from "./stopwords";

function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOPWORDS.has(word));
}

export function matchKeywords(resumeText: string, jobText: string) {
  const resumeWords = new Set(normalize(resumeText));
  const jobWords = new Set(normalize(jobText));

  const matched: string[] = [];
  const missing: string[] = [];

  jobWords.forEach(word => {
    if (resumeWords.has(word)) {
      matched.push(word);
    } else {
      missing.push(word);
    }
  });

  const score = Math.round((matched.length / jobWords.size) * 100) || 0;

  return {
    score,
    matched,
    missing,
    total: jobWords.size,
  };
}
