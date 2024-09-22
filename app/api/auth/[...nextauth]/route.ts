import NextAuth, { Session, AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db";
import { JWT } from "next-auth/jwt";

export const authOption: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt", // This ensures TypeScript recognizes this as a valid strategy
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (token && session.user) {
        session.user.id = token.sub;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST, handler as OPTIONS };
