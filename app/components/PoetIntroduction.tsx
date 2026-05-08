'use client';

import { useState } from 'react';

type PoetIntroductionProps = {
  introduction: string;
};

export function PoetIntroduction({ introduction }: PoetIntroductionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split introduction by newlines
  const lines = introduction.split('\n');
  const hasMore = lines.length > 10;

  // Show first 10 lines or all lines if expanded
  const displayedText = isExpanded
    ? introduction
    : lines.slice(0, 5).join('\n');

  return (
    <section className='mb-8 rounded-lg border border-zinc-200 bg-white p-8'>
      <h2 className='mb-4 text-2xl font-semibold text-zinc-900'>简介</h2>
      <div className='whitespace-pre-line text-zinc-700 leading-relaxed'>
        {displayedText}
      </div>
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='mt-4 text-sm text-blue-600 hover:text-blue-800 hover:underline'
        >
          {isExpanded ? '收起' : '显示更多'}
        </button>
      )}
    </section>
  );
}
