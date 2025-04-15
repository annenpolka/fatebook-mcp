// src/fatebook.ts

import { GetQuestionsResponse } from "./types/internal.ts";

/**
 * Fetches the list of questions from the Fatebook API.
 * @param apiKey Fatebook API key
 * @returns The questions response
 */
export async function fetchQuestions(apiKey: string): Promise<GetQuestionsResponse> {
  const url = `https://fatebook.io/api/v0/getQuestions?apiKey=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url);
  if (!res.ok) {
    let errorBody = "";
    try {
      errorBody = await res.text();
    } catch {
      errorBody = "(failed to read error body)";
    }
    throw new Error(`Failed to fetch questions: ${res.status} ${res.statusText} - ${errorBody}`);
  }
  const data = await res.json();
  // Type assertion (should use zod or similar for production)
  return data as GetQuestionsResponse;
}

/**
 * Formats the list of questions for display.
 * @param questions Array of questions
 * @returns Array of formatted strings
 */
export function formatQuestions(questions: GetQuestionsResponse["items"]): string[] {
  return questions.map(q =>
    `[${q.resolved ? "✔" : "…"}] ${q.title} (Deadline: ${q.resolveBy}, id: ${q.id})`
  );
}