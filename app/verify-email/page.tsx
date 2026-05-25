'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('缺少验证令牌');
      return;
    }

    // Call the verification API
    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message || '邮箱验证成功！');

          // Clear the banner dismissed flag since email is now verified
          localStorage.removeItem('verification-banner-dismissed');

          // Redirect to home page after 3 seconds with hard refresh
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.error || '验证失败');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('验证过程中出错，请稍后重试');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">
              验证中...
            </h1>
            <p className="text-zinc-600">
              正在验证您的邮箱，请稍候
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">
              验证成功！
            </h1>
            <p className="text-zinc-600 mb-6">
              {message}
            </p>
            <p className="text-sm text-zinc-500 mb-4">
              3秒后将自动跳转到首页...
            </p>
            <Link
              href="/"
              className="inline-block bg-zinc-900 text-white px-6 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              立即返回首页
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">
              验证失败
            </h1>
            <p className="text-zinc-600 mb-6">
              {message}
            </p>
            <div className="space-y-3">
              <Link
                href="/"
                className="block bg-zinc-900 text-white px-6 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                返回首页
              </Link>
              <Link
                href="/signup"
                className="block border border-zinc-300 text-zinc-700 px-6 py-2 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                重新注册
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
