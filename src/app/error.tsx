'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 可以将错误记录到错误报告服务
    console.error('全局错误:', error);
  }, [error]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A0E27 0%, #141B3D 50%, #1E2749 100%)'
      }}
    >
      {/* 背景网格 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(var(--color-neon-magenta) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-neon-magenta) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* 错误图标动画 */}
      <div className="absolute top-20 left-20 opacity-20" style={{ animation: 'float 6s ease-in-out infinite' }}>
        <div className="w-16 h-16 rounded" style={{
          background: 'var(--color-neon-magenta)',
          boxShadow: '0 0 40px var(--color-neon-magenta)',
          animation: 'rotate 20s linear infinite'
        }}></div>
      </div>
      <div className="absolute bottom-20 right-20 opacity-20" style={{ animation: 'float 6s ease-in-out infinite 3s' }}>
        <div className="w-12 h-12 rounded-full" style={{
          background: 'var(--color-neon-cyan)',
          boxShadow: '0 0 40px var(--color-neon-cyan)'
        }}></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* 错误图标 */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div 
              className="text-[120px] font-bold leading-none"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-neon-magenta)',
                textShadow: `
                  0 0 20px var(--color-neon-magenta),
                  0 0 40px var(--color-neon-magenta),
                  0 0 60px var(--color-neon-magenta)
                `,
                animation: 'glitch 3s infinite'
              }}
            >
              ⚠
            </div>
            {/* 闪烁效果 */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle, transparent 30%, rgba(255, 0, 229, 0.1) 70%)',
                animation: 'pulse 2s ease-in-out infinite'
              }}
            ></div>
          </div>
        </div>

        {/* 错误信息 */}
        <div className="mb-8">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-text-primary)',
              textShadow: '0 0 15px var(--color-neon-magenta)'
            }}
          >
            系统错误
          </h1>
          <p 
            className="text-lg md:text-xl mb-6"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            程序遇到了意外错误，正在尝试重新连接...
          </p>
          
          {/* 错误详情 */}
          {error.message && (
            <div 
              className="text-left p-4 rounded-lg mb-6"
              style={{
                background: 'rgba(255, 0, 229, 0.1)',
                border: '1px solid var(--color-neon-magenta)',
                boxShadow: '0 0 10px rgba(255, 0, 229, 0.2)'
              }}
            >
              <p 
                className="text-sm font-mono"
                style={{ color: 'var(--color-neon-magenta)' }}
              >
                错误代码: {error.digest || 'UNKNOWN'}
              </p>
              <p 
                className="text-sm font-mono mt-2"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                {error.message}
              </p>
            </div>
          )}
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* 重试按钮 */}
          <button
            onClick={reset}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-lg transition-all duration-300"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-neon-green)',
              border: '2px solid var(--color-neon-green)',
              background: 'rgba(0, 255, 159, 0.1)',
              boxShadow: `
                0 0 20px rgba(0, 255, 159, 0.3),
                inset 0 0 20px rgba(0, 255, 159, 0.1)
              `
            }}
          >
            <svg 
              className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              style={{ filter: 'drop-shadow(0 0 5px var(--color-neon-green))' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span style={{ textShadow: '0 0 10px var(--color-neon-green)' }}>
              重试
            </span>
          </button>

          {/* 返回首页按钮 */}
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-lg transition-all duration-300"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-neon-cyan)',
              border: '2px solid var(--color-neon-cyan)',
              background: 'rgba(0, 245, 255, 0.1)',
              boxShadow: `
                0 0 20px rgba(0, 245, 255, 0.3),
                inset 0 0 20px rgba(0, 245, 255, 0.1)
              `
            }}
          >
            <svg 
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              style={{ filter: 'drop-shadow(0 0 5px var(--color-neon-cyan))' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span style={{ textShadow: '0 0 10px var(--color-neon-cyan)' }}>
              返回首页
            </span>
          </Link>
        </div>

        {/* 装饰元素 */}
        <div className="mt-12 flex justify-center gap-8 opacity-50">
          <div className="w-2 h-2 rounded-full" 
            style={{ 
              background: 'var(--color-neon-magenta)',
              boxShadow: '0 0 10px var(--color-neon-magenta)',
              animation: 'pulse 2s infinite'
            }}
          ></div>
          <div className="w-2 h-2 rounded-full" 
            style={{ 
              background: 'var(--color-neon-cyan)',
              boxShadow: '0 0 10px var(--color-neon-cyan)',
              animation: 'pulse 2s infinite 0.5s'
            }}
          ></div>
          <div className="w-2 h-2 rounded-full" 
            style={{ 
              background: 'var(--color-neon-green)',
              boxShadow: '0 0 10px var(--color-neon-green)',
              animation: 'pulse 2s infinite 1s'
            }}
          ></div>
        </div>
      </div>

      {/* 内联CSS动画 */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes glitch {
          0%, 90%, 100% { 
            opacity: 1;
            transform: translate(0);
          }
          92% {
            opacity: 0.8;
            transform: translate(-2px, 2px);
          }
          94% {
            opacity: 0.9;
            transform: translate(2px, -2px);
          }
          96% {
            opacity: 0.8;
            transform: translate(-2px, -2px);
          }
          98% {
            opacity: 0.9;
            transform: translate(2px, 2px);
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}
