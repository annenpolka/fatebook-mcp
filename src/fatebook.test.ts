// src/fatebook.test.ts

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { formatQuestions } from "./fatebook.ts";
import type { Question } from "./types/internal.ts";

Deno.test("formatQuestions formats questions correctly", () => {
  const questions: Question[] = [
    {
      id: "q1",
      createdAt: "2025-04-15T00:00:00Z",
      comment: null,
      profileId: null,
      title: "Will it rain tomorrow?",
      type: "BINARY",
      resolveBy: "2025-04-16T00:00:00Z",
      resolved: false,
      pingedForResolution: false,
      resolution: null,
      resolvedAt: null,
      notes: null,
      hideForecastsUntil: null,
      hideForecastsUntilPrediction: false,
      userId: "u1",
      sharedPublicly: true,
      unlisted: false,
      exclusiveAnswers: false,
      forecasts: [],
      options: [],
      user: {
        id: "u1",
        name: "Alice",
        createdAt: "2025-01-01T00:00:00Z",
        image: null,
      },
      sharedWith: [],
      sharedWithLists: [],
      questionMessages: [],
      comments: [],
      tags: [],
      uniqueForecasterCount: 1,
    },
    {
      id: "q2",
      createdAt: "2025-04-10T00:00:00Z",
      comment: null,
      profileId: null,
      title: "Will the stock market go up this week?",
      type: "BINARY",
      resolveBy: "2025-04-17T00:00:00Z",
      resolved: true,
      pingedForResolution: false,
      resolution: "YES",
      resolvedAt: "2025-04-12T00:00:00Z",
      notes: null,
      hideForecastsUntil: null,
      hideForecastsUntilPrediction: false,
      userId: "u2",
      sharedPublicly: false,
      unlisted: false,
      exclusiveAnswers: false,
      forecasts: [],
      options: [],
      user: {
        id: "u2",
        name: "Bob",
        createdAt: "2025-01-02T00:00:00Z",
        image: null,
      },
      sharedWith: [],
      sharedWithLists: [],
      questionMessages: [],
      comments: [],
      tags: [],
      uniqueForecasterCount: 2,
    },
  ];

  const result = formatQuestions(questions);
  assertEquals(result, [
    "[…] Will it rain tomorrow? (Deadline: 2025-04-16T00:00:00Z, id: q1)",
    "[✔] Will the stock market go up this week? (Deadline: 2025-04-17T00:00:00Z, id: q2)",
  ]);
});