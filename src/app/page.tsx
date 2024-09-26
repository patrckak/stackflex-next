"use client";

import { ModeToggle } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

export default function Home() {
  const { toast } = useToast();
  const router = useRouter();

  const handleClick = (e: MouseEvent, p: string) => {
    e.preventDefault();
    if (p == "login") {
      router.push("/auth/login");
    } else if (p == "register") {
      router.push("/auth/register");
    }
  };

  const [registerData, setRegisterData] = useState({
    name: String,
    email: String,
    cep: BigInt,
    storeID: BigInt,
    cpf: BigInt,
    cnpj: BigInt,
  });

  async function handleClickUsers() {}

  return (
    <>
      <Button onClick={(e) => handleClick(e, "login")}>Entrar</Button>
      <Button onClick={(e) => handleClickUsers()}>Listar Usuários</Button>
      <Button onClick={(e) => handleClick(e, "register")}>Registrar</Button>

      <ModeToggle />
    </>
  );
}
