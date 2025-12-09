// src/utils/normalizeText.ts

export function normalizeText(text: string) {
  return text
    .toLowerCase()
    // Normalize common question forms
    .replace(/explain|describe|tell me about|define|give details about/g, "what is")
    .replace(/who is|about/g, "what is")
    .replace(/how many|number of|count of/g, "how many")
    .replace(/projects did|projects are|ongoing projects|research projects/g, "projects")
    .replace(/current projects|active projects/g, "projects")
    .replace(/aims?|objectives?|purpose/g, "aim")
    .replace(/mission statement|goal/g, "mission")
    .replace(/\?/g, "")
    .trim();
}
