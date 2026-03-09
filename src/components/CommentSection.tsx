'use client';

import { useState } from 'react';

interface CommentSectionProps {
  targetType: 'market' | 'route';
  targetId: number;
}

export default function CommentSection({ targetType, targetId }: CommentSectionProps) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="mt-8">
      {/* 评论入口按钮 */}
      <button
        onClick={() => setShowComments(!showComments)}
        className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
        style={{
          background: 'rgba(255, 215, 0, 0.1)',
          border: '2px solid #FFD700',
          color: '#FFD700',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
        }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span>{showComments ? '收起评论' : '查看评论'}</span>
      </button>

      {/* 评论区域 */}
      {showComments && (
        <div
          className="mt-6 p-6 rounded-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(0, 245, 255, 0.2)',
          }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#00F5FF' }}>
            用户评论
          </h3>

          {/* 评论输入 */}
          <div className="mb-6">
            <textarea
              placeholder="写下你的评论..."
              className="w-full p-4 rounded-lg bg-transparent border resize-none"
              style={{
                borderColor: 'rgba(0, 245, 255, 0.3)',
                color: '#FFFFFF',
              }}
              rows={3}
            />
            <button
              className="mt-2 px-4 py-2 rounded-lg font-medium"
              style={{
                background: 'linear-gradient(135deg, #00F5FF 0%, #00D4FF 100%)',
                color: '#0A0E27',
              }}
            >
              发表评论
            </button>
          </div>

          {/* 评论列表（模拟数据） */}
          <div className="space-y-4">
            <div
              className="p-4 rounded-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium" style={{ color: '#FF00E5' }}>
                  赛博骑士
                </span>
                <span className="text-sm" style={{ color: '#666' }}>
                  2026-03-09
                </span>
              </div>
              <p style={{ color: '#CCCCCC' }}>很棒的地方，推荐大家去看看！</p>
            </div>

            <div
              className="p-4 rounded-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium" style={{ color: '#00F5FF' }}>
                  夜行者
                </span>
                <span className="text-sm" style={{ color: '#666' }}>
                  2026-03-08
                </span>
              </div>
              <p style={{ color: '#CCCCCC' }}>美食很多，价格实惠，值得再来！</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-center" style={{ color: '#666' }}>
            💡 登录后可发表评论
          </p>
        </div>
      )}
    </div>
  );
}
