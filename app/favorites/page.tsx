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

  const MAX_FAVORITES_UNVERIFIED = 5;
  const showLimitWarning = !user.emailVerified && favoritedPoems.length >= MAX_FAVORITES_UNVERIFIED - 1;

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">我的收藏</h1>
          <p className="mt-2 text-zinc-600">
            您已收藏 {favoritedPoems.length} 首诗词
            {!user.emailVerified && (
              <span className="ml-2 text-sm text-amber-600">
                （未验证用户上限：{MAX_FAVORITES_UNVERIFIED} 首）
              </span>
            )}
          </p>
          {showLimitWarning && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-900">
                    即将达到收藏上限
                  </p>
                  <p className="mt-1 text-sm text-amber-700">
                    您还可以收藏 {MAX_FAVORITES_UNVERIFIED - favoritedPoems.length} 首诗词。
                    验证邮箱即可解锁无限收藏！
                  </p>
                </div>
              </div>
            </div>
          )}
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
