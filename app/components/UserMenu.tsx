'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { JWTPayload } from '@/lib/auth';

interface UserMenuProps {
  user: JWTPayload;
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50'
      >
        <span>{user.name || user.email}</span>
        <svg
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 rounded-lg border border-zinc-200 bg-white shadow-lg'>
          <div className='p-3 border-b border-zinc-200'>
            <p className='text-sm font-medium text-zinc-900 truncate'>
              {user.name || user.email}
            </p>
            {user.name && (
              <p className='text-xs text-zinc-500 truncate mt-1'>
                {user.email}
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className='w-full px-3 py-2 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-50'
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}
