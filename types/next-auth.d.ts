import { type DefaultSession } from "next-auth";

// nextauth.d.ts
declare module "next-auth" {
  interface User {
    id?: any;
    name?: any;
    email?: any;
    image?: any;
    isVerified?: any;
    role?: any;
    storeId?: any;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string;
    email?: string;
    image?: string;
    isVerified?: boolean;
    role?: number;
    storeId?: number;
  }
}
