# DevContainer Getting Started Guide

## セットアップ手順

1. **VS Codeで開く**
   - このプロジェクトを VS Code で開く
   - コマンドパレット (`Cmd+Shift+P`) で `Reopen in Container` を実行

2. **コンテナが起動したら**
   - 自動的に Node.js 依存関係がインストールされます
   - Java、Maven、PostgreSQL はすでに利用可能です

## 使用可能なサービス

### フロントエンド (Next.js)
```bash
cd frontend
npm install
npm run dev
```
- アクセス: http://localhost:3000

### バックエンド (Java)
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
- アクセス: http://localhost:8080

### データベース (PostgreSQL)
- Host: postgres
- Port: 5432
- User: postgres
- Password: postgres
- Database: myapp_db

接続例:
```bash
psql -h postgres -U postgres -d myapp_db
```

## 環境変数

`.env` ファイルで環境変数を設定できます：
- コピー: `cp .devcontainer/.env.example .env`
- 編集: `.env` ファイルを編集
- 使用: Spring Boot や Next.js から参照

## ディレクトリ構造（推奨）

```
myapp-daily-notes/
├── .devcontainer/          # DevContainer 設定
├── frontend/               # Next.js プロジェクト
│   ├── package.json
│   ├── next.config.js
│   └── ...
├── backend/                # Java バックエンド
│   ├── pom.xml
│   ├── src/
│   └── ...
├── documents/              # ドキュメント
└── docker-compose.yml      # (オプション) スタンドアロン実行用
```

## よく使うコマンド

```bash
# コンテナ内で bash を開く
devcontainer exec myapp-devcontainer bash

# PostgreSQL への接続
psql -h localhost -U postgres -d myapp_db

# Maven でビルド
mvn clean package

# npm で開発サーバー起動
npm run dev

# Docker イメージの再ビルド
docker-compose -f .devcontainer/docker-compose.yml build
```

## ポート設定

| ポート | サービス | 説明 |
|--------|---------|------|
| 3000   | Next.js | フロントエンド開発サーバー |
| 8080   | Java    | Spring Boot 等のバックエンド |
| 5432   | PostgreSQL | データベース |

## トラブルシューティング

### コンテナが起動しない
```bash
docker-compose -f .devcontainer/docker-compose.yml up --build
```

### データベースに接続できない
```bash
# PostgreSQL が起動しているか確認
docker-compose -f .devcontainer/docker-compose.yml ps

# PostgreSQL のログを確認
docker-compose -f .devcontainer/docker-compose.yml logs postgres
```

### ポートが既に使用中の場合
`docker-compose.yml` のポート設定を変更してください。
