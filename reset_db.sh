#!/bin/bash
set -e

# DB接続情報
export PGHOST=postgres
export PGUSER=postgres
export PGPASSWORD=postgres
export PGDATABASE=myapp_db

echo "🔄 データベースをリセットします..."

# スキーマを再作成して全データを削除
psql -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# 初期データを投入
psql -f /workspace/.devcontainer/postgres/init.sql

echo "✅ データベースのリセットが完了しました（初期データ投入済み）"
