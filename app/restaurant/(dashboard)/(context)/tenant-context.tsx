'use client';

import { createContext, useContext } from 'react';

export const TenantContext = createContext<{
  tenant_id: string;
  role: string;
} | null>(null);

export function useTenant() {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error('TenantContext not found');
  return ctx;
}
