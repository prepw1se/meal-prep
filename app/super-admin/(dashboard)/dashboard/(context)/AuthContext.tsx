'use client';

import { User } from '@/lib/types/user';
import { createContext, useContext } from 'react';

export const AuthContext = createContext<{
  user: User;
} | null>(null);

export function useAdmin() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthContext not found');
  return ctx;
}
