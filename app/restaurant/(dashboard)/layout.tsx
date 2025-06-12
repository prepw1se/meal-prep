import { createClient } from '@/utils/supabase/server';
import { Sidebar } from './(components)/sidebar';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/restaurant/login');
  }

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex-1'>{children}</div>
    </div>
  );
}
