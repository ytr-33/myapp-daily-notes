# Java API Backend Sample

Spring Bootを使ったJavaのREST APIバックエンドサンプルプロジェクトです。

## 機能

- ユーザー管理API（CRUD操作）
- ヘルスチェックエンドポイント
- JPA/Hibernateを使ったデータベース操作
- H2インメモリデータベース
- ユニットテスト

## 前提条件

- Java 17以上
- Maven 3.6.0以上

## セットアップと実行

### 1. プロジェクトのビルド

```bash
cd /workspace/DailyNotes/api
mvn clean install
```

### 2. アプリケーションの起動

```bash
mvn spring-boot:run
```

アプリケーションは `http://localhost:8080` で起動します。

#### 開発プロファイルでの起動（H2コンソール有効化）

H2コンソールは `application-dev.properties` で有効化されています。開発プロファイルを指定して起動してください。

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## APIエンドポイント

### ヘルスチェック
```
GET /api/health
```

### ユーザー一覧取得
```
GET /api/users
```

### ユーザー詳細取得
```
GET /api/users/{id}
```

### ユーザー作成
```
POST /api/users
Content-Type: application/json

{
    "name": "ユーザー名",
    "email": "email@example.com",
    "phone": "090-xxxx-xxxx",
    "age": 25
}
```

### ユーザー更新
```
PUT /api/users/{id}
Content-Type: application/json

{
    "name": "新しい名前",
    "email": "newemail@example.com",
    "phone": "090-yyyy-yyyy",
    "age": 26
}
```

### ユーザー削除
```
DELETE /api/users/{id}
```

### メールアドレスで検索
```
GET /api/users/search/email?email=example@example.com
```

## テストの実行

```bash
mvn test
```

## H2データベースコンソール

開発時にはH2データベースのコンソールにアクセスできます（開発プロファイル有効時）：

```
http://localhost:8080/h2-console
```

- JDBC URL: `jdbc:h2:mem:testdb`
- User Name: `sa`
- Password: （空白）

## プロジェクト構造

```
api/
├── pom.xml                          # Maven設定ファイル
├── src/
│   ├── main/
│   │   ├── java/com/example/api/
│   │   │   ├── Application.java     # アプリケーションエントリーポイント
│   │   │   ├── controller/
│   │   │   │   ├── UserController.java
│   │   │   │   └── HealthController.java
│   │   │   └── model/
│   │   │       ├── User.java        # ユーザーエンティティ
│   │   │       └── UserRepository.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql             # 初期データ
│   └── test/
│       └── java/com/example/api/
│           └── UserControllerTest.java
└── README.md
```

## 技術スタック

- **Spring Boot 3.2.0**
- **Spring Data JPA** - ORM
- **H2 Database** - インメモリデータベース
- **Lombok** - ボイラープレートコード削減
- **Maven** - ビルドツール

## ライセンス

MIT License
