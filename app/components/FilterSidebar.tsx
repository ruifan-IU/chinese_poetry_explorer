'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

type FilterSidebarProps = {
  poets: Array<{ id: number; name: string; _count: { poems: number } }>;
  tags: Array<{ id: number; name: string; _count: { poems: number } }>;
};

export function FilterSidebar({ poets, tags }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selectedPoetId = searchParams.get('poetId');
  const selectedTagIds = searchParams.getAll('tagId');
  const selectedType = searchParams.get('type');

  const [searchPoet, setSearchPoet] = useState('');
  const [searchTag, setSearchTag] = useState('');

  const filteredPoets = poets
    .filter((poet) => poet.name.toLowerCase().includes(searchPoet.toLowerCase()))
    .slice(0, 10);

  const filteredTags = tags
    .filter((tag) => tag.name.toLowerCase().includes(searchTag.toLowerCase()))
    .slice(0, 10);

  const handlePoetSelect = (poetId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedPoetId === poetId) {
      params.delete('poetId');
    } else {
      params.set('poetId', poetId);
    }

    startTransition(() => {
      router.push(`/explore?${params.toString()}`);
    });
  };

  const handleTagToggle = (tagId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedTagIds.includes(tagId)) {
      params.delete('tagId');
      selectedTagIds.forEach((id) => {
        if (id !== tagId) params.append('tagId', id);
      });
    } else {
      params.append('tagId', tagId);
    }

    startTransition(() => {
      router.push(`/explore?${params.toString()}`);
    });
  };

  const handleTypeSelect = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedType === type) {
      params.delete('type');
    } else {
      params.set('type', type);
    }

    startTransition(() => {
      router.push(`/explore?${params.toString()}`);
    });
  };

  const handleClearFilters = () => {
    startTransition(() => {
      router.push('/explore');
    });
  };

  const hasActiveFilters = selectedPoetId || selectedTagIds.length > 0 || selectedType;

  return (
    <aside className="space-y-6">
      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          清除筛选 ✕
        </button>
      )}

      {/* Type Filter */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <h3 className="mb-3 text-lg font-semibold text-zinc-900">类型</h3>
        <div className="space-y-2">
          {[
            { value: 'shi', label: '诗' },
            { value: 'ci', label: '词' },
            { value: 'wen', label: '文' },
          ].map((type) => (
            <button
              key={type.value}
              onClick={() => handleTypeSelect(type.value)}
              className={`flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm transition-colors ${
                selectedType === type.value
                  ? 'bg-zinc-900 text-white'
                  : 'hover:bg-zinc-100'
              }`}
            >
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Poets Filter */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <h3 className="mb-3 text-lg font-semibold text-zinc-900">诗人</h3>

        <input
          type="text"
          placeholder="搜索诗人..."
          value={searchPoet}
          onChange={(e) => setSearchPoet(e.target.value)}
          className="mb-3 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
        />

        <div className="max-h-64 space-y-2 overflow-y-auto">
          {filteredPoets.map((poet) => (
            <button
              key={poet.id}
              onClick={() => handlePoetSelect(String(poet.id))}
              className={`flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm transition-colors ${
                selectedPoetId === String(poet.id)
                  ? 'bg-zinc-900 text-white'
                  : 'hover:bg-zinc-100'
              }`}
            >
              <span className="truncate">{poet.name}</span>
              <span className="ml-2 text-xs opacity-60">
                {poet._count.poems}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <h3 className="mb-3 text-lg font-semibold text-zinc-900">标签</h3>

        <input
          type="text"
          placeholder="搜索标签..."
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          className="mb-3 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
        />

        <div className="flex flex-wrap gap-2">
          {filteredTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagToggle(String(tag.id))}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                selectedTagIds.includes(String(tag.id))
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {tag.name} ({tag._count.poems})
            </button>
          ))}
        </div>
      </div>

      {isPending && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-center text-sm text-zinc-600">
          加载中...
        </div>
      )}
    </aside>
  );
}
