# Denoを使ったMCPサーバー先行事例調査・比較まとめ

本ドキュメントは、Denoランタイムを用いたModel Context Protocol (MCP) サーバーの先行事例に関する調査結果と比較、および開発への活用指針をまとめたものです。

---

## 1. 先行事例の詳細

### 1.1. Deno MCP Server テンプレートリポジトリ（mcp.so/server/deno-mcp-server）
- **概要**: 公式ポータル的な位置付け。Deno向けMCPサーバーのエコシステム拡大のハブ。
- **現状**: Deno専用テンプレート本体やREADMEへの直接リンクは見当たらず（2025年4月時点）。
- **評価**: 実装詳細は他事例参照が必要。

### 1.2. Playwright連携Deno2 MCPサーバー実装例（github.com/jakedahn/deno2-playwright-mcp-server）
- **技術スタック**: Deno 2, Playwright
- **特徴**:
    - MCP経由でLLMからブラウザ自動操作（スクリーンショット、JS実行等）を提供。
    - Puppeteer MCPサーバーを参考に設計。Claude等から利用可能。
    - Denoのバイナリ化・依存レス実行・クロスプラットフォーム性を活用。
- **MCP実装**: コア要件（JSON-RPC 2.0、ツール/リソース提供、型安全バリデーション等）を満たす。
- **評価**: 実用性・拡張性が高く、Deno×MCPサーバーの現実的な応用例。

### 1.3. @phughesmcr/deno-mcp-template（jsr.io/@phughesmcr/deno-mcp-template）
- **現状**: 404 Not Found（2025年4月時点）。パッケージ消失・URL変更・非公開化等の可能性あり。
- **評価**: Deno用MCPサーバーテンプレートの公式流通は現状確認できず。今後の動向に注意。

### 1.4. ResearchMCP（Deno+Brave Search連携MCPサーバー、mcp.so/server/ResearchMCP/riii111）
- **技術スタック**: Deno, Brave Search API, Claude API (オプション)
- **特徴**:
    - リサーチ特化型。MCPとBrave Search APIを組み合わせ、LLMからの情報検索・要約・分析を実現。
    - Claude API連携による検索結果の要約・分析もサポート。
    - ローカル/コンテナ両対応、セットアップ容易、拡張性あり。
- **評価**: リサーチ用途の設計・運用パターンとして有用。

### 1.5. MCP公式のDenoサーバー事例リスト（modelcontextprotocol.io/examples）
- **概要**: 公式サイトの事例集。
- **Deno関連**: Deno専用テンプレートは明示されていないが、TypeScriptベースの公式サーバー（Puppeteer, Brave Search, Fetch等）はDeno互換性が高い。
- **評価**: 公式・コミュニティ実装例の設計思想・API設計・運用パターン・拡張性は多様で、Deno環境での応用も十分可能。MCPサーバー開発のリファレンス多数。

---

## 2. 総合知見・比較

- **Denoの利点**:
    - バイナリ配布によるデプロイ容易性。
    - 依存関係管理の簡潔さ（`deno.json(c)`）。
    - TypeScriptのネイティブサポートと既存資産の活用。
    - クロスプラットフォーム性。
- **MCPプロトコル実装**:
    - JSON-RPC 2.0準拠が基本。
    - ツール/リソース提供、型安全バリデーション（Zod等）、エラー/進捗通知、ロギング等の要件を満たす設計が主流。
- **API/ツール内容**:
    - ブラウザ自動化（Playwright/Puppeteer）。
    - Web検索（Brave Search）。
    - ファイルシステムアクセス、データベース連携、クラウドサービス連携など、用途に応じて多様。
- **設計思想**:
    - 拡張性、保守性、運用性、セキュリティ、型安全性を重視。
    - 公式事例はテストコードやドキュメントも充実している傾向。
- **運用/拡張性**:
    - Dockerコンテナ化、バイナリ配布、ローカル/クラウド両対応など、実運用を意識した設計が多い。
    - モジュール化や設定ファイルによるカスタマイズ性。
- **参考パターン**:
    - 公式Puppeteer MCPサーバーやResearchMCPの設計（API分割、エラーハンドリング、型バリデーション等）はDeno実装でも有効。
- **注意点**:
    - Deno専用のMCPサーバーテンプレートの流通は限定的。
    - 既存のNode.js/TypeScript資産をDenoに移植する際の互換性（特にNode.js固有APIへの依存）。
    - Denoエコシステムのライブラリ・ツールの成熟度や選択肢。

---

## 3. Fatebook MCPサーバー開発への活用指針

1.  **リファレンス選定**:
    *   公式TypeScriptサーバー実装例（Puppeteer, Brave Search, Fetch等）を主要なリファレンスとし、Deno環境での動作確認や移植を検討する。
    *   Playwright連携例（jakedahn/deno2-playwright-mcp-server）やResearchMCPの設計・運用パターン（特にAPI連携、エラー処理、設定管理）を参考にする。
2.  **MCPプロトコル準拠**:
    *   MCP仕様（JSON-RPC 2.0、メッセージ型、ライフサイクル、エラーコード等）を厳密に実装する。
    *   型安全なスキーマバリデーション（例: Zod）を導入し、入力・出力の整合性を保証する。
    *   適切なエラーハンドリングと進捗通知（progress token）を実装する。
    *   詳細なロギング機構を組み込む（roo-activity-logger連携も考慮）。
3.  **Denoの特性活用**:
    *   DenoのネイティブTypeScriptサポートを最大限活用する。
    *   `deno compile`によるシングルバイナリ化を検討し、デプロイと配布の容易性を高める。
    *   Deno標準ライブラリや信頼できるサードパーティモジュールを活用する。
    *   パーミッション管理 (`--allow-*`) を適切に行い、セキュリティを確保する。
4.  **Fatebook API連携**:
    *   Fatebook API仕様（openapi.json）に基づき、各エンドポイントに対応するMCPツール/リソースを設計・実装する。
    *   APIキー等の認証情報は環境変数等で安全に管理する。
    *   APIエラーレスポンスをMCP標準エラー形式にマッピングする。
5.  **開発プラクティス**:
    *   ユニットテスト、結合テストを記述し、品質を担保する (`Deno.test`)。
    *   コードフォーマット (`deno fmt`)、リンティング (`deno lint`) を徹底する。
    *   ドキュメント（README、API仕様、設計メモ等）を整備する。
    *   コミットメッセージ規約（gitmoji + Conventional Commits）を遵守する。
6.  **継続的調査**:
    *   Deno本体、MCPプロトコル、Fatebook API、関連ライブラリの最新動向を継続的にウォッチし、必要に応じて追従する。
    *   Deno用MCPサーバーテンプレートや関連ツールの登場に注意する。

---

以上