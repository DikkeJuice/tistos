
import { supabase } from "@/integrations/supabase/client";

export const getSandwiches = async () => {
  const { data, error } = await supabase
    .from('sandwiches')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
