import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPoemById } from '@/lib/queries';

type Params = Promise<{ id: string }>;

export default async function PoemDetailPage(props: { params: Params }) {
  const params = await props.params;
  const poem = await getPoemById(Number(params.id));

  if (!poem) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <article className="container mx-auto max-w-3xl px-4">
        <div className="rounded-lg border border-zinc-200 bg-white p-8">
          {/* Title and Author */}
          <header className="mb-8 border-b border-zinc-200 pb-6">
            <h1 className="mb-4 text-4xl font-bold text-zinc-900">
              {poem.title}
            </h1>
            <div className="flex items-center justify-between">
              <Link
                href={`/poets/${poem.poet.id}`}
                className="flex items-center gap-3 transition-opacity hover:opacity-70"
              >
                {poem.poet.image && (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-zinc-200">
                    <Image
                      src={poem.poet.image}
                      alt={poem.poet.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                )}
                <div>
                  <p className="text-lg font-medium text-zinc-900 hover:underline">
                    {poem.poet.name}
                  </p>
                  <p className="text-sm text-zinc-600">{poem.dynasty.name}</p>
                </div>
              </Link>
              <div className="flex items-center gap-2 text-amber-600">
                <span>⭐</span>
                <span className="font-medium">
                  {poem.stars.toLocaleString()}
                </span>
              </div>
            </div>
          </header>

          {/* Content */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900">原文</h2>
            <div className="whitespace-pre-line font-serif text-lg leading-relaxed text-zinc-800">
              {poem.content}
            </div>
          </section>

          {/* Translation */}
          {poem.translation && (
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-zinc-900">
                译文
              </h2>
              <div className="whitespace-pre-line text-zinc-700">
                {poem.translation}
              </div>
            </section>
          )}

          {/* Comments */}
          {poem.comments && (
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-zinc-900">
                赏析
              </h2>
              <div className="whitespace-pre-line text-zinc-700">
                {poem.comments}
              </div>
            </section>
          )}

          {/* Background */}
          {poem.background && (
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-zinc-900">
                背景
              </h2>
              <div className="whitespace-pre-line text-zinc-700">
                {poem.background}
              </div>
            </section>
          )}

          {/* Tags */}
          {poem.tags.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-semibold text-zinc-900">
                标签
              </h2>
              <div className="flex flex-wrap gap-2">
                {poem.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>
  );
}
