import Link from 'next/link';

type PoemCardProps = {
  poem: {
    id: number;
    title: string;
    content: string;
    stars: number;
    poet: {
      name: string;
    };
    dynasty: {
      name: string;
    };
    tags: Array<{
      name: string;
    }>;
  };
};

export function PoemCard({ poem }: PoemCardProps) {
  // Truncate content to first 4 lines for preview
  const contentPreview = poem.content.split('\n').slice(0, 4).join('\n');
  const hasMore = poem.content.split('\n').length > 4;

  return (
    <Link
      href={`/poems/${poem.id}`}
      className="block rounded-lg border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-zinc-900">{poem.title}</h3>
          <p className="mt-1 text-sm text-zinc-600">
            {poem.poet.name} · {poem.dynasty.name}
          </p>
        </div>
        <div className="flex items-center gap-1 text-amber-600">
          <span className="text-sm">⭐</span>
          <span className="text-sm font-medium">{poem.stars.toLocaleString()}</span>
        </div>
      </div>

      {/* Content Preview */}
      <div className="mb-4 whitespace-pre-line font-serif text-zinc-700">
        {contentPreview}
        {hasMore && <span className="text-zinc-400">...</span>}
      </div>

      {/* Tags */}
      {poem.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {poem.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.name}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600"
            >
              {tag.name}
            </span>
          ))}
          {poem.tags.length > 3 && (
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600">
              +{poem.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
