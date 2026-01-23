import Link from "next/link";
import { getUserById } from "../../_mock/users";

type PageProps = {
  params: { id: string };
};

export default function UserDetailPage({ params }: PageProps) {
  const userId = Number(params.id);
  const user = getUserById(userId);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">Daily Notes</p>
            <h1 className="text-2xl font-semibold">ユーザー詳細</h1>
          </div>
          <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
            <Link className="hover:text-zinc-900 dark:hover:text-white" href="/users">
              一覧へ戻る
            </Link>
            <Link className="hover:text-zinc-900 dark:hover:text-white" href={`/users/${params.id}/edit`}>
              編集
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        {!user ? (
          <section className="rounded-2xl border border-zinc-200 bg-white p-10 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-lg font-semibold">ユーザーが見つかりません</p>
            <p className="mt-2 text-sm text-zinc-500">指定されたユーザーIDが存在しません。</p>
          </section>
        ) : (
          <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-sm text-zinc-500">最終更新: {user.updatedAt}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/users/${user.id}/edit`}
                  className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200"
                >
                  編集
                </Link>
                <button
                  type="button"
                  className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:border-red-400 dark:border-red-700 dark:text-red-300"
                >
                  削除
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-zinc-500">メール</p>
                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500">電話</p>
                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {user.phone ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500">年齢</p>
                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {user.age ?? "-"}
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
