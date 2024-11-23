"use client";

import ThemedSection from "@/components/ui/themedSection";
import { redirect } from "next/navigation";
import Header from "@/components/ui/header-session";
import Layout from "./layout";
import { useSession } from "next-auth/react";

export default function Servicos() {
  const { data: session, status } = useSession({ required: true });

  return (
    <Layout>
      <Header session={session} />
      <ThemedSection>novo servico</ThemedSection>
    </Layout>
  );
}
