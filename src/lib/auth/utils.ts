import { db } from "@/lib/db/index";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { CustomUser, DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { redirect } from "next/navigation";
import bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";

// declare module "next-auth" {
//   interface Session {
//     user: DefaultSession["user"] & {
//       id: string;
//       name: string;
//       email: string;
//       emailVerified: boolean;
//     };
//   }
// }

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
        console.log({credentials})
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });
        console.log(user)
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          console.log({ id: user.id.toString(), email: user.email, name: user.name, emailVerified: user.emailVerified })
          // Asegúrate de que el tipo de `id` sea string
          return { id: user.id.toString(), email: user.email, name: user.name, emailVerified: user.emailVerified };

        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      console.log({ session, token, user })
      console.log(Boolean(user?.emailVerified) )
      console.log(Boolean(token?.emailVerified ))
      session.user = {
        id: user?.id || String(token?.id) || '',
        name: user?.name || session.user.name,
        email: user?.email || session.user.email,
        emailVerified: Boolean(token?.emailVerified) || Boolean(user?.emailVerified) || false,
      };
      console.log(session)
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
      console.log(token)
      return token;
    },
  },
  
};

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  console.log({ session } as AuthSession)
  return { session } as AuthSession ;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  console.log(session)
  if (!session) redirect("/sign-in");
};



export const signUpUser = async (email: string, password: string) => {
  try {
    console.log('signUpUser')
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new Error('Error signing up user');
  }
};
