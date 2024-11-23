"use client";
import { useSession } from "next-auth/react";
import Layout from "./layout";
import { redirect } from "next/navigation";
import ThemedSection from "@/components/ui/themedSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccountRegister() {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <Layout>
        <ThemedSection>
          <Link href="/" className="absolute left-10 top-10">
            <Button variant="secondary">Voltar</Button>
          </Link>
        </ThemedSection>
      </Layout>
    );
  } else {
    redirect("/app/dashboard");
  }
}
