"use client";

import { ModeToggle } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import HeaderPublic from "@/components/ui/header-public";

export default function Home() {
  return (
    <>
      <HeaderPublic />
      <section className="p-10 h-screen w-screen dark:bg-gray-700 bg-zinc-200 flex overflow-scroll justify-center items-center">
        <ModeToggle />
      </section>
    </>
  );
}
