# フロントエンド仕様書

## 概要
Daily Notes のフロントエンドアプリケーション。ユーザーが日々のメモや記録を管理するための Web UI を提供します。

## 技術スタック

| 項目 | バージョン |
|------|-----------|
| **フレームワーク** | Next.js | 16.1.4 |
| **言語** | TypeScript | 5.x |
| **React** | 19.2.3 |
| **スタイリング** | Tailwind CSS | 4.x |
| **ビルドツール** | Next.js (Webpack) |
| **リンター** | ESLint | 9.x |
| **パッケージマネージャー** | npm |

## プロジェクト構成

```
web/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # ルートレイアウト
│   ├── page.tsx             # ホームページ
│   └── globals.css          # グローバルスタイル
├── public/                  # 静的ファイル
├── package.json             # 依存関係定義
├── tsconfig.json            # TypeScript設定
├── next.config.ts           # Next.js設定
├── postcss.config.mjs       # PostCSS設定
├── tailwind.config.js       # Tailwind CSS設定
├── eslint.config.mjs        # ESLint設定
└── next-env.d.ts            # Next.js型定義
```

## 現在の実装状況

### ホームページ（`/`）
- Next.js デフォルトテンプレートの基本的な UI
- Tailwind CSS でスタイリング
- レスポンシブデザイン対応
- ダークモード対応

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start
```

## スタイリング方針

- **Tailwind CSS v4** を採用
- Utility-first アプローチでコンポーネントを構築
- カラーパレット：`zinc` を基調色として使用
- レスポンシブ: `sm`, `md`, `lg` ブレークポイント対応

## 型安全性

- TypeScript を strict mode で利用
- Next.js の推奨型定義に準拠


