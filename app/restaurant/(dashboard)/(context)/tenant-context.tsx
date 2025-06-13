'use client';

import { User } from '@/lib/types/user';
import { createContext, useContext } from 'react';

export const TenantContext = createContext<{
  tenant_id: string;
  user: User;
} | null>(null);

export function useTenant() {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error('TenantContext not found');
  return ctx;
}
