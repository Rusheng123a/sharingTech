import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const authConfig: NextAuthOptions = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    jwt({ token, user }: { token: JWT; user: User | null }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    }
  },
  session: {
    strategy: "jwt",
  },
}; 
