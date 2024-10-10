import { prisma } from "@/lib/prisma";
import { auth } from "../../auth";

export async function getSession() {
  const session = await auth();
  if (!session?.user) return null;
  return session?.user;
}

export async function createUser(data: any) {
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
