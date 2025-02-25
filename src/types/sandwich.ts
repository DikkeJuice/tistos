
export interface Sandwich {
  id: string;
  name: string;
  image_url: string;
  short_description: string;
  long_description?: string;
  tags: string[];
  price: number;
  allergens: string[];
  ingredients: string[];
  created_at: string;
}
