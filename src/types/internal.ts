/**
 * このファイルは Fatebook API のレスポンスに基づいて手動で作成された内部型定義です。
 * src/types/fatebook-api.d.ts は OpenAPI から自動生成されるため、
 * レスポンスの詳細な型定義はこちらに記述します。
 *
 * 関数型アプローチを意識し、type と readonly を使用しています。
 */

export type User = {
  readonly id: string;
  readonly name: string | null;
  readonly createdAt: string; // ISO 8601 date string
  readonly image: string | null;
};

export type Forecast = {
  readonly id: number;
  readonly createdAt: string; // ISO 8601 date string
  readonly comment: string | null;
  readonly forecast: string; // APIレスポンスでは数値文字列だが、numberに変換して使うべきか検討
  readonly profileId: number | null;
  readonly questionId: string;
  readonly optionId: string | null;
  readonly userId: string;
  readonly user: User;
};

export type Option = {
  // APIレスポンスには含まれていなかったが、存在しうる
  readonly id: string;
  readonly name: string;
  readonly questionId: string;
};

export type Message = {
  readonly id: number;
  readonly ts: string; // Slack timestamp?
  readonly channel: string;
  readonly teamId: string;
};

export type QuestionMessage = {
  readonly id: number;
  readonly questionId: string;
  readonly detailsId: number;
  readonly updatedAt: string; // ISO 8601 date string
  readonly message: Message;
};

export type Comment = {
  readonly id: number;
  readonly createdAt: string; // ISO 8601 date string
  readonly comment: string;
  readonly questionId: string;
  readonly userId: string;
  readonly user: User;
};

export type Tag = {
  readonly id: string;
  readonly createdAt: string; // ISO 8601 date string
  readonly name: string;
  readonly userId: string;
};

export type Question = {
  readonly id: string;
  readonly createdAt: string; // ISO 8601 date string
  readonly comment: string | null; // Question作成時のコメント？ Forecastのcommentとは別
  readonly profileId: number | null;
  readonly title: string;
  readonly type: "BINARY" | "MULTIPLE_CHOICE"; // 他のタイプもあるかもしれない
  readonly resolveBy: string; // ISO 8601 date string
  readonly resolved: boolean;
  readonly pingedForResolution: boolean;
  readonly resolution: "YES" | "NO" | "AMBIGUOUS" | "OTHER" | string | null; // MULTIPLE_CHOICEの場合はOption IDなど？
  readonly resolvedAt: string | null; // ISO 8601 date string
  readonly notes: string | null;
  readonly hideForecastsUntil: string | null; // ISO 8601 date string
  readonly hideForecastsUntilPrediction: boolean;
  readonly userId: string;
  readonly sharedPublicly: boolean;
  readonly unlisted: boolean;
  readonly exclusiveAnswers: boolean; // MULTIPLE_CHOICE用？
  readonly forecasts: readonly Forecast[]; // 配列も readonly に
  readonly options: readonly Option[]; // 配列も readonly に
  readonly user: User;
  readonly sharedWith: readonly unknown[]; // 型不明、配列も readonly に
  readonly sharedWithLists: readonly unknown[]; // 型不明、配列も readonly に
  readonly questionMessages: readonly QuestionMessage[]; // 配列も readonly に
  readonly comments: readonly Comment[]; // 配列も readonly に
  readonly tags: readonly Tag[]; // 配列も readonly に
  readonly uniqueForecasterCount: number;
};

export type GetQuestionsResponse = {
  readonly items: readonly Question[]; // 配列も readonly に
};

// 他のAPIエンドポイントのレスポンス型も必要に応じてここに追加する
// 例:
// export type ResolveQuestionResponse = { ... };
// export type AddForecastResponse = { ... };