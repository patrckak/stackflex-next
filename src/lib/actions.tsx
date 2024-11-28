import { prisma } from "@/lib/prisma";
import { auth } from "../../auth";
import { ComparePasswords } from "@/components/db/crypt";

export async function getSession() {
  const session = await auth();
  if (!session?.user) return null;
  return session?.user;
}

export async function validarCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, ""); // Remove tudo que não for dígito

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false; // Verifica se o CPF tem 11 dígitos e não é sequência de números iguais
  }

  let soma = 0;
  let resto;

  // Validação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  // Validação do segundo dígito verificador
  for (let i = 1; i <= 10; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

export async function testRawQuery() {
  let res = await prisma.$queryRaw`SELECT * FROM user`;
  console.log(res);
}

export async function createEstimate(data: any) {
  const { cpf, date, desc, client, clientNumber, clientAddress } = data;
}

export async function getUserAuth(cpf: any, password: any) {
  let userExits = await prisma.user.findUnique({ where: { public_id: cpf } });
  if (userExits) {
    const passwordMatch = await ComparePasswords(password, userExits.password);
    if (passwordMatch) {
      return {
        id: userExits.id,
        name: userExits.firstname,
        image: userExits.avatar,
        email: userExits.email,
        isVerified: userExits.isVerificated,
      };
    } else {
      return null;
    }
  }
  return null;
}
