import { createClient } from '@/utils/supabase/server';
import { Sidebar } from './(components)/sidebar';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
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

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <div className='flex min-h-screen'>
      <Sidebar user={user} />
      <div className='flex-1'>{children}</div>
    </div>
  );
}
