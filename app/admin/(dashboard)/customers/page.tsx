"use client";

import {
  ArrowUpDown,
  ChevronDown,
  Download,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
const PAGE_SIZE = 2;

export default function CustomersPage() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCustomer = (customerId: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId],
    );
  };

  const toggleAllCustomers = () => {
    setSelectedCustomers((prev) =>
      prev.length === customers.length
        ? []
        : customers.map((customer) => customer.id),
    );
  };

  async function fetchCustomers() {
    const { data, error } = await supabase
      .from("customers")
      .select("id, name, email, address, phone, created_at")
      .ilike("name", `%${searchQuery}%`)
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

    if (error) {
      console.error("Error fetching customers:", error);
      return [];
    }

    const customers = data?.map((customer) => ({
      ...customer,
      status: "active",
      plan: "weekly",
      dietary_restrictions: ["Diary-Free"],
      created_at: new Date(customer.created_at).toLocaleDateString(),
    }));

    return customers || [];
  }

  useEffect(() => {
    async function loadCustomers() {
      const customers = await fetchCustomers();

      setCustomers(customers);
    }
    loadCustomers();
  }, [page, searchQuery]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <div className="flex items-center space-x-2">
          <Link href="/customers/new">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
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
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search customers..."
                    className="w-full min-w-[200px] pl-8 md:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[200px]">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Checkbox id="status-active" className="mr-2" />
                      <label htmlFor="status-active">Active</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id="status-inactive" className="mr-2" />
                      <label htmlFor="status-inactive">Inactive</label>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Checkbox id="plan-weekly" className="mr-2" />
                      <label htmlFor="plan-weekly">Weekly Plan</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id="plan-monthly" className="mr-2" />
                      <label htmlFor="plan-monthly">Monthly Plan</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id="plan-custom" className="mr-2" />
                      <label htmlFor="plan-custom">Custom Plan</label>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="h-9">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          selectedCustomers.length === customers.length &&
                          customers.length > 0
                        }
                        onCheckedChange={toggleAllCustomers}
                      />
                    </TableHead>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>
                      <div className="flex items-center space-x-1">
                        <span>Customer</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Meal Plan</TableHead>
                    <TableHead>Dietary Restrictions</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
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
                      <TableCell className="font-medium">
                        {customer.id}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            customer.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {customer.status}
                        </div>
                      </TableCell>
                      <TableCell>{customer.plan}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <span
                            key="1"
                            className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800"
                          >
                            Diary-Free
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{customer.created_at}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit customer</DropdownMenuItem>
                            <DropdownMenuItem>View orders</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
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

            <div className="flex items-center justify-end space-x-2">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{customers.length}</span> of{" "}
                <span className="font-medium">{PAGE_SIZE}</span> customers
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <Button
                disabled={customers.length < PAGE_SIZE}
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
