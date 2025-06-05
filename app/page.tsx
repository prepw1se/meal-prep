import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const { data: tenants } = await supabase.from('tenants').select();
  return (
    <main>
      <h1>Tenants</h1>
      <ul>
        {tenants?.map((tenant) => (
          <li key={tenant.id}>{tenant.name}</li>
        ))}
      </ul>
    </main>
  );
}
