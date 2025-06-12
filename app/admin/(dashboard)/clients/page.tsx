'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, MoreHorizontal } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Client {
  id: string;
  name: string;
  adminName: string;
  adminEmail: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newClient, setNewClient] = useState({
    name: '',
    adminName: '',
    adminEmail: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('tenants').select('*');

      if (error) throw error;

      // Transform the data to include default values for missing fields
      const transformedData = data.map((client: any) => ({
        id: client.id,
        name: client.name,
        adminName: 'Admin User', // Default value
        adminEmail: 'admin@example.com', // Default value
        status: 'active' as const, // Default value
        createdAt: new Date().toISOString().split('T')[0], // Default to current date
      }));

      setClients(transformedData);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateClient = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('tenants')
        .insert([{ name: newClient.name }])
        .select()
        .single();

      if (error) throw error;

      // Add the new client with default values
      const newClientWithDefaults = {
        id: data.id,
        name: data.name,
        adminName: newClient.adminName || 'Admin User',
        adminEmail: newClient.adminEmail || 'admin@example.com',
        status: 'active' as const,
        createdAt: new Date().toISOString().split('T')[0],
      };

      setClients([...clients, newClientWithDefaults]);
      setNewClient({ name: '', adminName: '', adminEmail: '' });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  return (
    <div className='flex min-h-screen flex-col p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Clients</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Add a new client to the platform.
              </DialogDescription>
            </DialogHeader>
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-medium'>Business Name</label>
                <Input
                  placeholder='Enter business name'
                  value={newClient.name}
                  onChange={(e) =>
                    setNewClient({ ...newClient, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className='text-sm font-medium'>Admin Name</label>
                <Input
                  placeholder='Enter admin name'
                  value={newClient.adminName}
                  onChange={(e) =>
                    setNewClient({ ...newClient, adminName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className='text-sm font-medium'>Admin Email</label>
                <Input
                  type='email'
                  placeholder='Enter admin email'
                  value={newClient.adminEmail}
                  onChange={(e) =>
                    setNewClient({ ...newClient, adminEmail: e.target.value })
                  }
                />
              </div>
              <Button className='w-full' onClick={handleCreateClient}>
                Create Client
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className='flex items-center space-x-2'>
        <div className='relative flex-1'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search clients...'
            className='pl-8'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business Name</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className='w-[50px]'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className='text-center'>
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              clients
                .filter((client) =>
                  client.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className='font-medium'>{client.name}</TableCell>
                    <TableCell>
                      <div>
                        <div>{client.adminName}</div>
                        <div className='text-sm text-muted-foreground'>
                          {client.adminEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          client.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {client.status}
                      </div>
                    </TableCell>
                    <TableCell>{client.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className='text-red-600'>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
