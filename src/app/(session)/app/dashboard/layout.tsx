"use client";

import { SessionProvider } from "next-auth/react";

export default function Dashboard({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
