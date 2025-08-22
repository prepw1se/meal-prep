"use client";

import {
  BarChart,
  Calendar,
  ChevronDown,
  ClipboardList,
  Home,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "../(context)/AuthContext";

const SIDEBAR_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/employees", label: "Employees", icon: Users },
  { href: "/meals", label: "Meals", icon: ClipboardList },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/pipeline", label: "Pipeline", icon: Workflow },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/reports", label: "Reports", icon: BarChart },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const PATH = "/admin";
  const { user } = useAuth();
  const supabase = createClient();
  const [authUser, setAuthUser] = React.useState<any>(null);

  React.useEffect(() => {
    const getAuthUser = async () => {
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      setAuthUser(supabaseUser);
    };
    getAuthUser();
  }, [supabase]);

  if (pathname === "/") return null;

  const isActive = (path: string) =>
    pathname === `${PATH}${path}` || pathname.startsWith(`${PATH}${path}/`);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    redirect("/admin/login");
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };

  const avatarUrl = authUser?.user_metadata?.avatar_url;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          href={`${PATH}/dashboard`}
          className="flex items-center gap-2 font-bold text-xl px-2"
        >
          <span className="text-green-600">Prep</span>
          <span>Master</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_LINKS.map(({ href, label, icon: Icon }) => {
                const fullPath = `${PATH}${href}`;
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(href)}
                      tooltip={label}
                    >
                      <Link href={fullPath}>
                        <Icon />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="size-8">
                    <AvatarImage src={avatarUrl} alt={user?.name || user?.email || "User"} />
                    <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                      {getInitials(user?.name, user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="size-6">
                      <AvatarImage src={avatarUrl} alt={user?.name || user?.email || "User"} />
                      <AvatarFallback>
                        {getInitials(user?.name, user?.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.name}
                      </span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AdminSidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="w-full min-h-screen p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
