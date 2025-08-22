import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { AdminSidebarWrapper } from "./(components)/sidebar";
import AuthProvider from "./(context)/AuthProvider";

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
    <AuthProvider tenant_id={user.tenant_id} user={user}>
      <AdminSidebarWrapper>{children}</AdminSidebarWrapper>
    </AuthProvider>
  );
}
