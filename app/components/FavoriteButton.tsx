'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FavoriteButtonProps = {
  poemId: number;
  initialIsFavorited: boolean;
  isAuthenticated: boolean;
};

export function FavoriteButton({
  poemId,
  initialIsFavorited,
  isAuthenticated,
}: FavoriteButtonProps) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorited) {
        // Remove from favorites
        const response = await fetch(`/api/favorites?poemId=${poemId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to remove favorite');
        }

        setIsFavorited(false);
      } else {
        // Add to favorites
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ poemId }),
        });

        if (!response.ok) {
          throw new Error('Failed to add favorite');
        }

        setIsFavorited(true);
      }

      router.refresh();
    } catch (error) {
      console.error('Toggle favorite error:', error);
      alert('操作失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
        isFavorited
          ? 'bg-red-50 text-red-600 hover:bg-red-100'
          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={isFavorited ? '取消收藏' : '收藏'}
    >
      <svg
        className="h-4 w-4"
        fill={isFavorited ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {isFavorited ? '已收藏' : '收藏'}
    </button>
  );
}
