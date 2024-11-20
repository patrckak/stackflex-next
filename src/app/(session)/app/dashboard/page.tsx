"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "@/components/ui/header-session";
import Layout from "./layout";
import ThemedSection from "../../../../components/ui/themedSection";
import { Button } from "@/components/ui/button";

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
      </Layout>
    );
  } else {
    return <></>;
  }
}
