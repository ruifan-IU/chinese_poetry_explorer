import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { PoemCard } from '../components/PoemCard';
import { getCurrentUser } from '@/lib/auth';
import { getUserMemorizations, getMemorizationStats } from '@/lib/memorization';
import { getUserFavoritedPoemIds } from '@/lib/favorites';
import Link from 'next/link';

export default async function MemorizationPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login?redirect=/memorization');
  }

  const [memorizations, favoritedPoemIds, stats] = await Promise.all([
    getUserMemorizations(user.userId),
    getUserFavoritedPoemIds(user.userId),
    getMemorizationStats(user.userId),
  ]);

  const MAX_MEMORIZATIONS_UNVERIFIED = 3;
  const showLimitWarning = !user.emailVerified && memorizations.length >= MAX_MEMORIZATIONS_UNVERIFIED - 1;

  // Group memorizations by mastery level
  const groupedMemorizations = {
    NEW: memorizations.filter(m => m.masteryLevel === 'NEW'),
    LEARNING: memorizations.filter(m => m.masteryLevel === 'LEARNING'),
    YOUNG: memorizations.filter(m => m.masteryLevel === 'YOUNG'),
    MATURE: memorizations.filter(m => m.masteryLevel === 'MATURE'),
    MASTERED: memorizations.filter(m => m.masteryLevel === 'MASTERED'),
  };

  const masteryLevelConfig = {
    NEW: { label: '新增', color: 'bg-zinc-100 text-zinc-700', icon: '📝' },
    LEARNING: { label: '学习中', color: 'bg-blue-100 text-blue-700', icon: '📚' },
    YOUNG: { label: '熟悉', color: 'bg-green-100 text-green-700', icon: '🌱' },
    MATURE: { label: '掌握', color: 'bg-purple-100 text-purple-700', icon: '🎯' },
    MASTERED: { label: '精通', color: 'bg-amber-100 text-amber-700', icon: '🏆' },
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">我的背诵</h1>
              <p className="mt-2 text-zinc-600">
                共 {memorizations.length} 首诗词
                {!user.emailVerified && (
                  <span className="ml-2 text-sm text-amber-600">
                    （未验证用户上限：{MAX_MEMORIZATIONS_UNVERIFIED} 首）
                  </span>
                )}
              </p>
            </div>
            {stats.dueCount > 0 && (
              <Link
                href="/memorization/practice"
                className="rounded-lg bg-purple-600 px-6 py-3 text-white font-medium hover:bg-purple-700 transition-colors"
              >
                开始复习 ({stats.dueCount})
              </Link>
            )}
          </div>

          {/* Limit Warning */}
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
                    即将达到背诵上限
                  </p>
                  <p className="mt-1 text-sm text-amber-700">
                    您还可以添加 {MAX_MEMORIZATIONS_UNVERIFIED - memorizations.length} 首诗词到背诵列表。
                    验证邮箱即可解锁无限背诵！
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(masteryLevelConfig).map(([level, config]) => {
              const count = stats.byMasteryLevel[level] || 0;
              return (
                <div
                  key={level}
                  className={`rounded-lg border p-4 ${config.color}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{config.label}</p>
                      <p className="text-2xl font-bold mt-1">{count}</p>
                    </div>
                    <span className="text-2xl">{config.icon}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Suspense
          fallback={
            <div className="text-center text-zinc-600">加载中...</div>
          }
        >
          {memorizations.length > 0 ? (
            <div className="space-y-8">
              {Object.entries(groupedMemorizations).map(([level, poems]) => {
                if (poems.length === 0) return null;
                const config = masteryLevelConfig[level as keyof typeof masteryLevelConfig];

                return (
                  <div key={level}>
                    <h2 className="text-xl font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                      <span>{config.icon}</span>
                      <span>{config.label}</span>
                      <span className="text-zinc-500 text-base">({poems.length})</span>
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {poems.map((memorization) => (
                        <PoemCard
                          key={memorization.poem.id}
                          poem={memorization.poem}
                          isFavorited={favoritedPoemIds.includes(memorization.poem.id)}
                          isMemorizing={true}
                          isAuthenticated={true}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-zinc-200 bg-white p-12 text-center">
              <p className="text-lg text-zinc-600">
                您还没有添加任何诗词到背诵列表
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                去探索页面发现想要背诵的诗词吧
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
