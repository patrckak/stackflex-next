"use server";

import { prisma } from "@/lib/prisma";

export default async function GetAllUsers() {
  let usersData = await prisma.users.findMany();
  return usersData;
}
