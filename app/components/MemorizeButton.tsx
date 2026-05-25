'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type MemorizeButtonProps = {
  poemId: number;
  initialIsMemorizing: boolean;
  isAuthenticated: boolean;
};

export function MemorizeButton({
  poemId,
  initialIsMemorizing,
  isAuthenticated,
}: MemorizeButtonProps) {
  const router = useRouter();
  const [isMemorizing, setIsMemorizing] = useState(initialIsMemorizing);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleMemorize = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setIsLoading(true);

    try {
      if (isMemorizing) {
        // Remove from memorization list
        const response = await fetch(`/api/memorization?poemId=${poemId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to remove from memorization list');
        }

        setIsMemorizing(false);
      } else {
        // Add to memorization list
        const response = await fetch('/api/memorization', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ poemId }),
        });

        if (!response.ok) {
          const data = await response.json();

          // Handle verification limit error
          if (data.requiresVerification) {
            const shouldVerify = confirm(
              `您已添加 ${data.currentCount} 首诗词到背诵列表（未验证用户上限：${data.maxCount} 首）\n\n${data.error}\n\n是否前往验证邮箱？`
            );

            if (shouldVerify) {
              // Scroll to top to show the verification banner
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
          }

          throw new Error(data.error || 'Failed to add to memorization list');
        }

        setIsMemorizing(true);
      }

      router.refresh();
    } catch (error) {
      console.error('Toggle memorization error:', error);
      alert('操作失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleMemorize}
      disabled={isLoading}
      className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
        isMemorizing
          ? 'bg-purple-50 text-purple-600 hover:bg-purple-100'
          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={isMemorizing ? '移出背诵列表' : '加入背诵列表'}
    >
      <svg
        className="h-4 w-4"
        fill={isMemorizing ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
      {isMemorizing ? '背诵中' : '背诵'}
    </button>
  );
}
