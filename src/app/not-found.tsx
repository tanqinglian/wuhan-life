'use client';

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A0E27 0%, #141B3D 50%, #1E2749 100%)'
      }}>
      
      {/* 背景网格动画 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(var(--color-neon-cyan) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-neon-cyan) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      <div className="relative z-10 text-center px-6">
        {/* 404数字 */}
        <div className="mb-8">
          <h1 
            className="text-[150px] md:text-[200px] font-bold leading-none"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'transparent',
              WebkitTextStroke: '2px var(--color-neon-cyan)',
              textShadow: `
                0 0 20px var(--color-neon-cyan),
                0 0 40px var(--color-neon-cyan),
                0 0 60px var(--color-neon-magenta)
              `,
              animation: 'glitch 3s infinite'
            }}
          >
            404
          </h1>
        </div>

        {/* 错误信息 */}
        <div className="mb-8">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-text-primary)',
              textShadow: '0 0 10px var(--color-neon-magenta)'
            }}
          >
            页面丢失在赛博空间
          </h2>
          <p 
            className="text-lg md:text-xl"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            抱歉，您访问的页面已被数字洪流冲走
          </p>
        </div>

        {/* 返回首页按钮 */}
        <Link
          href="/"
          className="group relative inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg transition-all duration-300"
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
          {/* 霓虹边框动画 */}
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(90deg, var(--color-neon-cyan), var(--color-neon-magenta), var(--color-neon-yellow), var(--color-neon-cyan))',
              backgroundSize: '300% 100%',
              animation: 'neonBorder 3s linear infinite',
              zIndex: -1
            }}
          ></span>
          
          {/* 箭头图标 */}
          <svg 
            className="w-6 h-6 transform group-hover:-translate-x-2 transition-transform duration-300"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            style={{ filter: 'drop-shadow(0 0 5px var(--color-neon-cyan))' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          
          <span style={{ textShadow: '0 0 10px var(--color-neon-cyan)' }}>
            返回首页
          </span>
        </Link>

        {/* 装饰元素 */}
        <div className="mt-12 flex justify-center gap-8 opacity-50">
          <div className="w-2 h-2 rounded-full" 
            style={{ 
              background: 'var(--color-neon-cyan)',
              boxShadow: '0 0 10px var(--color-neon-cyan)',
              animation: 'pulse 2s infinite'
            }}
          ></div>
          <div className="w-2 h-2 rounded-full" 
            style={{ 
              background: 'var(--color-neon-magenta)',
              boxShadow: '0 0 10px var(--color-neon-magenta)',
              animation: 'pulse 2s infinite 0.5s'
            }}
          ></div>
          <div className="w-2 h-2 rounded-full" 
            style={{ 
              background: 'var(--color-neon-yellow)',
              boxShadow: '0 0 10px var(--color-neon-yellow)',
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
        
        @keyframes neonBorder {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}
