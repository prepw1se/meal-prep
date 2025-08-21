"use client";

import { User } from "@/lib/types/user";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({
  tenant_id,
  user,
  children,
}: {
  tenant_id: string;
  user: User;
  children: React.ReactNode;
}) {
  return (
    <AuthContext.Provider value={{ tenant_id, user }}>
      {children}
    </AuthContext.Provider>
  );
}
