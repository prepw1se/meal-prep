export interface Meal {
  id: string;
  tenant_id?: string;
  name: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  available?: boolean;
  category_id?: string;
  calories?: number | null;
  created_at?: string;
}
