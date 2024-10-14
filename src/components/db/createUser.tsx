"use server";

import { prisma } from "@/lib/prisma";
import { HashPassword } from "./crypt";
import { gerarValidação } from "./genValidation";

export async function createUser(
  data: any,
  useCNPJ: boolean,
  storeType: number
) {
  const {
    cpf,
    username,
    email,
    avatarurl,
    password,
    passwdr,
    cnpj,
    storeName,
    storeDescription,
  } = data;

  //? != undefined = cpf já cadastrado
  const userExits = await prisma.user.findUnique({ where: { id: cpf } });
  if (!userExits) {
    let hash = await HashPassword(password);

    if (hash) {
      if (useCNPJ) {
        var store = await prisma.store.create({
          data: {
            id: cnpj,
            name: storeName,
            type: storeType,
          },
        });
        if (store) {
          let user = await prisma.user.create({
            data: {
              id: cpf,
              username: username,
              email: email,
              avatar: avatarurl,
              password: hash,
              verification: await gerarValidação(),
              storeId: store.id,
              enterpriseAccount: true,
            },
          });
          if (user) return { status: 1, msg: "Registro criado." };
        }
      } else {
        let user = await prisma.user.create({
          data: {
            id: cpf,
            username: username,
            email: email,
            avatar: avatarurl,
            verification: await gerarValidação(),
            password: hash,
          },
        });
        if (user) return { status: 1, msg: "Registro criado." };
      }
    } else {
      return { status: 0, msg: "Erro interno, Código 001" };
    }
    // do
  } else {
    return { status: 0, msg: "CPF já registrado." };
  }
}
