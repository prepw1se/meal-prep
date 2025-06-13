import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import TenantProvider from './(context)/TenantProvider';
import { Sidebar } from './(components)/sidebar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error: authUserError } = await supabase.auth.getUser();

  if (authUserError || !data?.user) {
    redirect('/restaurant/login');
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_user_id', data.user.id)
    .single();

  if (error || !user) {
    console.error(error);
    redirect('/restaurant/login');
  }

  return (
    <div className='flex min-h-screen'>
      <TenantProvider tenant_id={user.tenant_id} user={user}>
        <Sidebar />
        <div className='flex-1'>{children}</div>
      </TenantProvider>
    </div>
  );
}
