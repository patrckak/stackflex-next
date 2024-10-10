import { prisma } from "@/lib/prisma";
import { auth } from "../../auth";
import bcrypt from "bcrypt";

export async function getSession() {
  const session = await auth();
  if (!session?.user) return null;
  return session?.user;
}

export async function getUserAuth(cpf: any, password: any) {
  let userExits = await prisma.user.findUnique({ where: { id: cpf } });
  if (userExits) {
    if (userExits.password == password) {
      return userExits;
    } else {
      return null;
    }
  }
  return null;
}

export async function createUser(data: any) {
  const { cpf, username, email, avatarurl, password } = data;
  let userExits = await prisma.user.findUnique({ where: { id: cpf } });

  //* cpf não existe.
  if (!userExits) {
    let salt = bcrypt.genSalt(10);
    let hashedPassword = bcrypt.hash(password, salt, async (e, result) => {
      if (result) {
        // criar usuário no prisma
      }
    });
    return {
      status: 1,
      msg: "Usuário registrado, assim que possível verifique seu e-mail.",
    };
  } else {
    return { status: 0, msg: "CPF já cadastrado." };
  }
}
