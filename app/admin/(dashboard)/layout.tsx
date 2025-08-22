import { redirect } from "next/navigation";
import { createClient } from '@/utils/supabase/server';
import AuthProvider from "./(context)/AuthProvider";
import { Sidebar } from "./(components)/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error: authUserError } = await supabase.auth.getUser();

  if (authUserError || !data?.user) {
    redirect("/admin/login");
  }

  console.log("AUTH USER ROLE: ", data.user.user_metadata.role);

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_user_id", data.user.id)
    .single();

  if (error || !user) {
    console.error(error);
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <AuthProvider tenant_id={user.tenant_id} user={user}>
        <Sidebar />
        <div className="flex-1">{children}</div>
      </AuthProvider>
    </div>
  );
}
