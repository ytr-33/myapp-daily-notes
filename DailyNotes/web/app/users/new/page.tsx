import Link from "next/link";

export default function UserCreatePage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">Daily Notes</p>
            <h1 className="text-2xl font-semibold">ユーザー作成</h1>
          </div>
          <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
            <Link className="hover:text-zinc-900 dark:hover:text-white" href="/users">
              一覧へ戻る
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 py-10">
        <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold">基本情報</h2>
          <p className="mt-1 text-sm text-zinc-500">必須項目を入力してください（モック）。</p>

          <form className="mt-6 space-y-5">
            <div>
              <label className="text-sm font-medium">名前（必須）</label>
              <input
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="例: 太郎"
              />
            </div>
            <div>
              <label className="text-sm font-medium">メール（必須）</label>
              <input
                type="email"
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="例: taro@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">電話（任意）</label>
              <input
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="例: 090-1234-5678"
              />
            </div>
            <div>
              <label className="text-sm font-medium">年齢（任意）</label>
              <input
                type="number"
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="例: 28"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                作成する
              </button>
              <Link
                href="/users"
                className="rounded-full border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200"
              >
                キャンセル
              </Link>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
