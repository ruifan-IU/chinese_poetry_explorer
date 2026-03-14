import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPoetById } from '@/lib/queries';

type Params = Promise<{ id: string }>;

export default async function PoetDetailPage(props: { params: Params }) {
  const params = await props.params;
  const poet = await getPoetById(Number(params.id));

  if (!poet) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header Card */}
        <div className="mb-8 rounded-lg border border-zinc-200 bg-white p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            {/* Poet Image */}
            {poet.image && (
              <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-4 border-zinc-200">
                <Image
                  src={poet.image}
                  alt={poet.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                  priority
                />
              </div>
            )}

            {/* Poet Info */}
            <div className="flex-1">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h1 className="mb-2 text-4xl font-bold text-zinc-900">
                    {poet.name}
                  </h1>
                  {poet.dynasty && (
                    <p className="text-lg text-zinc-600">{poet.dynasty.name}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-amber-600">
                  <span>⭐</span>
                  <span className="text-lg font-medium">
                    {poet.stars.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Summary */}
              {poet.summary && (
                <p className="text-zinc-700 leading-relaxed">{poet.summary}</p>
              )}
            </div>
          </div>
        </div>

        {/* Introduction */}
        {poet.introduction && (
          <section className="mb-8 rounded-lg border border-zinc-200 bg-white p-8">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
              简介
            </h2>
            <div className="whitespace-pre-line text-zinc-700 leading-relaxed">
              {poet.introduction}
            </div>
          </section>
        )}

        {/* Poems by this poet */}
        <section className="rounded-lg border border-zinc-200 bg-white p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-zinc-900">
              代表作品
            </h2>
            <p className="text-sm text-zinc-600">
              共 {poet.poems.length} 首{poet.poems.length >= 10 && '（显示前10首）'}
            </p>
          </div>

          {poet.poems.length > 0 ? (
            <div className="space-y-4">
              {poet.poems.map((poem) => (
                <Link
                  key={poem.id}
                  href={`/poems/${poem.id}`}
                  className="block rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition-colors hover:bg-zinc-100"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-semibold text-zinc-900">
                        {poem.title}
                      </h3>
                      <p className="line-clamp-2 font-serif text-sm text-zinc-600">
                        {poem.content.split('\n').slice(0, 2).join('\n')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-600">
                      <span className="text-sm">⭐</span>
                      <span className="text-sm font-medium">
                        {poem.stars.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-zinc-600">暂无收录作品</p>
          )}
        </section>
      </div>
    </div>
  );
}
