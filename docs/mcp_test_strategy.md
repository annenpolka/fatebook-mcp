# MCP (Model Context Protocol) テスト戦略ガイド

## 1. はじめに

Model Context Protocol (MCP) は、LLMアプリケーションと外部ツール・データソース間の連携を標準化するプロトコルです。堅牢で信頼性の高いMCPサーバーおよびクライアントを開発するためには、包括的なテスト戦略が不可欠です。

本ドキュメントは、MCP公式仕様書 (`llms-full.txt`)、公式サイト (`modelcontextprotocol.io`)、関連ドキュメント (Debugging Guide, Inspector Guide, Tutorials) 等に基づき、MCP開発におけるテスト戦略の主要な側面、考慮事項、推奨ツール、ベストプラクティスを詳細に解説します。

## 2. 主要なテストの種類と目的

MCP開発においては、以下のテストレベルを組み合わせ、品質を確保することが推奨されます。

### 2.1. ユニットテスト (Unit Testing)

-   **目的**: MCPサーバー/クライアントを構成する個々の関数、クラス、モジュールが、仕様通りに正しく動作することを検証します。
-   **対象例**:
    -   リクエスト/レスポンス/通知/エラーメッセージのシリアライズ/デシリアライズ処理
    -   JSON-RPC 2.0 メッセージ形式のバリデーション
    -   型定義・スキーマのバリデーションロジック
    -   標準エラーコードおよびカスタムエラーコードの処理
    -   リソース・ツール・プロンプトの内部管理ロジック
-   **利点**: 問題箇所を早期に特定でき、修正コストを低減できます。リファクタリング時のデグレッション防止にも有効です。

### 2.2. 結合テスト (Integration Testing)

-   **目的**: 複数のコンポーネント（例: MCPクライアントとサーバー、サーバー内の複数モジュール）が連携して正しく動作することを検証します。
-   **対象例**:
    -   Stdio および HTTP+SSE トランスポート層での実際の通信確立・メッセージ交換
    -   クライアントからのツール呼び出しリクエストに対するサーバーの応答
    -   サーバーからのリソース更新通知に対するクライアントの処理
    -   初期化 (`initialize`, `initialized`) シーケンスの検証
    -   エラー発生時のコンポーネント間でのエラー伝播
-   **利点**: コンポーネント間のインターフェースや通信プロトコルの問題を検出できます。

### 2.3. E2E (End-to-End) テスト

-   **目的**: 実際のMCPクライアントアプリケーション (例: Claude Desktop, VS Code) と開発中のMCPサーバーを接続し、ユーザー視点での完全な通信フローが仕様通りに動作することを検証します。
-   **対象例**:
    -   クライアントUIからのリソース選択・プロンプト実行・ツール利用
    -   サーバー起動から終了までの完全なライフサイクル
    -   正常系だけでなく、異常系シナリオ（タイムアウト、不正な入力、サーバー停止等）
    -   複数クライアントからの同時接続（該当する場合）
-   **利点**: システム全体の動作を保証し、ユーザー体験に近い形での問題を検出できます。

### 2.4. プロトコル準拠テスト (Protocol Compliance Testing)

-   **目的**: 実装されたMCPクライアント/サーバーが、MCP仕様 (JSON-RPC 2.0形式、必須メソッド、エラーコード体系、型定義等) に厳密に準拠していることを自動的に検証します。
-   **現状**: MCP公式ロードマップ (`llms-full.txt` の Validation セクション) によると、「Compliance Test Suites」の開発が計画されており、将来的にはこれを利用した自動検証が推奨されます。
-   **利点**: プロトコルレベルでの相互運用性を確保し、エコシステム全体の安定性に貢献します。

### 2.5. パフォーマンステスト (Performance Testing)

-   **目的**: 高負荷状態におけるMCPサーバー/クライアントの応答性、スループット、リソース消費量 (CPU, メモリ)、安定性を測定・評価します。
-   **対象例**:
    -   多数のクライアントからの同時接続
    -   大量のリクエスト/通知の処理
    -   大きなリソースデータの送受信
    -   長時間稼働時のパフォーマンス劣化
-   **利点**: スケーラビリティの問題やボトルネックを特定し、本番環境での安定稼働を保証します。

### 2.6. セキュリティテスト (Security Testing)

-   **目的**: MCPサーバー/クライアントにおける潜在的な脆弱性を特定し、悪意のある攻撃に対する耐性を検証します。
-   **対象例**:
    -   不正な入力値に対するバリデーション (入力サニタイズ)
    -   認証・認可メカニズム (必要な場合)
    -   リソースアクセス制御
    -   DoS (Denial of Service) 攻撃耐性 (レートリミット等)
    -   機密情報 (APIキー等) の安全な管理・ログからの除外
    -   Transport Layer Security (TLS) の適切な利用 (HTTP+SSEの場合)
