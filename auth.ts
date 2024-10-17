import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import { getUserAuth } from "@/lib/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(Prisma),
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      /* Step 1: update the token based on the user object */
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.isVerified = user.isVerified;
        token.role = user.role;
        token.storeId = user.storeId;
      }
      return token;
    },
    session({ session, token }) {
      /* Step 2: update the session.user based on the token object */
      if (token && session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.isVerified = token.isVerified;
        session.user.role = token.role;
        session.user.storeId = token.storeId;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    Credentials({
      credentials: {
        user: { label: "CPF", name: "user" },
        password: { label: "Senha", type: "password", name: "password" },
      },

      authorize: async (credentials) => {
        const c = {
          cpf: credentials?.user,
          password: credentials?.password,
        };

        if (c) {
          let user = await getUserAuth(c.cpf, c.password);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
