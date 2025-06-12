'use client';

import { TenantContext } from './tenant-context';

export default function TenantProvider({
  tenant_id,
  role,
  children,
}: {
  tenant_id: string;
  role: string;
  children: React.ReactNode;
}) {
  return (
    <TenantContext.Provider value={{ tenant_id, role }}>
      {children}
    </TenantContext.Provider>
  );
}
