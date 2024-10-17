import { prisma } from "@/lib/prisma";
import { auth } from "../../auth";
import { ComparePasswords } from "@/components/db/crypt";

export async function getSession() {
  const session = await auth();
  if (!session?.user) return null;
  return session?.user;
}

export async function getUserAuth(cpf: any, password: any) {
  let userExits = await prisma.user.findUnique({ where: { id: cpf } });
  if (userExits) {
    const passwordMatch = await ComparePasswords(password, userExits.password);
    if (passwordMatch) {
      return {
        id: userExits.id,
        name: userExits.username,
        image: userExits.avatar,
        role: userExits.type,
        email: userExits.email,
        isVerified: userExits.isVerificated,
      };
    } else {
      return null;
    }
  }
  return null;
}
