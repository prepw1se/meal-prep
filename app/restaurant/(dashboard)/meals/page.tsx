'use client';

import { useEffect, useState } from 'react';
import { useTenant } from '../(context)/tenant-context';
import { Meal } from '@/lib/types/meal';
import { MenuItem } from '@/lib/types/menu';
import { createClient } from '@/utils/supabase/client';
import MenuTabs from '@/components/custom/change-menu/MenuTabs';
import MenuItemCard from '@/components/custom/change-menu/MenuItemCard';
import AddMealDialog from '@/components/custom/change-menu/AddMealDialog';
import EditMealDialog from '@/components/custom/change-menu/EditMealDialog';

const DEFAULT_IMAGE_URL = 'https://placehold.co/400x400?text=No+Image';

export default function MealsPage() {
  const tenant = useTenant();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const supabase = createClient();

  const fetchMeals = async () => {
    setLoading(true);
    let { data: meals, error } = await supabase
      .from('meals')
      .select('*')
      .eq('tenant_id', tenant.tenant_id);

    if (error) {
      console.error(error);
      setError('Failed to fetch meals.');
    } else {
      setMeals(meals || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('meals').delete().eq('id', id);
    if (!error) {
      setMeals(meals.filter((m) => m.id !== id));
    }
  };

  const handleEdit = (meal: Meal, index: number) => {
    // Convert Meal to MenuItem
    const menuItem: MenuItem = {
      id: meal.id,
      name: meal.name,
      description: meal.description || '',
      price: meal.price,
      available: meal.available || true,
      category: meal.category_id || '',
      image_url: meal.image_url || DEFAULT_IMAGE_URL,
      quantity: 0, // Default value since Meal doesn't have quantity
    };
    setEditingItem(menuItem);
    setEditingIndex(index);
  };

  const handleUpdate = (updated: MenuItem) => {
    // Convert MenuItem back to Meal
    const updatedMeal: Meal = {
      id: updated.id,
      name: updated.name,
      description: updated.description,
      price: updated.price,
      available: updated.available,
      category_id: updated.category,
      image_url: updated.image_url === DEFAULT_IMAGE_URL ? null : updated.image_url,
    };
    
    const copy = [...meals];
    if (editingIndex !== null) copy[editingIndex] = updatedMeal;
    setMeals(copy);
    setEditingItem(null);
    setEditingIndex(null);
  };

  const handleAdd = (item: MenuItem) => {
    // Convert MenuItem to Meal
    const newMeal: Meal = {
      id: item.id,
      tenant_id: tenant.tenant_id,
      name: item.name,
      description: item.description,
      price: item.price,
      available: item.available,
      category_id: item.category,
      image_url: item.image_url === DEFAULT_IMAGE_URL ? null : item.image_url,
    };
    setMeals([...meals, newMeal]);
  };

  if (loading) return <p className='text-center mt-10'>Loading...</p>;
  if (error) return <p className='text-center mt-10 text-red-500'>{error}</p>;

  return (
    <div className='container mx-auto px-4 py-10 bg-white min-h-screen'>

      <h1 className='mb-8 text-4xl font-extrabold text-green-900'>
        Meals
      </h1>

      <div className='grid grid-cols-3 gap-8'>
        {meals.map((meal, index) => (
          <MenuItemCard
            key={meal.id}
            item={{
              id: meal.id,
              name: meal.name,
              description: meal.description || '',
              price: meal.price,
              available: meal.available || true,
              category: meal.category_id || '',
              image_url: meal.image_url || DEFAULT_IMAGE_URL,
              quantity: 0, // Default value since Meal doesn't have quantity
            }}
            index={index}
            onDelete={() => handleDelete(meal.id)}
            onEdit={() => handleEdit(meal, index)}
          />
        ))}
      </div>

      <AddMealDialog onAdd={handleAdd} />
      <EditMealDialog
        item={editingItem}
        onUpdate={handleUpdate}
        onClose={() => setEditingItem(null)}
      />
    </div>
  );
}
