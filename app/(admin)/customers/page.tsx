'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpDown,
  ChevronDown,
  Download,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Sample customer data
const customers = [
  {
    id: 'CUST-001',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '(555) 123-4567',
    status: 'active',
    plan: 'Weekly Meal Plan',
    dietaryRestrictions: ['Gluten-Free', 'Dairy-Free'],
    joinDate: 'Jan 10, 2025',
  },
  {
    id: 'CUST-002',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '(555) 234-5678',
    status: 'active',
    plan: 'Monthly Meal Plan',
    dietaryRestrictions: ['Vegetarian'],
    joinDate: 'Feb 15, 2025',
  },
  {
    id: 'CUST-003',
    name: 'Jessica Williams',
    email: 'jessica@example.com',
    phone: '(555) 345-6789',
    status: 'inactive',
    plan: 'Weekly Meal Plan',
    dietaryRestrictions: ['Nut-Free'],
    joinDate: 'Mar 5, 2025',
  },
  {
    id: 'CUST-004',
    name: 'David Kim',
    email: 'david@example.com',
    phone: '(555) 456-7890',
    status: 'active',
    plan: 'Custom Meal Plan',
    dietaryRestrictions: ['Low-Carb', 'High-Protein'],
    joinDate: 'Mar 20, 2025',
  },
  {
    id: 'CUST-005',
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '(555) 567-8901',
    status: 'active',
    plan: 'Weekly Meal Plan',
    dietaryRestrictions: ['Vegan'],
    joinDate: 'Apr 2, 2025',
  },
  {
    id: 'CUST-006',
    name: 'Robert Wilson',
    email: 'robert@example.com',
    phone: '(555) 678-9012',
    status: 'inactive',
    plan: 'Monthly Meal Plan',
    dietaryRestrictions: [],
    joinDate: 'Apr 15, 2025',
  },
  {
    id: 'CUST-007',
    name: 'Jennifer Martinez',
    email: 'jennifer@example.com',
    phone: '(555) 789-0123',
    status: 'active',
    plan: 'Weekly Meal Plan',
    dietaryRestrictions: ['Pescatarian'],
    joinDate: 'May 1, 2025',
  },
];

export default function CustomersPage() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  const toggleCustomer = (customerId: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  const toggleAllCustomers = () => {
    setSelectedCustomers((prev) =>
      prev.length === customers.length
        ? []
        : customers.map((customer) => customer.id)
    );
  };

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>Customers</h2>
        <div className='flex items-center space-x-2'>
          <Link href='/customers/new'>
            <Button className='bg-green-600 hover:bg-green-700'>
              <Plus className='mr-2 h-4 w-4' />
              Add Customer
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>
            Manage your customers, their meal plans, and dietary restrictions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col space-y-4'>
            <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
              <div className='flex items-center space-x-2'>
                <div className='relative'>
                  <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    type='search'
                    placeholder='Search customers...'
                    className='w-full min-w-[200px] pl-8 md:w-[300px]'
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='sm' className='h-9'>
                      <SlidersHorizontal className='mr-2 h-4 w-4' />
                      Filter
                      <ChevronDown className='ml-2 h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='start' className='w-[200px]'>
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Checkbox id='status-active' className='mr-2' />
                      <label htmlFor='status-active'>Active</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id='status-inactive' className='mr-2' />
                      <label htmlFor='status-inactive'>Inactive</label>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Checkbox id='plan-weekly' className='mr-2' />
                      <label htmlFor='plan-weekly'>Weekly Plan</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id='plan-monthly' className='mr-2' />
                      <label htmlFor='plan-monthly'>Monthly Plan</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id='plan-custom' className='mr-2' />
                      <label htmlFor='plan-custom'>Custom Plan</label>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className='flex items-center space-x-2'>
                <Button variant='outline' size='sm' className='h-9'>
                  <Download className='mr-2 h-4 w-4' />
                  Export
                </Button>
              </div>
            </div>

            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[50px]'>
                      <Checkbox
                        checked={
                          selectedCustomers.length === customers.length &&
                          customers.length > 0
                        }
                        onCheckedChange={toggleAllCustomers}
                      />
                    </TableHead>
                    <TableHead className='w-[100px]'>ID</TableHead>
                    <TableHead>
                      <div className='flex items-center space-x-1'>
                        <span>Customer</span>
                        <ArrowUpDown className='h-4 w-4' />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Meal Plan</TableHead>
                    <TableHead>Dietary Restrictions</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className='w-[50px]'></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedCustomers.includes(customer.id)}
                          onCheckedChange={() => toggleCustomer(customer.id)}
                        />
                      </TableCell>
                      <TableCell className='font-medium'>
                        {customer.id}
                      </TableCell>
                      <TableCell>
                        <div className='font-medium'>{customer.name}</div>
                        <div className='text-sm text-muted-foreground'>
                          {customer.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            customer.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {customer.status}
                        </div>
                      </TableCell>
                      <TableCell>{customer.plan}</TableCell>
                      <TableCell>
                        <div className='flex flex-wrap gap-1'>
                          {customer.dietaryRestrictions.length > 0 ? (
                            customer.dietaryRestrictions.map(
                              (restriction, index) => (
                                <span
                                  key={index}
                                  className='inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800'
                                >
                                  {restriction}
                                </span>
                              )
                            )
                          ) : (
                            <span className='text-sm text-muted-foreground'>
                              None
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                              <span className='sr-only'>Open menu</span>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit customer</DropdownMenuItem>
                            <DropdownMenuItem>View orders</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-red-600'>
                              Delete customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className='flex items-center justify-end space-x-2'>
              <div className='text-sm text-muted-foreground'>
                Showing <span className='font-medium'>1</span> to{' '}
                <span className='font-medium'>7</span> of{' '}
                <span className='font-medium'>100</span> customers
              </div>
              <Button variant='outline' size='sm' disabled>
                Previous
              </Button>
              <Button variant='outline' size='sm'>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
