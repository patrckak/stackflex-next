"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "@/components/ui/header-session";
import Layout from "./layout";
import ThemedSection from "../../../../components/ui/themedSection";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-provider";

export default function Dashboard() {
  const {
    data: session,
    status,
    update,
  } = useSession({
    required: true,
  });
  if (session) {
    return (
      <Layout>
        <Header session={session} />
        <ThemedSection>Olá {session.user?.name}</ThemedSection>
        <span className="absolute">
          <ModeToggle />
        </span>
      </Layout>
    );
  } else {
    return <></>;
  }
}
