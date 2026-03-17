import { Suspense } from 'react';
import { PoemCard } from '../components/PoemCard';
import { FilterSidebar } from '../components/FilterSidebar';
import {
  getRecommendedPoems,
  getFilteredPoems,
  getAllPoets,
  getAllTags,
} from '@/lib/queries';
import { PoemType } from '@/lib/prisma-client';

type SearchParams = Promise<{
  poetId?: string;
  tagId?: string | string[];
  type?: string;
}>;

export default async function ExplorePage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  // Parse filters from URL
  const poetId = searchParams.poetId ? Number(searchParams.poetId) : undefined;
  const tagIds = searchParams.tagId
    ? Array.isArray(searchParams.tagId)
      ? searchParams.tagId.map(Number)
      : [Number(searchParams.tagId)]
    : undefined;
  const type = searchParams.type as PoemType | undefined;

  // Fetch data in parallel
  const [poems, poets, tags] = await Promise.all([
    poetId || tagIds || type
      ? getFilteredPoems({ poetId, tagIds, type, limit: 30 })
      : getRecommendedPoems(30, type),
    getAllPoets(),
    getAllTags(),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Poems List - Main Content */}
          <main className="flex-1">
            {/* Results info */}
            <div className="mb-6">
              <p className="text-sm text-zinc-600">
                {poetId || tagIds || type
                  ? `找到 ${poems.length} 首诗词`
                  : `为您推荐 ${poems.length} 首高质量诗词`}
              </p>
            </div>
            <Suspense
              fallback={
                <div className="text-center text-zinc-600">加载中...</div>
              }
            >
              {poems.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {poems.map((poem) => (
                    <PoemCard key={poem.id} poem={poem} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-zinc-200 bg-white p-12 text-center">
                  <p className="text-lg text-zinc-600">
                    没有找到符合条件的诗词
                  </p>
                  <p className="mt-2 text-sm text-zinc-500">
                    请尝试调整筛选条件
                  </p>
                </div>
              )}
            </Suspense>
          </main>

          {/* Filter Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-24">
              <Suspense
                fallback={
                  <div className="rounded-lg border border-zinc-200 bg-white p-4 text-center text-sm text-zinc-600">
                    加载筛选器...
                  </div>
                }
              >
                <FilterSidebar poets={poets} tags={tags} />
              </Suspense>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
