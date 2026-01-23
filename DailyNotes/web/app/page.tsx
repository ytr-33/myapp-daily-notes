import Link from "next/link";
import { getLatestUpdatedUser, mockUsers } from "./_mock/users";

export default function Home() {
  const latestUser = getLatestUpdatedUser();
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">Daily Notes</p>
            <h1 className="text-2xl font-semibold">ダッシュボード</h1>
          </div>
          <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
            <Link className="hover:text-zinc-900 dark:hover:text-white" href="/">
              ダッシュボード
            </Link>
            <Link className="hover:text-zinc-900 dark:hover:text-white" href="/users">
              ユーザー一覧
            </Link>
            <Link className="hover:text-zinc-900 dark:hover:text-white" href="/users/new">
              ユーザー作成
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">API ステータス</h2>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                OK
              </span>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              ヘルスチェックは正常です（モック）。
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-lg font-semibold">ユーザー総数</h2>
            <p className="mt-4 text-3xl font-semibold">{mockUsers.length}</p>
            {latestUser && (
              <p className="mt-3 text-sm text-zinc-500">
                最新更新: {latestUser.name}（{latestUser.updatedAt}）
              </p>
            )}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold">クイックリンク</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Link
              href="/users"
              className="rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-500"
            >
              ユーザー一覧を見る
            </Link>
            <Link
              href="/users/new"
              className="rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-500"
            >
              ユーザーを作成する
            </Link>
            <Link
              href="/users/1"
              className="rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-500"
            >
              サンプル詳細を見る
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
