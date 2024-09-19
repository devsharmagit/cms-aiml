import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db";

const handler = NextAuth({
  providers:[
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session:{strategy: "jwt"},
  adapter: PrismaAdapter(prisma),
})

export { handler as GET, handler as POST }