'use client';

import { useEffect, useState } from 'react';
import { useTenant } from '../(context)/tenant-context';
import { Meal } from '@/lib/types/meal';
import { createClient } from '@/utils/supabase/client';

export default function MealsPage() {
  const tenant = useTenant();
  const [meals, setMeals] = useState<Meal[]>([]);

  const supabase = createClient();

  const fetchMeals = async () => {
    let { data: meals, error } = await supabase
      .from('meals')
      .select('*')
      .eq('tenant_id', tenant.tenant_id);

    if (error || !meals) {
      console.error(error);
      return;
    }

    setMeals(meals);
  };

  useEffect(() => {
    fetchMeals();
  }, []);
  return (
    <div>
      {meals.map((meal) => {
        return <div key={meal.id}>{meal.name}</div>;
      })}
    </div>
  );
}
