// src/fatebook.integration.test.ts

import { fetchQuestions } from "./fatebook.ts";
import {
  assert,
  assertRejects,
} from "https://deno.land/std@0.224.0/assert/mod.ts";
import "https://deno.land/std@0.224.0/dotenv/load.ts";

Deno.test("fetchQuestions integration test (real API call, no Bad Request)", async () => {
  const apiKey = Deno.env.get("FATEBOOK_API_KEY");
  if (!apiKey) {
    throw new Error("FATEBOOK_API_KEY is not set in environment (.env file)");
  }
  const res = await fetchQuestions(apiKey);
  assert(Array.isArray(res.items), "items should be an array");
  if (res.items.length > 0) {
    const q = res.items[0];
    assert(typeof q.id === "string", "id should be string");
    assert(typeof q.title === "string", "title should be string");
    assert(typeof q.resolved === "boolean", "resolved should be boolean");
  }
});

Deno.test("fetchQuestions returns Bad Request with invalid API key", async () => {
  await assertRejects(
    async () => {
      await fetchQuestions("invalid_api_key");
    },
    Error,
    "Unauthorized"
  );
});