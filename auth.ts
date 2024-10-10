import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";

interface CredentialInput {
  user: any;
  password: any;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(Prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        user: { label: "Usuário", name: "user" },
        password: { label: "Senha", type: "password", name: "password" },
        async authorize(c: any) {
          const user = await prisma?.users.findFirst({
            where: { name: c.user },
          });
          let { name }: any = user;
          if (c.user == name) {
            return {
              name: name,
            };
          }
          if (!user) {
            throw new Error("User not found.");
          }
        },
      },
    }),
  ],
});
