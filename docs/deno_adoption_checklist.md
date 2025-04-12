# Deno採用検討チェックリスト・技術調査観点

## 1. 言語・開発体験
- TypeScript/JS/JSXをネイティブサポート（設定不要）
- Web標準APIをサーバーサイドで実装、将来性・移植性が高い
- コードリント・フォーマッタ・テストランナー・アサーションが標準搭載
- スタンドアロン実行ファイルの生成・クロスコンパイル対応
- Node.js互換レイヤーあり（npmパッケージ利用可）

## 2. MCPサーバー実装との親和性
- TypeScriptによる型安全なMCPサーバー実装が可能
- HTTP/HTTPS, WebSocket, HTTP2, SSE通信を標準サポート
- stdio通信はDeno.runやDeno.Commandで実現可能（要追加調査）
- npm経由で既存のMCP SDKやOpenAPIクライアントも利用可能

## 3. Fatebook API連携
- fetch APIがWeb標準で利用可能
- HTTPS通信・APIキー管理・JSONパースも標準対応
- セキュリティ（TLS/認証/DoS対策）はDenoの権限管理で強化可能

## 4. セキュリティ・運用
- デフォルトでファイル/ネットワーク/環境変数アクセス不可（明示的許可が必要）
- サプライチェーン攻撃対策・権限管理が容易
- Deno Deploy（サーバーレス/グローバル分散）やDocker対応

## 5. テスト・CI/CD
- deno testによるユニット/結合テスト
- deno lint/deno fmtで品質維持
- GitHub Actions等CI/CD連携も容易

## 6. ドキュメント・コミュニティ
- 公式ドキュメント・APIリファレンスが充実
- Fresh（PreactベースWebフレームワーク）などエコシステムも拡大中
- Node.js資産もnpm:で活用可能

## 7. 懸念点・追加調査事項
- stdioベースのMCPサーバー実装事例・サンプルの有無
- 一部Node.js依存パッケージの動作互換性
- MCP SDK(TypeScript/Python)のDeno対応状況
- Deno Deployでの長時間接続・SSE等の制約

---

本チェックリストをもとに、Deno採用の可否・技術的リスク・追加調査ポイントを整理し、MCPサーバー開発方針を決定すること。