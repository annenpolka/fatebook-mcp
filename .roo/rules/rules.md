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

### コミット対象ファイルに関する追加ルール
- roo-logs/配下のログファイルも必ずコミット対象に含めること。運用上、アクティビティログの履歴管理を厳格に行うため。

### 参考
- [gitmoji公式](https://gitmoji.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)

---
## 5. TypeScriptコーディングプラクティス

本プロジェクトでは、TypeScriptによる実装において以下のプラクティスを遵守する。

### 5.1. 関数型アプローチの原則

- **純粋関数を優先**: 同じ入力に対して常に同じ出力を返し、副作用を持たない関数を基本とする。
- **不変データ構造の使用**: データの変更ではなく、新しいデータを返す方式を採用。`readonly`修飾子を積極的に活用。
- **副作用の分離**: IO操作や外部サービス呼び出しなどの副作用は、純粋なビジネスロジックから明確に分離する。
- **型安全性の確保**: コンパイル時の型チェックを最大限活用し、実行時エラーを減らす。

### 5.2. 型定義と実装パターン

#### 型定義

```typescript
// ブランデッド型で型安全性を確保
type Branded<T, B> = T & { _brand: B };
type Money = Branded<number, "Money">;
type Email = Branded<string, "Email">;

// 作成関数はバリデーション付き
function createMoney(amount: number): Result<Money, Error> {
  if (amount < 0) return err(new Error("負の金額不可"));
  return ok(amount as Money);
}
```

#### Result型によるエラーハンドリング

```typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

// 使用例
function divide(a: number, b: number): Result<number, Error> {
  if (b === 0) return { ok: false, error: new Error("0での除算は不可") };
  return { ok: true, value: a / b };
}
```

#### アダプターパターン

外部依存を抽象化し、テスト容易性を高める。

```typescript
// インターフェース定義
type Fetcher = <T>(path: string) => Promise<Result<T, ApiError>>;

// 実装
function createFetcher(headers: Record<string, string>): Fetcher {
  return async <T>(path: string) => {
    try {
      const response = await fetch(path, { headers });
      if (!response.ok) {
        return { ok: false, error: { type: "network", message: `HTTP error: ${response.status}` } };
      }
      return { ok: true, value: await response.json() };
    } catch (error) {
      return {
        ok: false,
        error: {
          type: "network",
          message: error instanceof Error ? error.message : "Unknown error"
        }
      };
    }
  };
}
```

### 5.3. 実装手順

1. **型設計から始める**
   - まず型を定義し、ドメインの言語を型で表現する
   - 型の関係性を明確にする

2. **純粋関数から実装**
   - 外部依存のない関数を先に実装する
   - テストを先に書く（TDD）

3. **副作用を分離**
   - IO操作は関数の境界に押し出す
   - 副作用を持つ処理をPromiseでラップする

4. **アダプター実装**
   - 外部サービスやDBへのアクセスを抽象化
   - テスト用モックを用意

### 5.4. コードスタイル

- **関数優先**: クラスは必要な場合のみ使用し、関数と不変データを基本とする
- **不変更新パターン**: オブジェクトやコレクションの更新は、元のデータを変更せず新しいインスタンスを生成
- **早期リターン**: 条件分岐は早期リターンでフラット化し、ネストを避ける
- **エラーとユースケースの列挙型定義**: 発生しうるエラーやユースケースを明示的に型として定義

```typescript
// 良い例：早期リターンによるフラットな条件分岐
function validateUser(user: User): Result<User, ValidationError> {
  if (!user.email) {
    return { ok: false, error: { type: "required", field: "email" } };
  }

  if (!user.name) {
    return { ok: false, error: { type: "required", field: "name" } };
  }

  if (user.age < 18) {
    return { ok: false, error: { type: "minValue", field: "age", min: 18 } };
  }

  return { ok: true, value: user };
}
```

### 5.5. テスト戦略
#### Denoテスト記法・運用方針（プロジェクト標準）
- Denoの標準テストAPI（Deno.test, assert, assertEquals, assertRejects等）を最大限活用すること。
- 正常系・異常系（例: 不正APIキー時のUnauthorized等）は明確に分離し、個別のテストケースとして記述する。
- 例外発生の検証にはtry-catchよりassertRejects等のアサーションAPIを優先する。
- API通信を伴うintegration testは、.envでAPIキーを管理し、src/xxx.integration.test.ts等の別ファイルで管理する。
- テストは可読性・堅牢性を重視し、テスト名・アサート内容を明示的に記述すること。
- テストの追加・修正時はこの方針に従い、テストカバレッジと品質を維持すること。


- **純粋関数の単体テストを優先**: 副作用のない関数は簡単にテスト可能
- **インメモリ実装によるリポジトリテスト**: データアクセス層は実装を差し替え可能に
- **テスト可能性を設計に組み込む**: テストしやすいコードが良いコード
- **アサートファースト**: 期待結果から逆算してテストを設計

```typescript
// テスト例
import { expect } from "@std/expect";
import { test } from "@std/testing/bdd";

test("数値を正常に除算できる", () => {
  const result = divide(10, 2);
  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.value).toBe(5);
  }
});

test("0で除算するとエラーを返す", () => {
  const result = divide(10, 0);
  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error.message).toBe("0での除算は不可");
  }
});
```

### 5.6. Denoの使い方

#### npm互換モード

```typescript
// Node.js互換APIの使用
import path from "node:path";
import { z } from "npm:zod";

// deno.json での依存定義
// "imports": {
//   "zod": "npm:zod@^3.24.2"
// }

// 使用方法
import { z } from "zod";
```

#### モジュール構成例

```
<module-name>/
  # インターフェース
  mod.ts
  deno.jsonc

  # 実装と単体テスト
  internal/
    *.ts
    *.test.ts

  # mod.tsのインテグレーションテスト
  test/*.ts

  # 使用例
  examples/*.ts
```

#### mod.tsでの型定義と再エクスポート

```typescript
/**
 * @module モジュールの説明
 */

/**
 * 型定義
 */
export type Point = {
  readonly x: number;
  readonly y: number;
};

// 内部実装を再エクスポート
export { distance } from "./internal/distance.ts";
```

#### テストの書き方

```typescript
import { expect } from "@std/expect";
import { test } from "@std/testing/bdd";

test("2+3=5", () => {
  expect(add(2, 3), "数値の合計").toBe(5);
});
```

### 5.7. 実装の選択基準

1. **関数を選ぶ場合**
   - 単純な操作のみ
   - 内部状態が不要
   - 依存が少ない
   - テストが容易

2. **classを選ぶ場合**
   - 内部状態の管理が必要
   - 設定やリソースの保持が必要
   - メソッド間で状態を共有
   - ライフサイクル管理が必要

3. **Adapterを選ぶ場合**
   - 外部依存の抽象化
   - テスト時のモック化が必要
   - 実装の詳細を隠蔽したい
   - 差し替え可能性を確保したい
