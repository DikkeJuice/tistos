// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pxodqmbszdlzzkywkaop.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4b2RxbWJzemRsenpreXdrYW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NzQ3MDMsImV4cCI6MjA1NjA1MDcwM30.3OaTEcavFbG6Ro9rO6vvJYsiL8LBnWuIseOh1y1CvXQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);