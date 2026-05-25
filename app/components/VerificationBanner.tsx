'use client';

import { useState, useEffect } from 'react';

interface VerificationBannerProps {
  userEmail: string;
}

export function VerificationBanner({ userEmail }: VerificationBannerProps) {
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState('');
  const [isDismissed, setIsDismissed] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const dismissed = localStorage.getItem('verification-banner-dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleResendEmail = async () => {
    setIsResending(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('验证邮件已重新发送！请检查您的邮箱。');
      } else {
        setMessage(data.error || '发送失败，请稍后重试');
      }
    } catch (error) {
      console.error('Resend email error:', error);
      setMessage('发送失败，请稍后重试');
    } finally {
      setIsResending(false);
    }
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <svg
              className="w-5 h-5 text-amber-600 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-amber-900">
                <span className="font-medium">请验证您的邮箱</span>
                {' - '}
                我们已向 <span className="font-medium">{userEmail}</span> 发送了验证邮件
              </p>
              {message && (
                <p className="text-xs text-amber-700 mt-1">{message}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className="text-sm font-medium text-amber-900 hover:text-amber-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isResending ? '发送中...' : '重新发送'}
            </button>
            <button
              onClick={() => {
                setIsDismissed(true);
                localStorage.setItem('verification-banner-dismissed', 'true');
              }}
              className="text-amber-600 hover:text-amber-800 p-1"
              aria-label="关闭"
            >
              <svg
                className="w-4 h-4"
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
