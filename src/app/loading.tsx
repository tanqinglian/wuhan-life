'use client';

export default function Loading() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A0E27 0%, #141B3D 50%, #1E2749 100%)'
      }}
    >
      {/* 背景网格 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(var(--color-neon-cyan) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-neon-cyan) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="relative z-10 text-center">
        {/* 主加载动画 - 多环霓虹效果 */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* 外环 - Cyan */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              border: '3px solid transparent',
              borderTopColor: 'var(--color-neon-cyan)',
              boxShadow: '0 0 20px var(--color-neon-cyan)',
              animation: 'spin 1.5s linear infinite'
            }}
          ></div>
          
          {/* 中环 - Magenta */}
          <div 
            className="absolute inset-2 rounded-full"
            style={{
              border: '3px solid transparent',
              borderTopColor: 'var(--color-neon-magenta)',
              boxShadow: '0 0 20px var(--color-neon-magenta)',
              animation: 'spin 2s linear infinite reverse'
            }}
          ></div>
          
          {/* 内环 - Yellow */}
          <div 
            className="absolute inset-4 rounded-full"
            style={{
              border: '3px solid transparent',
              borderTopColor: 'var(--color-neon-yellow)',
              boxShadow: '0 0 20px var(--color-neon-yellow)',
              animation: 'spin 1s linear infinite'
            }}
          ></div>

          {/* 中心点 */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ animation: 'pulse 2s ease-in-out infinite' }}
          >
            <div 
              className="w-6 h-6 rounded-full"
              style={{
                background: 'var(--color-neon-green)',
                boxShadow: '0 0 30px var(--color-neon-green), 0 0 60px var(--color-neon-green)'
              }}
            ></div>
          </div>
        </div>

        {/* 加载文字 */}
        <div className="space-y-3">
          <h2 
            className="text-2xl font-bold"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-text-primary)',
              textShadow: '0 0 10px var(--color-neon-cyan)'
            }}
          >
            系统加载中
          </h2>
          
          {/* 动态点 */}
          <div className="flex items-center justify-center gap-1">
            <span 
              className="w-2 h-2 rounded-full"
              style={{
                background: 'var(--color-neon-cyan)',
                boxShadow: '0 0 10px var(--color-neon-cyan)',
                animation: 'bounce 1.4s ease-in-out infinite'
              }}
            ></span>
            <span 
              className="w-2 h-2 rounded-full"
              style={{
                background: 'var(--color-neon-magenta)',
                boxShadow: '0 0 10px var(--color-neon-magenta)',
                animation: 'bounce 1.4s ease-in-out infinite 0.2s'
              }}
            ></span>
            <span 
              className="w-2 h-2 rounded-full"
              style={{
                background: 'var(--color-neon-yellow)',
                boxShadow: '0 0 10px var(--color-neon-yellow)',
                animation: 'bounce 1.4s ease-in-out infinite 0.4s'
              }}
            ></span>
          </div>
          
          <p 
            className="text-sm"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            正在连接赛博空间...
          </p>
        </div>
      </div>

      {/* 装饰性扫描线 */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 245, 255, 0.03) 2px, rgba(0, 245, 255, 0.03) 4px)',
          animation: 'scanlines 8s linear infinite'
        }}
      ></div>

      {/* 内联CSS动画 */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(0.95);
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          40% { 
            transform: scale(1.5);
            opacity: 0.8;
          }
        }
        
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
}
