import { Suspense } from 'react';
import { PoemCard } from '../components/PoemCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { SearchBar } from '../components/SearchBar';
import { TypeFilter } from '../components/TypeFilter';
import {
  getRecommendedPoems,
  getFilteredPoems,
  getAllTags,
  getAllDynasties,
  searchPoems,
} from '@/lib/queries';
import { $Enums } from '@/lib/prisma-client';

type PoemType = $Enums.PoemType;

type SearchParams = Promise<{
  dynastyId?: string;
  tagId?: string | string[];
  type?: string;
  q?: string;
}>;

export default async function ExplorePage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  // Parse filters from URL - default type to 'shi'
  const dynastyId = searchParams.dynastyId ? Number(searchParams.dynastyId) : undefined;
  const tagIds = searchParams.tagId
    ? Array.isArray(searchParams.tagId)
      ? searchParams.tagId.map(Number)
      : [Number(searchParams.tagId)]
    : undefined;
  const type = (searchParams.type as PoemType | undefined) ?? 'shi';
  const query = searchParams.q;

  // Fetch data in parallel
  const [poems, tags, dynasties] = await Promise.all([
    query
      ? searchPoems(query, 30, type)
      : dynastyId || tagIds || searchParams.type
      ? getFilteredPoems({ dynastyId, tagIds, type, limit: 30 })
      : getRecommendedPoems(30, type),
    getAllTags(),
    getAllDynasties(),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto px-4 py-8">
        {/* Type Filter and Search Bar at top */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TypeFilter />
          <SearchBar />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Poems List - Main Content */}
          <main className="flex-1">
            {/* Results info */}
            <div className="mb-6">
              <p className="text-sm text-zinc-600">
                {query
                  ? `搜索 "${query}" 找到 ${poems.length} 首诗词`
                  : dynastyId || tagIds || searchParams.type
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
                <FilterSidebar dynasties={dynasties} tags={tags} />
              </Suspense>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
