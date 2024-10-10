import { SessionProvider } from "next-auth/react";
import Dashboard from "./dashboard";

export default function dashboard() {
  return (
    <SessionProvider>
      <Dashboard />
    </SessionProvider>
  );
}
