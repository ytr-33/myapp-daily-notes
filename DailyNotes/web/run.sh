#!/bin/bash
# Next.js Frontend 起動スクリプト

cd "$(dirname "$0")"

echo "Starting Next.js Frontend..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start development server
npm run dev
