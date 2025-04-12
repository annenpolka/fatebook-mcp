# Fatebook サービス参考ドキュメント

## 概要

Fatebookは、個人やチームが「未来の出来事」について予測を記録・共有・評価できるオンライン予測プラットフォームです。ユーザーは自分や他者の予測を可視化し、予測精度（キャリブレーション）を高めるための学習や分析も行えます。

## 主な特徴・機能

- **予測の作成・管理**: 未来の出来事や問いに対して確率予測を記録し、解決時に正誤を評価。
- **公開予測/非公開予測**: 予測をパブリックに共有したり、限定公開・非公開で管理可能。
- **コメント・議論**: 各予測にコメントを付与し、他ユーザーと議論できる。
- **タグ付け・分類**: 予測にタグを付けて整理・検索が容易。
- **インポート/エクスポート**: PredictionBookやスプレッドシートからのインポート、全予測データのエクスポートに対応。
- **API連携**: Fatebook APIを利用して外部アプリやBot、MCPサーバー等と連携可能。
- **拡張機能**: Chrome拡張、Slack/Discord連携、Webサイト埋め込み、Beeminder連携など多彩なインテグレーション。
- **学習リソース**: キャリブレーショントレーニング、過去予測再現（Pastcasting）、推定ゲーム、Anki連携など学習支援も充実。

## 代表的な連携・拡張

- [Fatebook for Chrome](https://fatebook.io/extension)
- [Fatebook for Slack](https://fatebook.io/for-slack)
- [Fatebook for Discord](https://fatebook.io/for-discord)
- [Fatebook API](https://fatebook.io/api-setup)
- [Webサイト埋め込み](https://fatebook.io/embed)
- [Beeminder連携](https://fatebook.io/beeminder)

## Fatebook API概要

- [APIセットアップガイド](https://fatebook.io/api-setup) 参照
- 主要エンドポイント例（/api/openapi.jsonで仕様公開）:
    - /v0/getQuestions: 質問一覧取得
    - /v0/resolveQuestion: 質問の解決
    - /v0/addForecast: 予測追加
    - /v0/addComment: コメント追加
    - /v0/deleteQuestion: 質問削除
    - /v0/editQuestion: 質問編集
    - /v0/setSharedPublicly: 公開設定変更
    - /v0/countForecasts: 予測数カウント
- APIキーによる認証が必要

## 学習・リソース

- [キャリブレーショントレーニング](https://www.quantifiedintuitions.org/calibration)
- [Pastcasting](https://www.quantifiedintuitions.org/pastcasting)
- [The Estimation Game](https://www.quantifiedintuitions.org/estimation-game)
- [Anki with Uncertainty](https://www.quantifiedintuitions.org/anki-with-uncertainty)
- [Predict your year](https://fatebook.io/predict-your-year)

## 参考リンク

- [Fatebook公式サイト](https://fatebook.io/)
- [Fatebook APIセットアップ](https://fatebook.io/api-setup)
- [Fatebook公開予測一覧](https://fatebook.io/public)
- [Fatebookブログ](https://fatebook.io/blog)
- [Fatebookについて](https://fatebook.io/about)