// src/types/fatebook-request.ts
import type { operations } from "./fatebook-api.d.ts";

/**
 * APIキーを含む基本的なリクエスト型
 */
export type BaseRequest = {
  apiKey?: string;
};

/**
 * GET /v0/getQuestions のクエリパラメータ型
 */
export type GetQuestionsRequestQuery =
  operations["question-getQuestionsApiProcedure"]["parameters"]["query"];

/**
 * POST /v0/resolveQuestion のリクエストボディ型
 */
export type ResolveQuestionRequestBody =
  operations["question-resolveQuestion"]["requestBody"]["content"]["application/json"];

/**
 * PATCH /v0/setSharedPublicly のリクエストボディ型
 */
export type SetSharedPubliclyRequestBody =
  operations["question-setSharedPublicly"]["requestBody"]["content"]["application/json"];

/**
 * POST /v0/addForecast のリクエストボディ型
 */
export type AddForecastRequestBody =
  operations["question-addForecast"]["requestBody"]["content"]["application/json"];

/**
 * POST /v0/addComment のリクエストボディ型
 */
export type AddCommentRequestBody =
  operations["question-addComment"]["requestBody"]["content"]["application/json"];

/**
 * DELETE /v0/deleteQuestion のクエリパラメータ型
 */
export type DeleteQuestionRequestQuery =
  operations["question-deleteQuestion"]["parameters"]["query"];

/**
 * PATCH /v0/editQuestion のリクエストボディ型
 */
export type EditQuestionRequestBody =
  operations["question-editQuestion"]["requestBody"]["content"]["application/json"];

/**
 * GET /v0/countForecasts のクエリパラメータ型
 */
export type CountForecastsRequestQuery =
  operations["countForecasts"]["parameters"]["query"];