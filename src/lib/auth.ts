import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";

// 检查必需的环境变量
if (!process.env.NEXTAUTH_SECRET) {
  console.warn('⚠️ NEXTAUTH_SECRET 未配置，请设置环境变量')
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "手机号登录",
      credentials: {
        phone: { label: "手机号", type: "text", placeholder: "请输入手机号" },
        code: { label: "验证码", type: "text", placeholder: "请输入验证码" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.code) {
          return null;
        }

        // TODO: 验证短信验证码
        // 临时方案：任意6位数字都可以登录
        if (credentials.code.length !== 6) {
          return null;
        }

        // 查找或创建用户
        let user = await prisma.user.findUnique({
          where: { id: credentials.phone },
        });

        if (!user) {
          // 创建新用户
          user = await prisma.user.create({
            data: {
              id: credentials.phone,
              phone: credentials.phone,
              nickname: `用户${credentials.phone.slice(-4)}`,
            },
          });
        }

        return {
          id: user.id,
          name: user.nickname,
          email: user.phone,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
