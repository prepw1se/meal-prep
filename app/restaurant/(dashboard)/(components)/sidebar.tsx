'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@/lib/types/user';

const SIDEBAR_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/employees', label: 'Employees', icon: Users },
  { href: '/meals', label: 'Meals', icon: ClipboardList },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/pipeline', label: 'Pipeline', icon: Workflow },
  { href: '/inventory', label: 'Inventory', icon: Package },
  { href: '/schedule', label: 'Schedule', icon: Calendar },
  { href: '/reports', label: 'Reports', icon: BarChart },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const PATH = '/restaurant';

  if (pathname === '/') return null;

  const isActive = (path: string) =>
    pathname === `${PATH}${path}` || pathname.startsWith(`${PATH}${path}/`);

  return (
    <div>
      <div className='hidden border-r bg-background md:block md:w-64'>
        <div className='flex h-16 items-center border-b px-4'>
          <Link
            href={`${PATH}/dashboard`}
            className='flex items-center gap-2 font-bold text-xl'
          >
            <span className='text-green-600'>Prep</span>
            <span>Master</span>
          </Link>
        </div>
        <div className='flex flex-col gap-1 p-4'>
          {SIDEBAR_LINKS.map(({ href, label, icon: Icon }) => {
            const fullPath = `${PATH}${href}`;
            return (
              <Link key={href} href={fullPath}>
                <Button
                  variant={isActive(href) ? 'secondary' : 'ghost'}
                  className='w-full justify-start'
                >
                  <Icon className='mr-2 h-4 w-4' />
                  {label}
                </Button>
              </Link>
            );
          })}
        </div>
        <div className='absolute bottom-4 left-4 right-4'>
          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div className='flex items-center gap-2'>
              <div className='h-8 w-8 rounded-full bg-muted' />
              <div>
                <p className='text-sm font-medium'>{user.name}</p>
                <p className='text-xs text-muted-foreground'>{user.email}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <ChevronDown className='h-4 w-4' />
                  <span className='sr-only'>Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-1'>
        <header className='sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
          <div className='flex-1' />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className='relative h-8 md:hidden'
              >
                <span>{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      </div>
    </div>
  );
}