-   **利点**: データ漏洩、不正アクセス、サービス停止等のセキュリティリスクを低減します。

## 3. テスト戦略上の考慮事項

効果的なテスト戦略を立てる上で、以下の点を考慮する必要があります。

-   **通信方式 (Transport) の違い**: Stdio と HTTP+SSE の両方のトランスポートで動作検証を行う必要があります。特にエラーハンドリングや接続管理の挙動が異なる可能性があるため注意が必要です。(参照: `llms-full.txt` - Core architecture / Transport layer)
-   **エラーハンドリング**: 標準エラーコード (-32700 ~ -32600) およびカスタムエラーコードが、仕様通りにクライアント/サーバー間で正しく伝播・処理されることを検証します。エラー発生時のリソースクリーンアップも重要です。(参照: `llms-full.txt` - Error handling, Debugging Guide - Best practices / Error Handling)
-   **非同期処理**: MCPは本質的に非同期通信です。リクエスト/レスポンスのタイムアウト処理、長時間かかる処理に対する進捗通知 (`progress token`) の利用と検証、並行処理時の競合状態などを考慮する必要があります。
-   **型安全とスキーマバリデーション**: TypeScriptやPythonの型ヒントを活用し、送受信されるメッセージのパラメータが定義されたスキーマに準拠していることを厳密に検証します。不正な型や不足パラメータに対するエラー処理もテスト対象です。(参照: `llms-full.txt` - Implementation example, Best practices / Message validation)
-   **動的な登録と発見**: サーバーが提供するリソース、ツール、プロンプトは動的に変化する可能性があります。クライアントがこれらの変更を正しく検知し、UI等に反映できるかをテストします。
-   **セキュリティ**: 特に公開サーバーや機密情報を扱うサーバーの場合、認証・認可、入力検証、アクセス制御、レートリミット等のセキュリティ対策とそのテストが不可欠です。(参照: `llms-full.txt` - Security considerations, Debugging Guide - Best practices / Security considerations)
-   **ロギング**: デバッグや問題解決のために、プロトコルイベント、メッセージ交換、エラー発生、パフォーマンス指標などを適切にログ記録する仕組みとその内容をテストします。構造化ログが推奨されます。(参照: Debugging Guide - Implementing logging, Best practices / Logging strategy)
-   **状態管理**: サーバー/クライアントは接続状態やセッション情報を管理する必要があります。接続・切断・再接続時の状態遷移や、複数セッション間の分離などをテストします。

## 4. 推奨テストツール・フレームワーク

MCP開発で利用できる、または推奨されるテストツールやフレームワークは以下の通りです。

-   **MCP Inspector**:
    -   MCP公式が提供するインタラクティブなデバッグ・テストツール (`npx @mcp/inspector`)。
    -   サーバーへの直接接続 (Stdio/SSE)、リソース/プロンプト/ツールの個別テスト、メッセージ交換の監視、エラー応答の確認などが可能。
    -   開発初期段階での基本的な動作確認や、反復的なテストサイクルでの利用が強く推奨されます。(参照: Inspector Guide)
-   **Claude Desktop Developer Tools**:
    -   Claude Desktop アプリケーションに組み込まれた開発者ツール。
    -   実際のクライアントとの統合テスト、詳細なログ (接続イベント、エラー、メッセージ交換) の収集、Chrome DevTools を利用したクライアントサイドのデバッグ (Console/Networkパネル) が可能です。(参照: Debugging Guide - Debugging in Claude Desktop)
-   **公式SDKのテスト機能**:
    -   **TypeScript SDK (`@modelcontextprotocol/sdk`)**: テスト用のユーティリティやモック実装が含まれている可能性があります (詳細はSDKドキュメント参照)。
    -   **Python SDK (`mcp-sdk`)**: 同様にテスト支援機能が含まれている可能性があります (詳細はSDKドキュメント参照)。
-   **一般的なテストフレームワーク**:
    -   **ユニットテスト/結合テスト**:
        -   Python: `pytest`, `unittest`
        -   TypeScript/JavaScript: `Jest`, `Mocha`, `Vitest`
    -   **E2Eテスト**:
        -   UI操作を含む場合: `Playwright`, `Selenium`, `Cypress`
        -   APIレベル: 上記フレームワークや `requests` (Python), `axios` (JS) 等と組み合わせて利用
-   **負荷テストツール**: `Locust`, `k6`, `JMeter` など
-   **セキュリティテストツール**: `OWASP ZAP`, `Burp Suite` など
-   **Compliance Test Suites (将来)**: MCP公式が開発中のプロトコル準拠テストスイート。リリースされれば、標準的な準拠性検証ツールとなることが期待されます。(参照: `llms-full.txt` - Roadmap / Validation)

