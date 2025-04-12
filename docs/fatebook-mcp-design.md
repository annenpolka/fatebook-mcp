# Fatebook MCPサーバー設計計画

## 1. 全体構成・ファイル分割方針

- **エントリーポイント**
  - `src/server.ts`（または`main.ts`）：サーバー起動・トランスポート選択・初期化処理
- **主要クラス/モジュール**
  - `McpServer`（@modelcontextprotocol/sdk/server/mcp.js）
  - `StdioServerTransport` / `SSEServerTransport`
  - Fatebook APIクライアント（`src/fatebookApiClient.ts`等）
  - MCPツール/リソース/プロンプト定義（`src/tools/`, `src/resources/`, `src/prompts/`）
  - 型定義・zodスキーマ（`src/schemas/`）
  - ロギング・監視（`src/logger.ts`、`roo-activity-logger`連携）

- **ファイル分割例**
  ```
  src/
    server.ts
    fatebookApiClient.ts
    tools/
      addForecast.ts
      resolveQuestion.ts
      ...
    resources/
      getQuestions.ts
      ...
    prompts/
      reviewPrompt.ts
      ...
    schemas/
      toolSchemas.ts
      resourceSchemas.ts
    logger.ts
  roo-logs/
    activity/
      roo-activity-YYYY-MM-DD.json
  ```

## 2. サーバー起動・トランスポート設計

- **stdio/HTTP+SSE両対応**
  - コマンドライン引数や環境変数でトランスポート種別を切替
  - stdio: CLIツール・ローカル統合向け
  - HTTP+SSE: リモート/マルチクライアント対応
- **Mermaid図（起動フロー）**
  ```mermaid
  flowchart TD
    A[起動: server.ts] --> B{トランスポート選択}
    B -- stdio --> C[StdioServerTransport]
    B -- HTTP+SSE --> D[SSEServerTransport + Express]
    C & D --> E[McpServer.connect(transport)]
    E --> F[リソース/ツール/プロンプト登録]
    F --> G[リクエスト受信・処理]
  ```

## 3. resources/tools/prompts設計・型定義・zod活用

- **resources**: FatebookのGET系APIをMCPリソースとして公開
- **tools**: POST/PUT/DELETE系APIや副作用を伴う操作をMCPツールとして実装
- **prompts**: LLM向けの対話テンプレートを定義
- **型定義**: zodで厳密なバリデーション・スキーマ管理
- **設計例**
  ```typescript
  // tools/addForecast.ts
  import { z } from "zod";
  export const addForecastTool = {
    name: "addForecast",
    schema: z.object({
      questionId: z.string(),
      probability: z.number().min(0).max(1),
      comment: z.string().optional()
    }),
    handler: async ({ questionId, probability, comment }) => {
      // Fatebook API呼び出し
    }
  };
  ```

## 4. Fatebook API連携設計

- **APIクライアント**: 認証・リクエスト共通化・レスポンス/エラー標準化
- **MCPツール/リソース化**: 各APIエンドポイントをMCPのtool/resourceとして公開
- **認証**: APIキー等は環境変数/安全なストレージで管理
- **エラー処理**: Fatebook APIのエラーをMCP標準エラー形式（JSON-RPC 2.0 error）にマッピング
- **レスポンス整形**: MCPのcontent/contents形式に変換
- **設計例**
  ```typescript
  // src/fatebookApiClient.ts
  export async function callFatebookApi(endpoint, params) {
    // fetch + 認証 + エラーハンドリング
    // エラー時は { code, message, data } 形式でthrow
  }
  ```

## 5. ロギング・監視・テスト・セキュリティ設計

- **ロギング**: roo-activity-loggerで全操作を記録（意図・文脈・スタックトレース含む）
- **監視**: プロトコルイベント・APIエラー・パフォーマンスを記録
- **テスト**: ユニット/結合/負荷テスト（Jest等）、異常系・境界値も網羅
- **セキュリティ**: 入力バリデーション（zod）、認証情報の秘匿、DoS対策、TLS（HTTP時）

## 6. コミット・運用ルール

- **コミットメッセージ**: gitmoji + Conventional Commits（例: `:sparkles: feat(tool): addForecastツール追加`）
- **roo-logs/履歴管理**: activityログも必ずコミット対象
- **運用**: 仕様変更時はドキュメント・実装・テストを同時更新

## 7. ファイル構成例

```
fatebook-mcp/
  src/
    server.ts
    fatebookApiClient.ts
    tools/
      addForecast.ts
      resolveQuestion.ts
    resources/
      getQuestions.ts
    prompts/
      reviewPrompt.ts
    schemas/
      toolSchemas.ts
      resourceSchemas.ts
    logger.ts
  roo-logs/
    activity/
      roo-activity-2025-04-12.json
  .roo/
    rules/
      rules.md
  README.md
  package.json
  tsconfig.json