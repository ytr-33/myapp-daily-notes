import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getUsers, deleteUser } from "../_lib/api";
import { DeleteButton, DetailButton, EditButton } from "./buttons";

export default async function UsersPage() {
  const users = await getUsers();

  async function deleteUserAction(id: number) {
    "use server";
    await deleteUser(id);
    revalidatePath("/users");
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">Daily Notes</p>
            <h1 className="text-2xl font-semibold">ユーザー一覧</h1>
          </div>
          <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
            <Link className="hover:text-zinc-900 dark:hover:text-white" href="/">
              ダッシュボード
            </Link>
            <Link className="hover:text-zinc-900 dark:hover:text-white" href="/users/new">
              ユーザー作成
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">ユーザー一覧</h2>
              <p className="text-sm text-zinc-500">登録済みユーザーを表示します。</p>
            </div>
            <form className="flex w-full max-w-sm items-center gap-2">
              <input
                className="w-full rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                placeholder="メールで検索"
                aria-label="メール検索"
              />
              <button
                type="button"
                className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                検索
              </button>
            </form>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
                <tr>
                  <th className="py-3 pr-4 font-medium">名前</th>
                  <th className="py-3 pr-4 font-medium">メール</th>
                  <th className="py-3 pr-4 font-medium">電話</th>
                  <th className="py-3 pr-4 font-medium">年齢</th>
                  <th className="py-3 pr-4 font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-3 pr-4 font-medium text-zinc-900 dark:text-zinc-100">
                      {user.name}
                    </td>
                    <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-300">
                      {user.email}
                    </td>
                    <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-300">
                      {user.phone ?? "-"}
                    </td>
                    <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-300">
                      {user.age ?? "-"}
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex flex-wrap gap-2 text-xs font-medium">
                        <DetailButton
                          userId={user.id}
                          className="px-3 py-1 text-xs"
                        />
                        <EditButton
                          userId={user.id}
                          className="px-3 py-1 text-xs"
                        />
                        <DeleteButton
                          onDelete={deleteUserAction.bind(null, user.id)}
                          className="px-3 py-1 text-xs"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
