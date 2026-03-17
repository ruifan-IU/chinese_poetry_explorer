'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function TypeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selectedType = searchParams.get('type') || 'shi';

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

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-zinc-700">类型:</span>
      <div className="flex gap-2">
        {[
          { value: 'shi', label: '诗' },
          { value: 'ci', label: '词' },
          { value: 'wen', label: '文' },
        ].map((type) => (
          <button
            key={type.value}
            onClick={() => handleTypeSelect(type.value)}
            disabled={isPending}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedType === type.value
                ? 'bg-zinc-900 text-white'
                : 'bg-white text-zinc-700 hover:bg-zinc-100'
            } border border-zinc-200`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
