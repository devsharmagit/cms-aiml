import  {   NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db";
import { JWT } from "next-auth/jwt";



export const authOption : NextAuthOptions= {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
      session: async ({ session, token }: { session: Session; token: JWT }) => {
        if (token && session.user) {
          session.user.id = token.sub;
          session.user.email = token.email;
        }
        return session;
      },
      signIn: async ({ user }: { user: User;  }) => {
        if(user.email === "devsharmasoe@gmail.com" || user.email?.includes("@iilm.edu")){
          return true;
        }else{
          return false;
        }
      },
      
    },
    session: {
      strategy: "jwt"
    }
    
  };