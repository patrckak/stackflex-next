"use client";

import { ModeToggle } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);
  const router = useRouter();

  const handleClick = (e: MouseEvent, p: string) => {
    e.preventDefault();
    if (p == "login") {
      router.push("/api/auth/signin");
    }
    if (p == "logout") {
      router.push("/api/auth/signout");
    }
    if (p == "register") {
      router.push("/new/account");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center gap-8">
      <ModeToggle />
      {session?.user?.name ? (
        <>
          <h6>Olá, {session?.user?.name}</h6>
          <Avatar>
            <AvatarImage src={session?.user?.image} />
          </Avatar>
          <Button onClick={(e) => handleClick(e, "logout")}>Sair</Button>
        </>
      ) : (
        <>
          <Button onClick={(e) => handleClick(e, "login")}>Entrar</Button>
          <Button onClick={(e) => handleClick(e, "register")}>
            Criar conta
          </Button>
        </>
      )}
    </div>
  );
}
