# 安全配置
# 创建时间：2026-03-07 23:01

import { NextRequest, NextResponse } from 'next/server';

// 安全Headers中间件
export function securityHeaders(request: NextRequest) {
  const response = NextResponse.next();

  // XSS防护
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // 防止点击劫持
  response.headers.set('X-Frame-Options', 'DENY');
  
  // 防止MIME类型嗅探
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Referrer策略
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // 权限策略
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  // Content Security Policy
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://webapi.amap.com; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https: http:; " +
      "font-src 'self' data:; " +
      "connect-src 'self' https://webapi.amap.com https://restapi.amap.com;"
    );
  }

  return response;
}

// 速率限制
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export function rateLimit(
  request: NextRequest,
  limit: number = 100,
  windowMs: number = 60000
): boolean {
  const ip = request.ip || 'unknown';
  const now = Date.now();
  
  const record = rateLimitMap.get(ip);
  
  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  // 检查是否在时间窗口内
  if (now - record.timestamp > windowMs) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  // 检查是否超过限制
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}

// 输入验证
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// SQL注入检查
export function checkSQLInjection(input: string): boolean {
  const sqlKeywords = [
    'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP',
    'UNION', 'OR', 'AND', '--', ';', '/*', '*/'
  ];
  
  const upperInput = input.toUpperCase();
  return sqlKeywords.some(keyword => upperInput.includes(keyword));
}

// XSS检查
export function checkXSS(input: string): boolean {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
  ];
  
  return xssPatterns.some(pattern => pattern.test(input));
}

// CSRF Token生成
export function generateCSRFToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// 验证CSRF Token
export function verifyCSRFToken(
  request: NextRequest,
  token: string
): boolean {
  const sessionToken = request.cookies.get('csrf_token')?.value;
  return sessionToken === token;
}
