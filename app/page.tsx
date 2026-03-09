import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  // Get collection stats
  const [poemCount, poetCount] = await Promise.all([
    prisma.poem.count(),
    prisma.poet.count(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative flex min-h-screen flex-col lg:flex-row">
        {/* Text Content - Left side on desktop, overlay on mobile */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-8 py-16 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl lg:mx-0">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white lg:text-6xl lg:text-zinc-900">
              探索中国古典诗词之美
            </h1>
            <p className="mb-4 text-xl text-white/90 lg:text-zinc-700">
              Explore the Beauty of Classical Chinese Poetry
            </p>
            <p className="mb-8 text-lg text-white/80 lg:text-zinc-600">
              收录 <span className="font-semibold">{poemCount.toLocaleString()}</span> 首诗词，
              <span className="font-semibold">{poetCount.toLocaleString()}</span> 位诗人，
              跨越千年的文学瑰宝
            </p>

            {/* Featured Poems Preview */}
            <div className="mb-8 space-y-2 text-sm text-white/70 lg:text-zinc-500">
              <p>精选收录：</p>
              <ul className="ml-4 space-y-1">
                <li>• 《静夜思》李白</li>
                <li>• 《春江花月夜》张若虚</li>
                <li>• 《水调歌头·明月几时有》苏轼</li>
              </ul>
            </div>

            {/* CTA Button */}
            <Link
              href="/explore"
              className="inline-block rounded-lg bg-zinc-900 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-800 lg:bg-zinc-900"
            >
              开始探索 →
            </Link>
          </div>
        </div>

        {/* Image - Background on mobile, right side on desktop */}
        <div className="absolute inset-0 lg:relative lg:flex-1">
          <Image
            src="/landing.jpg"
            alt="Classical Chinese poetry background"
            fill
            priority
            className="object-cover lg:object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Dark overlay for mobile to make text readable */}
          <div className="absolute inset-0 bg-black/50 lg:hidden" />
        </div>
      </div>
    </div>
  );
}