## 5. ベストプラクティス

高品質なMCPサーバー/クライアントを開発・維持するためのベストプラクティスは以下の通りです。

-   **反復的なテストサイクル**:
    1.  **初期開発**: MCP Inspector を用いて基本的な接続・機能を確認。
    2.  **サーバー修正**: コード変更後、サーバーを再ビルド。
    3.  **再テスト**: Inspector で変更箇所と関連機能を再テスト。メッセージ交換やエラー応答を監視。
    4.  **エッジケース/異常系テスト**: 不正な入力、必須パラメータ欠損、同時実行、タイムアウト等を Inspector でテスト。
    5.  **統合テスト**: Claude Desktop 等の実際のクライアントと接続し、E2Eシナリオをテスト。
    6.  **フィードバック反映**: テスト結果や実際の利用からのフィードバックに基づき、修正と再テストを繰り返す。(参照: Inspector Guide - Best practices / Development workflow, Tutorials - Working with Claude, Next steps)
-   **包括的なログ戦略**:
    -   **構造化ログ**: JSON形式等、解析しやすい形式でログを出力。
    -   **十分なコンテキスト**: タイムスタンプ、リクエストID、セッションID、関連するパラメータ等を含める。
    -   **ログレベル**: DEBUG, INFO, WARN, ERROR 等を適切に使い分ける。
    -   **記録対象**: プロトコルイベント (接続/切断)、メッセージ送受信、ツール実行、リソースアクセス、エラー発生 (スタックトレース含む)、パフォーマンス指標 (処理時間、レイテンシ)。(参照: Debugging Guide - Best practices / Logging strategy)
-   **網羅的なテストカバレッジ**:
    -   正常系だけでなく、異常系、境界値、エッジケースを意識的にテストする。
    -   Stdio と HTTP+SSE の両方のトランスポートでテストを実施する。
-   **セキュリティ意識**:
    -   入力値は常に検証・サニタイズする。
    -   機密情報 (APIキー等) をログに出力しない。
    -   認証・認可、アクセス制御を適切に実装・テストする。
    -   依存ライブラリの脆弱性にも注意する。(参照: `llms-full.txt` - Security considerations, Tutorials - Best practices)
-   **仕様準拠**:
    -   MCP仕様書 (`llms-full.txt`) を常に参照し、プロトコルに準拠した実装を心がける。
    -   将来的に Compliance Test Suites が利用可能になれば、積極的に活用する。
-   **ドキュメント化**:
    -   テストケース、テスト手順、テスト結果を記録・共有する。
    -   コード内のコメントやREADMEで、テストに関する情報を記述する。(参照: Tutorials - Best practices)
-   **LLMの活用**:
    -   Claude等のLLMにMCPドキュメントやSDKのREADMEを提供し、サーバー/クライアントのコード生成、テストコード生成、エッジケースの洗い出し、デバッグの補助を依頼する。(参照: Tutorials)
-   **コミュニティとの連携**:
    -   GitHub Discussions 等で他の開発者と情報交換し、テストに関する知見や課題を共有する。(参照: Contributing)

## 6. 参考文献

-   **MCP Official Website**: [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)
-   **MCP Full Specification (llms-full.txt)**: [https://modelcontextprotocol.io/llms-full.txt](https://modelcontextprotocol.io/llms-full.txt)
-   **Debugging Guide**: [https://modelcontextprotocol.io/docs/tools/debugging](https://modelcontextprotocol.io/docs/tools/debugging)
-   **MCP Inspector Guide**: [https://modelcontextprotocol.io/docs/tools/inspector](https://modelcontextprotocol.io/docs/tools/inspector)
-   **Building MCP with LLMs Tutorial**: [https://modelcontextprotocol.io/tutorials/building-mcp-with-llms](https://modelcontextprotocol.io/tutorials/building-mcp-with-llms)


## 7. Denoテスト記法・方針（プロジェクト標準）

- Denoの標準テストAPI（Deno.test, assert, assertEquals, assertRejects等）を最大限活用する。
- 正常系・異常系（例: 不正APIキー時のUnauthorized等）は明確に分離し、個別のテストケースとして記述する。
- 例外発生の検証にはtry-catchよりassertRejects等のアサーションAPIを優先する。
- API通信を伴うintegration testは、.envでAPIキーを管理し、src/xxx.integration.test.ts等の別ファイルで管理する。
- テストは可読性・堅牢性を重視し、テスト名・アサート内容を明示的に記述する。
- テストの追加・修正時はこの方針に従い、テストカバレッジと品質を維持すること。

-   **GitHub Organization (Discussions, SDKs, Inspector)**: [https://github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)