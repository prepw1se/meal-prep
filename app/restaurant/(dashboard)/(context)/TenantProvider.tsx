'use client';

import { User } from '@/lib/types/user';
import { TenantContext } from './tenant-context';

export default function TenantProvider({
  tenant_id,
  user,
  children,
}: {
  tenant_id: string;
  user: User;
  children: React.ReactNode;
}) {
  return (
    <TenantContext.Provider value={{ tenant_id, user }}>
      {children}
    </TenantContext.Provider>
  );
}
