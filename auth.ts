import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import { getUserAuth } from "@/lib/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(Prisma),
  secret: process.env.AUTH_SECRET,
  callbacks: {
    //TODO: passar dados do usuário via session
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
