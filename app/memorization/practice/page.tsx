'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Poem = {
  id: number;
  title: string;
  content: string;
  poet: {
    name: string;
  };
  dynasty: {
    name: string;
  };
};

type Memorization = {
  id: number;
  masteryLevel: string;
  interval: number;
  repetitions: number;
  totalReviews: number;
  correctReviews: number;
  poem: Poem;
};

type ReviewResponse = 'again' | 'hard' | 'good' | 'easy';

export default function PracticePage() {
  const router = useRouter();
  const [memorization, setMemorization] = useState<Memorization | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    fetchNextReview();
  }, []);

  const fetchNextReview = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/memorization/review');

      if (response.status === 401) {
        router.push('/login?redirect=/memorization/practice');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch next review');
      }

      const data = await response.json();

      if (!data.nextReview) {
        setMemorization(null);
      } else {
        setMemorization(data.nextReview);
        setShowAnswer(false);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('加载失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async (response: ReviewResponse) => {
    if (!memorization) return;

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/memorization/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poemId: memorization.poem.id,
          response,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit review');
      }

      const data = await res.json();

      // Increment review count
      setReviewCount(prev => prev + 1);

      // Fetch next review
      await fetchNextReview();
    } catch (err) {
      console.error('Submit error:', err);
      alert('提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-zinc-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchNextReview}
            className="rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-700"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  if (!memorization) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="rounded-lg border border-zinc-200 bg-white p-12">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-2xl font-bold text-zinc-900 mb-2">
                太棒了！
              </h1>
              <p className="text-zinc-600 mb-2">
                您已完成所有今日复习
              </p>
              {reviewCount > 0 && (
                <p className="text-sm text-zinc-500 mb-6">
                  本次共复习 {reviewCount} 首诗词
                </p>
              )}
              <div className="flex gap-4 justify-center">
                <Link
                  href="/memorization"
                  className="rounded-lg bg-zinc-900 px-6 py-2 text-white hover:bg-zinc-800"
                >
                  返回背诵列表
                </Link>
                <Link
                  href="/explore"
                  className="rounded-lg border border-zinc-300 px-6 py-2 text-zinc-700 hover:bg-zinc-50"
                >
                  继续探索
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const masteryLevelConfig = {
    NEW: { label: '新增', color: 'bg-zinc-100 text-zinc-700' },
    LEARNING: { label: '学习中', color: 'bg-blue-100 text-blue-700' },
    YOUNG: { label: '熟悉', color: 'bg-green-100 text-green-700' },
    MATURE: { label: '掌握', color: 'bg-purple-100 text-purple-700' },
    MASTERED: { label: '精通', color: 'bg-amber-100 text-amber-700' },
  };

  const config = masteryLevelConfig[memorization.masteryLevel as keyof typeof masteryLevelConfig];

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/memorization"
              className="text-zinc-600 hover:text-zinc-900 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回
            </Link>
            <div className="flex items-center gap-4">
              {reviewCount > 0 && (
                <span className="text-sm text-zinc-600">
                  已复习 {reviewCount} 首
                </span>
              )}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                {config.label}
              </span>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-lg border border-zinc-200 bg-white p-8 shadow-lg">
            {/* Question */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">
                {memorization.poem.title}
              </h2>
              <p className="text-zinc-600">
                {memorization.poem.poet.name} · {memorization.poem.dynasty.name}
              </p>
            </div>

            {/* Content */}
            <div className="mb-8">
              {!showAnswer ? (
                <div className="text-center py-12">
                  <p className="text-zinc-500 mb-6">
                    请尝试回忆这首诗词的内容
                  </p>
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="rounded-lg bg-purple-600 px-8 py-3 text-white font-medium hover:bg-purple-700"
                  >
                    显示答案
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-8 whitespace-pre-line font-serif text-lg text-zinc-800 leading-relaxed">
                    {memorization.poem.content}
                  </div>

                  {/* Statistics */}
                  <div className="mb-8 grid grid-cols-3 gap-4 p-4 rounded-lg bg-zinc-50">
                    <div className="text-center">
                      <p className="text-sm text-zinc-600">复习次数</p>
                      <p className="text-xl font-bold text-zinc-900">{memorization.totalReviews}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-zinc-600">正确次数</p>
                      <p className="text-xl font-bold text-zinc-900">{memorization.correctReviews}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-zinc-600">正确率</p>
                      <p className="text-xl font-bold text-zinc-900">
                        {memorization.totalReviews > 0
                          ? Math.round((memorization.correctReviews / memorization.totalReviews) * 100)
                          : 0}%
                      </p>
                    </div>
                  </div>

                  {/* Review Buttons */}
                  <div>
                    <p className="text-sm text-zinc-600 mb-3 text-center">
                      您的掌握程度如何？
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                      <button
                        onClick={() => handleSubmitReview('again')}
                        disabled={isSubmitting}
                        className="rounded-lg bg-red-50 px-4 py-3 text-red-700 font-medium hover:bg-red-100 disabled:opacity-50"
                      >
                        <div className="text-sm">再来一次</div>
                        <div className="text-xs text-red-600 mt-1">&lt;1天</div>
                      </button>
                      <button
                        onClick={() => handleSubmitReview('hard')}
                        disabled={isSubmitting}
                        className="rounded-lg bg-amber-50 px-4 py-3 text-amber-700 font-medium hover:bg-amber-100 disabled:opacity-50"
                      >
                        <div className="text-sm">困难</div>
                        <div className="text-xs text-amber-600 mt-1">较短</div>
                      </button>
                      <button
                        onClick={() => handleSubmitReview('good')}
                        disabled={isSubmitting}
                        className="rounded-lg bg-green-50 px-4 py-3 text-green-700 font-medium hover:bg-green-100 disabled:opacity-50"
                      >
                        <div className="text-sm">良好</div>
                        <div className="text-xs text-green-600 mt-1">适中</div>
                      </button>
                      <button
                        onClick={() => handleSubmitReview('easy')}
                        disabled={isSubmitting}
                        className="rounded-lg bg-blue-50 px-4 py-3 text-blue-700 font-medium hover:bg-blue-100 disabled:opacity-50"
                      >
                        <div className="text-sm">简单</div>
                        <div className="text-xs text-blue-600 mt-1">较长</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
