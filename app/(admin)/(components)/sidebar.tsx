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

export function Sidebar() {
  const pathname = usePathname();

  // Don't show sidebar on landing page
  if (pathname === '/') return null;

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className='flex min-h-screen'>
      <div className='hidden border-r bg-background md:block md:w-64'>
        <div className='flex h-16 items-center border-b px-4'>
          <Link
            href='/dashboard'
            className='flex items-center gap-2 font-bold text-xl'
          >
            <span className='text-green-600'>Prep</span>
            <span>Master</span>
          </Link>
        </div>
        <div className='flex flex-col gap-1 p-4'>
          <Link href='/dashboard'>
            <Button
              variant={isActive('/dashboard') ? 'secondary' : 'ghost'}
              className='w-full justify-start'
            >
              <Home className='mr-2 h-4 w-4' />
              Dashboard
            </Button>
          </Link>
          <Link href='/customers'>
            <Button
              variant={isActive('/customers') ? 'secondary' : 'ghost'}
              className='w-full justify-start'
            >
              <Users className='mr-2 h-4 w-4' />
              Customers
            </Button>
          </Link>
          <Link href='/meals'>
            <Button
              variant={isActive('/meals') ? 'secondary' : 'ghost'}
              className='w-full justify-start'
            >
              <ClipboardList className='mr-2 h-4 w-4' />
              Meals
            </Button>
          </Link>
          <Link href='/orders'>
            <Button
              variant={isActive('/orders') ? 'secondary' : 'ghost'}
              className='w-full justify-start'
            >
              <ShoppingCart className='mr-2 h-4 w-4' />
              Orders
            </Button>
          </Link>
          <Link href='/pipeline'>
            <Button
              variant={isActive('/pipeline') ? 'secondary' : 'ghost'}
              className='w-full justify-start'
            >
              <Workflow className='mr-2 h-4 w-4' />
              Pipeline
            </Button>
          </Link>
          <Link href='/inventory'>
            <Button
              variant={isActive('/inventory') ? 'secondary' : 'ghost'}
              className='w-full justify-start'
            >
              <Package className='mr-2 h-4 w-4' />
              Inventory
            </Button>
          </Link>
          <Link href='/schedule'>
            <Button
              variant={isActive('/schedule') ? 'secondary' : 'ghost'}
              className='w-full justify-start'
            >
              <Calendar className='mr-2 h-4 w-4' />
              Schedule
            </Button>
          </Link>
          <Link href='/reports'>
            <Button
              variant={isActive('/reports') ? 'secondary' : 'ghost'}
              className='w-full justify-start'
            >
              <BarChart className='mr-2 h-4 w-4' />
              Reports
            </Button>
          </Link>
          <Link href='/settings'>
            <Button
              variant={isActive('/settings') ? 'secondary' : 'ghost'}
              className='w-full justify-start'
            >
              <Settings className='mr-2 h-4 w-4' />
              Settings
            </Button>
          </Link>
        </div>
        <div className='absolute bottom-4 left-4 right-4'>
          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div className='flex items-center gap-2'>
              <div className='h-8 w-8 rounded-full bg-muted' />
              <div>
                <p className='text-sm font-medium'>Chef Alex</p>
                <p className='text-xs text-muted-foreground'>
                  admin@prepmaster.com
                </p>
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
                <span>Chef Alex</span>
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
