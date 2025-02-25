
import { supabase } from "@/integrations/supabase/client";
import type { Sandwich } from "@/types/sandwich";
import type { Database } from "@/integrations/supabase/types";

export const getSandwiches = async () => {
  const { data, error } = await supabase
    .from('sandwiches')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  // Transform the data to ensure allergens is properly typed
  const transformedData: Sandwich[] = data.map(sandwich => ({
    ...sandwich,
    allergens: sandwich.allergens as Sandwich['allergens'] || {
      vis: false,
      melk: false,
      soja: false,
      noten: false,
      eieren: false,
      gluten: false,
      lupine: false,
      pindas: false,
      mosterd: false,
      sulfiet: false,
      selderij: false,
      sesamzaad: false,
      weekdieren: false,
      schaaldieren: false
    }
  }));

  return transformedData;
};
