import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { PoemCard } from '../components/PoemCard';
import { getCurrentUser } from '@/lib/auth';
import { getUserFavoritedPoems, getUserFavoritedPoemIds } from '@/lib/favorites';

export default async function FavoritesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login?redirect=/favorites');
  }

  const [favoritedPoems, favoritedPoemIds] = await Promise.all([
    getUserFavoritedPoems(user.userId),
    getUserFavoritedPoemIds(user.userId),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">我的收藏</h1>
          <p className="mt-2 text-zinc-600">
            您已收藏 {favoritedPoems.length} 首诗词
          </p>
        </div>

        <Suspense
          fallback={
            <div className="text-center text-zinc-600">加载中...</div>
          }
        >
          {favoritedPoems.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favoritedPoems.map((poem) => (
                <PoemCard
                  key={poem.id}
                  poem={poem}
                  isFavorited={favoritedPoemIds.includes(poem.id)}
                  isAuthenticated={true}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-zinc-200 bg-white p-12 text-center">
              <p className="text-lg text-zinc-600">
                您还没有收藏任何诗词
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                去探索页面发现喜欢的诗词吧
              </p>
              <a
                href="/explore"
                className="mt-4 inline-block rounded-lg bg-zinc-900 px-6 py-2 text-white hover:bg-zinc-800"
              >
                去探索
              </a>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}
