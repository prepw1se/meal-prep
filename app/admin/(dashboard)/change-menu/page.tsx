"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { MenuItem } from "@/lib/types/menu";
import MenuTabs from "@/components/custom/change-menu/MenuTabs";
import MenuItemCard from "@/components/custom/change-menu/MenuItemCard";
import AddMealDialog from "@/components/custom/change-menu/AddMealDialog";
import EditMealDialog from "@/components/custom/change-menu/EditMealDialog";

export default function MealsPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const supabase = createClient();

  const fetchMeals = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("meals").select("*");
    if (error) {
      console.error(error);
      setError("Failed to fetch meals.");
    } else {
      setMenuItems(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("Meals").delete().eq("id", id);
    if (!error) {
      setMenuItems(menuItems.filter((m) => m.id !== id));
    }
  };

  const handleEdit = (item: MenuItem, index: number) => {
    setEditingItem(item);
    setEditingIndex(index);
  };

  const handleUpdate = (updated: MenuItem) => {
    const copy = [...menuItems];
    if (editingIndex !== null) copy[editingIndex] = updated;
    setMenuItems(copy);
    setEditingItem(null);
    setEditingIndex(null);
  };

  const handleAdd = (item: MenuItem) => {
    setMenuItems([...menuItems, item]);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-10 bg-white min-h-screen">
      <MenuTabs />
      <h1 className="mb-4 text-4xl font-extrabold text-green-900">
        Change Menu
      </h1>

      <div className="grid grid-cols-3 gap-8">
        {menuItems.map((item, index) => (
          <MenuItemCard
            key={item.id}
            item={item}
            index={index}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => handleEdit(item, index)}
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
