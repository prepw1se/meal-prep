'use client';

import { useState } from 'react';
import {
  Clock,
  MapPin,
  Phone,
  ChefHat,
  Truck,
  CheckCircle,
  AlertCircle,
  Timer,
  Search,
  Filter,
  Plus,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Sample order data
const initialOrders = [
  {
    id: 'ORD-001',
    customer: {
      name: 'Sarah Johnson',
      phone: '(555) 123-4567',
      initials: 'SJ',
    },
    items: [
      { name: 'Grilled Chicken Bowl', quantity: 2 },
      { name: 'Protein Breakfast Bowl', quantity: 1 },
    ],
    total: 36.97,
    orderTime: '10:30 AM',
    deliveryTime: '12:30 PM',
    deliveryAddress: '123 Main St, Apt 4B',
    priority: 'normal',
    stage: 'order-placed',
    estimatedPrepTime: 15,
    notes: 'Extra sauce on the side',
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Michael Chen',
      phone: '(555) 234-5678',
      initials: 'MC',
    },
    items: [
      { name: 'Vegetarian Stir Fry', quantity: 3 },
      { name: 'Vegan Buddha Bowl', quantity: 2 },
    ],
    total: 60.95,
    orderTime: '10:45 AM',
    deliveryTime: '1:00 PM',
    deliveryAddress: '456 Oak Ave',
    priority: 'high',
    stage: 'in-progress',
    estimatedPrepTime: 25,
    notes: 'Customer has nut allergy',
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Jessica Williams',
      phone: '(555) 345-6789',
      initials: 'JW',
    },
    items: [
      { name: 'Salmon & Quinoa', quantity: 1 },
      { name: 'Turkey Meatballs', quantity: 1 },
    ],
    total: 28.48,
    orderTime: '11:00 AM',
    deliveryTime: '1:30 PM',
    deliveryAddress: '789 Pine St',
    priority: 'normal',
    stage: 'ready',
    estimatedPrepTime: 20,
    notes: '',
  },
  {
    id: 'ORD-004',
    customer: {
      name: 'David Kim',
      phone: '(555) 456-7890',
      initials: 'DK',
    },
    items: [
      { name: 'Keto Beef Bowl', quantity: 2 },
      { name: 'Overnight Oats', quantity: 2 },
    ],
    total: 46.96,
    orderTime: '9:30 AM',
    deliveryTime: '12:00 PM',
    deliveryAddress: '321 Elm St',
    priority: 'normal',
    stage: 'out-for-delivery',
    estimatedPrepTime: 18,
    notes: 'Leave at front door',
  },
  {
    id: 'ORD-005',
    customer: {
      name: 'Emily Davis',
      phone: '(555) 567-8901',
      initials: 'ED',
    },
    items: [
      { name: 'Protein Breakfast Bowl', quantity: 1 },
      { name: 'Grilled Chicken Bowl', quantity: 1 },
    ],
    total: 23.98,
    orderTime: '9:00 AM',
    deliveryTime: '11:30 AM',
    deliveryAddress: '654 Maple Dr',
    priority: 'normal',
    stage: 'delivered',
    estimatedPrepTime: 12,
    notes: '',
  },
];

const stages = [
  {
    id: 'order-placed',
    title: 'Order Placed',
    icon: <AlertCircle className='h-4 w-4' />,
    color: 'bg-gray-100 border-gray-200',
    headerColor: 'bg-gray-900',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    icon: <ChefHat className='h-4 w-4' />,
    color: 'bg-gray-100 border-gray-200',
    headerColor: 'bg-gray-900',
  },
  {
    id: 'ready',
    title: 'Ready',
    icon: <CheckCircle className='h-4 w-4' />,
    color: 'bg-gray-100 border-gray-200',
    headerColor: 'bg-gray-900',
  },
  {
    id: 'out-for-delivery',
    title: 'Out for Delivery',
    icon: <Truck className='h-4 w-4' />,
    color: 'bg-gray-100 border-gray-200',
    headerColor: 'bg-gray-900',
  },
  {
    id: 'delivered',
    title: 'Delivered',
    icon: <CheckCircle className='h-4 w-4' />,
    color: 'bg-gray-100 border-gray-200',
    headerColor: 'bg-gray-900',
  },
];

