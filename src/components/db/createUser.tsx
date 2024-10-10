"use server";

import { prisma } from "@/lib/prisma";

export default async function CreateUser(data: any) {
  const { cpf, username, email, avatarurl, password } = data;
  let userExits = await prisma.user.findUnique({ where: { id: cpf } });

  //* cpf não existe.
  if (!userExits) {
    return {
      status: 1,
      msg: "Usuário registrado, assim que possível verifique seu e-mail.",
    };
  } else {
    return { status: 0, msg: "CPF já cadastrado." };
  }
}
