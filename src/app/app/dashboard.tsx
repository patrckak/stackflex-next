"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  if (!session)
    return (
      <p className="flex flex-row justify-center items-center">
        Sem permissão.
      </p>
    );
  return <>olá {session.user?.email}</>;
}
