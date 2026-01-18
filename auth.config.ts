import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = (auth?.user as any)?.role;
      
      const isOnDashboard = nextUrl.pathname.startsWith('/mis-ferias') || 
                           nextUrl.pathname.startsWith('/mis-productos');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnNewFeria = nextUrl.pathname === '/ferias/nueva';

      // Rutas de admin requieren estar logueado y ser admin
      if (isOnAdmin) {
        if (!isLoggedIn) return false;
        if (userRole !== 'admin') return false;
        return true;
      }

      // Rutas protegidas requieren estar logueado
      if (isOnDashboard || isOnNewFeria) {
        return isLoggedIn;
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'user';
      }

      if (trigger === 'update' && session) {
        token.role = session.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
