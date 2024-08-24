import { db } from "@/lib/db/index";
import { CustomUser, getServerSession, NextAuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";

export type AuthSession = {
  session: {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
    };
  } | null;
};

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        
      },
      authorize: async (credentials) => {

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          // Asegúrate de que el tipo de `id` sea string
          return { id: user.id.toString(), email: user.email, name: user.name, emailVerified: user.emailVerified };

        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {

      session.user = {
        id: user?.id || String(token?.id) || '',
        name: user?.name || session.user.name,
        email: user?.email || session.user.email,
        emailVerified: Boolean(token?.emailVerified) || Boolean(user?.emailVerified) || false,
      };

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Asegurarse de que `user` tenga la propiedad `emailVerified` antes de asignarla
        if ("emailVerified" in user) {
          token.emailVerified = (user as unknown as CustomUser).emailVerified;
        }
        // token.emailVerified = user.emailVerified;
      }
      return token;
    },
  },
  
};

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session } as AuthSession ;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect("/sign-in");
};
