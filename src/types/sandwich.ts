
export interface Sandwich {
  id: string;
  name: string;
  image_url: string;
  short_description: string;
  long_description?: string;
  tags: string[];
  price: number;
  allergens: {
    vis: boolean;
    melk: boolean;
    soja: boolean;
    noten: boolean;
    eieren: boolean;
    gluten: boolean;
    lupine: boolean;
    pindas: boolean;
    mosterd: boolean;
    sulfiet: boolean;
    selderij: boolean;
    sesamzaad: boolean;
    weekdieren: boolean;
    schaaldieren: boolean;
  };
  ingredients: string[];
  created_at: string;
}
