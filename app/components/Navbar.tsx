import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-zinc-900">诗词探索</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/explore"
            className="text-zinc-700 transition-colors hover:text-zinc-900"
          >
            探索
          </Link>
          <Link
            href="/"
            className="text-zinc-700 transition-colors hover:text-zinc-900"
          >
            首页
          </Link>
        </div>
      </div>
    </nav>
  );
}
