import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { UserMenu } from './UserMenu';
import { VerificationBanner } from './VerificationBanner';

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className='sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm'>
      {user && !user.emailVerified && (
        <VerificationBanner userEmail={user.email} />
      )}
      <div className='container mx-auto flex items-center justify-between px-4 py-4'>
        {/* Logo/Brand */}
        <Link href='/explore' className='flex items-center gap-2'>
          <span className='text-2xl font-bold text-zinc-900'>诗词探索</span>
        </Link>

        {/* Navigation Links */}
        <div className='flex items-center gap-6'>
          <Link
            href='/explore'
            className='text-zinc-700 transition-colors hover:text-zinc-900'
          >
            探索
          </Link>
          {user && (
            <>
              <Link
                href='/favorites'
                className='text-zinc-700 transition-colors hover:text-zinc-900'
              >
                收藏
              </Link>
              <Link
                href='/memorization'
                className='text-zinc-700 transition-colors hover:text-zinc-900'
              >
                背诵
              </Link>
            </>
          )}

          {/* Auth Section */}
          {user ? (
            <UserMenu user={user} />
          ) : (
            <div className='flex items-center gap-3'>
              <Link
                href='/login'
                className='text-zinc-700 transition-colors hover:text-zinc-900'
              >
                登录
              </Link>
              <Link
                href='/signup'
                className='rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800'
              >
                注册
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
