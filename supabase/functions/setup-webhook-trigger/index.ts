
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get Supabase configuration from environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Get the URL for the track-sample-request function
    const functionUrl = `${supabaseUrl}/functions/v1/track-sample-request`;

    // Call the database function to create the webhook trigger
    const { data, error } = await supabase.rpc(
      'create_webhook_for_sample_requests',
      { 
        function_url: functionUrl, 
        service_role_key: supabaseServiceRoleKey 
      }
    );

    if (error) {
      console.error('Error setting up webhook trigger:', error);
      throw error;
    }

    console.log('Successfully set up webhook trigger');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Webhook trigger configured successfully for sample_requests table',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in setup-webhook-trigger function:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
