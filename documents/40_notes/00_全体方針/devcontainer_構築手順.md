# Dev Container 構築手順（ステップ別）

## 0. 目的
「Dev Container を初めて触ってみた」発表向けに、構築（準備〜初回起動まで）の流れを整理する。

## 1. 事前準備
### 1-1. 必要なソフトのインストール
- Docker Desktop（または Docker Engine）
- VS Code
- VS Code 拡張機能: Dev Containers

### 1-2. Docker 動作確認
- Docker が起動していることを確認（Docker Desktop の起動など）。

## 2. リポジトリ準備
1. リポジトリをクローン。
2. VS Code でリポジトリを開く。

## 3. Dev Container 設定の確認
1. `.devcontainer/` 配下に設定があることを確認。
   - `docker-compose.yml`
   - `Dockerfile.backend`
   - `Dockerfile.frontend`
2. （必要なら）環境変数ファイルを作成。
   - `.devcontainer/.env.example` を `.env` にコピー
   - `.env` を編集して必要な値を設定

## 4. Dev Container 構築の流れ（ファイル観点）
1. VS Code が devcontainer.json を読み込む。
  - バックエンド用: `.devcontainer/api/devcontainer.json`
  - フロントエンド用: `.devcontainer/web/devcontainer.json`
2. devcontainer.json が docker-compose.yml を参照し、対象サービスを決める。
  - `service: backend` または `service: frontend`
3. docker-compose.yml が各サービスのイメージをビルド。
  - backend は Dockerfile.backend
  - frontend は Dockerfile.frontend
4. postgres サービスが起動し、初回のみ初期データを投入。
  - `.devcontainer/postgres/init.sql`
5. VS Code がコンテナ内に接続し、拡張機能やポート転送設定を適用。
  - devcontainer.json 内の `customizations` / `forwardPorts`

## 5. Dev Container の構築（初回）
1. VS Code のコマンドパレットで「Dev Containers: Reopen in Container」を実行。
2. 初回はイメージのビルドが走るため時間がかかる。
3. 完了後、VS Code 左下に「Dev Container」表示が出れば構築完了。

## 6. 初回起動時の確認
### 6-1. DB 初期データ
- Dev Container 起動時に初期データを投入する設定済み。
- 位置: `.devcontainer/postgres/init.sql`
- 反映は **DB初回初期化時のみ**。
  - 再投入したい場合は `postgres_data` ボリュームを削除して再起動。

### 6-2. コンテナ構成の確認
- `frontend` / `backend` / `postgres` が起動していることを確認。

## 7. 参考（起動後の開発手順）
※ 構築後に開発を始める際の参考

### バックエンド（Spring Boot）
- 実行:
  - `DailyNotes/api/run.sh`
- もしくは手動:
  - `cd DailyNotes/api && mvn spring-boot:run`

### フロントエンド（Next.js）
- 実行:
  - `DailyNotes/web/run.sh`
- もしくは手動:
  - `cd DailyNotes/web && npm install && npm run dev`

## 8. よくあるトラブル（構築時）
### コンテナが起動しない
- Dev Container を再構築（Rebuild）。

### DBに接続できない
- Postgres サービスが起動しているか確認。
- `docker compose -f .devcontainer/docker-compose.yml ps`

### ポートが使用中
- `.devcontainer/docker-compose.yml` のポート設定を変更。