export default function PipelinePage() {
  const [orders, setOrders] = useState(initialOrders);

  const moveOrder = (orderId: string, newStage: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, stage: newStage } : order
      )
    );
  };

  const getOrdersByStage = (stageId: string) => {
    return orders.filter((order) => order.stage === stageId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'urgent' || priority === 'high') {
      return <AlertCircle className='h-3 w-3' />;
    }
    return null;
  };

  const OrderCard = ({ order }: { order: (typeof orders)[0] }) => (
    <Card className='mb-3 cursor-pointer hover:shadow-md transition-shadow border-gray-200'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-sm font-medium text-gray-900'>
            {order.id}
          </CardTitle>
          {order.priority !== 'normal' && (
            <Badge className={`text-xs ${getPriorityColor(order.priority)}`}>
              {getPriorityIcon(order.priority)}
              <span className='ml-1 capitalize'>{order.priority}</span>
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='flex items-center space-x-2'>
          <Avatar className='h-8 w-8 bg-gray-100'>
            <AvatarFallback className='text-gray-700'>
              {order.customer.initials}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-gray-900 truncate'>
              {order.customer.name}
            </p>
            <p className='text-xs text-gray-500 flex items-center'>
              <Phone className='h-3 w-3 mr-1' />
              {order.customer.phone}
            </p>
          </div>
        </div>

        <div className='space-y-1'>
          {order.items.map((item, index) => (
            <div
              key={index}
              className='flex justify-between text-xs text-gray-600'
            >
              <span className='truncate'>
                {item.quantity}x {item.name}
              </span>
            </div>
          ))}
        </div>

        <div className='flex flex-wrap gap-2 text-xs text-gray-500'>
          <div className='flex items-center'>
            <Clock className='h-3 w-3 mr-1' />
            <span>{order.orderTime}</span>
          </div>
          <div className='flex items-center'>
            <Timer className='h-3 w-3 mr-1' />
            <span>{order.estimatedPrepTime} min</span>
          </div>
          <div className='flex items-center'>
            <MapPin className='h-3 w-3 mr-1' />
            <span className='truncate max-w-[150px]'>
              {order.deliveryAddress}
            </span>
          </div>
        </div>

        {order.notes && (
          <p className='text-xs text-gray-500 italic'>{order.notes}</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className='flex flex-col'>
      {/* Header Section */}
      <div className='bg-white border-b border-gray-200'>
        <div className='px-4 md:px-6 py-4'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <h1 className='text-2xl font-semibold text-gray-900'>
                Meals Pipeline
              </h1>
              <p className='text-sm text-gray-500 mt-1'>
                Manage and track your meal preparation orders
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-3'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search orders...'
                  className='pl-9 pr-4 py-2 w-full sm:w-64 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  className='flex items-center gap-2'
                >
                  <Filter className='h-4 w-4' />
                  <span>Filter</span>
                </Button>
                <Button size='sm' className='flex items-center gap-2'>
                  <Plus className='h-4 w-4' />
                  <span>New Order</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Columns */}
      <div className='p-4 md:p-6'>
        <div className='flex flex-col md:flex-row gap-4 overflow-x-auto'>
          {stages.map((stage) => (
            <div
              key={stage.id}
              className='flex-1 min-w-[280px] md:min-w-0 bg-white rounded-lg shadow-sm'
            >
              <div className={`p-3 ${stage.headerColor} rounded-t-lg`}>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    {stage.icon}
                    <h3 className='text-sm font-medium text-white'>
                      {stage.title}
                    </h3>
                  </div>
                  <span className='text-xs text-gray-300'>
                    {getOrdersByStage(stage.id).length}
                  </span>
                </div>
              </div>
              <div className='p-2'>
                {getOrdersByStage(stage.id).map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
