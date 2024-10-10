"use client";

import { ModeToggle } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const handleClick = (e: MouseEvent, p: string) => {
    e.preventDefault();
    if (p == "login") {
      router.push("/api/auth/signin");
    }
  };

  return (
    <>
      <Button onClick={(e) => handleClick(e, "login")}>Entrar</Button>
      <ModeToggle />
    </>
  );
}
