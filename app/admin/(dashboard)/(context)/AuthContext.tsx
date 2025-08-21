"use client";

import { createContext, useContext } from "react";
import { User } from "@/lib/types/user";

export const AuthContext = createContext<{
  tenant_id: string;
  user: User;
} | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext not found");
  return ctx;
}
