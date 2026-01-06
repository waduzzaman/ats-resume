// export const STOPWORDS = new Set([
//   "the", "and", "a", "an", "to", "of", "in", "for", "on", "with",
//   "is", "are", "was", "were", "be", "as", "by", "that", "this",
//   "from", "or", "at", "it", "your", "you", "we", "our",
// ]);


export const STOPWORDS = new Set([
  // Basic English (Your original list)
  "the", "and", "a", "an", "to", "of", "in", "for", "on", "with",
  "is", "are", "was", "were", "be", "as", "by", "that", "this",
  "from", "or", "at", "it", "your", "you", "we", "our",

  // Pronouns & Possessives
  "i", "me", "my", "mine", "their", "them", "they", "its",

  // Common Resume/JD Verbs (High frequency, low value)
  "using", "used", "working", "works", "including", "includes", 
  "responsible", "requirements", "required", "preferred", "duties",
  "must", "will", "can", "should", "plus", "years", "experience",

  // Generic Business "Fluff"
  "excellent", "strong", "written", "verbal", "communication", 
  "skills", "ability", "team", "environment", "fast-paced",
  "highly", "motivated", "successful", "proven", "demonstrated"
]);