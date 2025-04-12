# Fatebook MCPサーバー開発カスタムルール（詳細版）

本プロジェクトは、[https://modelcontextprotocol.io/llms-full.txt](https://modelcontextprotocol.io/llms-full.txt) および [https://fatebook.io/api/openapi.json](https://fatebook.io/api/openapi.json) を根拠とし、[https://fatebook.io/](https://fatebook.io/) のMCPサーバー実装を行う。以下の詳細ルールに従うこと。

---
## docs/配下ドキュメントの役割

- docs/deno_adoption_checklist.md: Deno採用可否・技術調査観点のチェックリスト
- docs/deno_mcp_server_research.md: Denoを用いたMCPサーバー事例・比較・開発指針
- docs/fatebook-mcp-design.md: Fatebook MCPサーバーの設計計画・構成・設計方針
- docs/fatebook_reference.md: Fatebookサービス・APIの概要・連携機能リファレンス
- docs/mcp_test_strategy.md: MCPサーバー開発におけるテスト戦略・ベストプラクティス


## 1. MCPプロトコル準拠

- MCPサーバーは、Model Context Protocol（MCP）のクライアント/サーバーアーキテクチャを厳密に実装すること。
- 通信は stdio または HTTP+SSE トランスポートを用い、全てのメッセージは JSON-RPC 2.0 形式でやり取りする。
- メッセージ型（Request/Result/Error/Notification）を正しく実装し、初期化・終了・エラー処理のライフサイクルを遵守する。
- 型安全なスキーマバリデーションを徹底し、不正な入力や異常系は標準エラーコードで返す。
- 進捗通知や長時間処理には progress token を活用する。
- ロギング・監視・診断機能（プロトコルイベント、エラー、パフォーマンス等）を実装する。
- セキュリティ（TLS、認証、入力検証、リソース制御、DoS対策等）を考慮し、脆弱性を排除する。

## 2. Fatebook API連携

- Fatebook API（[openapi.json](https://fatebook.io/api/openapi.json)）の各エンドポイント仕様に厳密に従い、API連携機能をMCPツール/リソースとして提供すること。
- APIキー等の認証情報は安全に管理し、リクエスト時に必須パラメータを漏れなく付与する。
- エラー時はAPIのエラーレスポンスをMCPの標準エラー形式にマッピングして返却する。
- 主要エンドポイント例：
    - /v0/getQuestions: 質問一覧取得
    - /v0/resolveQuestion: 質問の解決
    - /v0/addForecast: 予測追加
    - /v0/addComment: コメント追加
    - /v0/deleteQuestion: 質問削除
    - /v0/editQuestion: 質問編集
    - /v0/setSharedPublicly: 公開設定変更
    - /v0/countForecasts: 予測数カウント
- API仕様変更時は速やかに追従し、常に最新仕様と整合性を保つ。

## 3. 実装・運用ベストプラクティス

- MCPサーバーの実装例（TypeScript/Python等）を参考に、拡張性・保守性・テスト容易性を重視する。
- ユニットテスト・結合テスト・負荷テストを実施し、異常系・境界値も網羅する。
- MCP仕様・Fatebook API仕様の両方に対し、常にドキュメント・実装・テストの整合性を維持する。
- 追加要件や仕様変更が発生した場合も、上記2リソースとの整合性を最優先とする。
- ルールの改訂や補足が必要な場合は、本ファイルに追記すること。

---
### コミット対象ファイルに関する追加ルール
- roo-logs/配下のログファイルも必ずコミット対象に含めること。運用上、アクティビティログの履歴管理を厳格に行うため。

## 4. コミットメッセージ規約（gitmoji + Conventional Commits）

本プロジェクトでは、コミットメッセージにgitmoji（絵文字）とConventional Commitsの形式（type(scope): subject）を組み合わせて使用する。

### フォーマット

:emoji: type(scope): 説明（日本語で簡潔に）

例：
:bug: fix(api): APIレスポンスのエラーハンドリングを修正

### 主なtype・gitmoji一覧

| 絵文字 | type        | 用途例                | 日本語説明                     |
|--------|-------------|-----------------------|-------------------------------|
| :sparkles: | feat       | 新機能追加            | 新しい機能の追加               |
| :bug:      | fix        | バグ修正              | バグの修正                     |
| :memo:     | docs       | ドキュメント          | ドキュメントの追加・修正       |
| :recycle:  | refactor   | リファクタ            | 挙動変更なしのリファクタ        |
| :lipstick: | style      | スタイル              | フォーマット・見た目のみの変更 |
| :white_check_mark: | test | テスト              | テストコードの追加・修正       |
| :package:  | build      | ビルド                | ビルドシステム/依存の変更      |
| :rocket:   | deploy     | デプロイ              | デプロイ関連の変更             |
| :construction: | wip     | 作業中コミット        | WIP（作業途中）のコミット      |
| :fire:     | remove     | 削除                  | ファイルやコードの削除         |
| :lock:     | security   | セキュリティ          | セキュリティ関連の修正         |
| :art:      | style      | コードスタイル         | コードの体裁・整形             |
| :arrow_up: | upgrade    | 依存アップグレード     | 依存パッケージのアップグレード |
| :arrow_down: | downgrade | 依存ダウングレード     | 依存パッケージのダウングレード |

- scopeは任意。必要に応じて機能名やディレクトリ名等を指定。
- subjectは日本語で簡潔に記述。
- コミット粒度は「1つの目的につき1コミット」を推奨。
- WIPコミットは:construction: wip: ... で明示。

### 参考
- [gitmoji公式](https://gitmoji.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)
