-- 初期スキーマ/データ（Dev Container 起動時）
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255),
    age INTEGER
);

INSERT INTO users (name, email, phone, age) VALUES
('太郎', 'taro@example.com', '090-1234-5678', 28),
('花子', 'hanako@example.com', '090-8765-4321', 25),
('次郎', 'jiro@example.com', '090-5555-5555', 30);
