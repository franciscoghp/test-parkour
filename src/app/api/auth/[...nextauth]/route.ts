import { DefaultSession, User as NextAuthUser } from "next-auth";
import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth/utils";

declare module "next-auth" {

  interface CustomUser extends NextAuthUser {
    emailVerified?: boolean;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
    };
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
