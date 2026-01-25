"use client";

import Link from "next/link";
import { useTransition } from "react";

const baseClassName =
  "inline-flex items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200";

type ButtonProps = {
  userId: number;
  className?: string; // e.g. "px-3 py-1 text-xs"
};

export function DetailButton({ userId, className }: ButtonProps) {
  const finalClassName = className
    ? `${baseClassName} ${className}`
    : `${baseClassName} px-4 py-2 text-sm font-medium`;
  return (
    <Link href={`/users/${userId}`} className={finalClassName}>
      詳細
    </Link>
  );
}

export function EditButton({ userId, className }: ButtonProps) {
  const finalClassName = className
    ? `${baseClassName} ${className}`
    : `${baseClassName} px-4 py-2 text-sm font-medium`;
  return (
    <Link href={`/users/${userId}/edit`} className={finalClassName}>
      編集
    </Link>
  );
}

type DeleteProps = {
  onDelete: () => Promise<void>;
  className?: string;
};

export function DeleteButton({ onDelete, className }: DeleteProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (window.confirm("本当に削除しますか？この操作は取り消せません。")) {
      startTransition(async () => {
        await onDelete();
      });
    }
  };

  const defaultClassName =
    "inline-flex items-center justify-center rounded-full border border-red-200 text-red-600 transition hover:border-red-400 disabled:opacity-50 dark:border-red-700 dark:text-red-300";
  const finalClassName = className
    ? `${defaultClassName} ${className}`
    : `${defaultClassName} px-4 py-2 text-sm font-medium`;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={finalClassName}
    >
      {isPending ? "削除中..." : "削除"}
    </button>
  );
}
