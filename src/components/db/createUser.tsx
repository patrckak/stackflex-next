"use server";

import { prisma } from "@/lib/prisma";
import { HashPassword } from "./crypt";
import z from "zod";

export async function createUser(data: any) {
  const { cpf, username, email, avatarurl, password, passwdr } = data;

  const user = z.object({
    cpf: z.number().max(11).nonnegative(),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const userExits = await prisma.user.findUnique({ where: { id: cpf } });
  //* cpf não existe.
  if (!userExits) {
    //* senhas são iguais
    if (password === passwdr) {
      let hash = await HashPassword(password);
      if (hash) {
        // TODO: fazer verificações com zod.

        let userCreated = await prisma.user.create({
          data: {
            id: cpf,
            username: username,
            email: email,
            avatar: avatarurl,
            password: hash,
          },
        });
        if (userCreated) return { status: 1, msg: "Registrado." };
      }
    } else {
      return { status: 0, msg: "Senhas não são idênticas." };
    }
  } else {
    return { status: 0, msg: "CPF já está registrado." };
  }
}
