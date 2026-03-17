'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition, FormEvent } from 'react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }

    startTransition(() => {
      router.push(`/explore?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setSearchQuery('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');

    startTransition(() => {
      router.push(`/explore?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 md:max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="搜索诗词标题或内容..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isPending}
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 pr-20 text-sm focus:border-zinc-500 focus:outline-none disabled:opacity-50"
        />
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              disabled={isPending}
              className="rounded px-2 py-1 text-xs text-zinc-500 hover:text-zinc-700"
            >
              清除
            </button>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="rounded bg-zinc-900 px-3 py-1 text-xs text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            搜索
          </button>
        </div>
      </div>
    </form>
  );
}
