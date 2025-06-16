import { redirect } from 'next/navigation';
import { Sidebar } from '../(components)/sidebar';
import { createClient } from '@/utils/supabase/server';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error: authUserError } = await supabase.auth.getUser();

  if (authUserError || !data?.user) {
    redirect('/admin/login');
  }

  const { data: user, error } = await supabase
    .from('superusers')
    .select('*')
    .eq('auth_user_id', data.user.id)
    .single();

  if (error || !user) {
    console.error(error);
    redirect('/admin/login');
  }

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex-1'>{children}</div>
    </div>
  );
}
