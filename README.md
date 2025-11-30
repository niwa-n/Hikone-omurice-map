# Project README

## TODO
* 追加機能
* システム要件

## 追加機能
* Nodataページに遷移してから戻るとカードの進捗が戻ってしまっているので、URLパラメータでCurrentIndexを保持し、最初のカードに戻らないようにする

## システム要件
* ステージング環境とサービス環境の構築

  * push → GitHub Actions によりステージング環境で自動テスト
  * テスト完了後、開発者が OK ボタンを押すとサービス環境に push
  * GitHub Pages 側が検知して反映
* Firebase を用いた DB 接続実装
* GCP プロジェクト作成
* 各種 Google API の連携 <= Google Map API
* Google トラッキング導入（ユーザーアクション収集）<= GA4
* BigQuery への分析用データエクスポート
* IaC（Terraform）によるクラウド運用自動化