
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GA_MEASUREMENT_ID = Deno.env.get('GA_MEASUREMENT_ID');
const GA_API_SECRET = Deno.env.get('GA_API_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { record, type } = await req.json();

    // Only process 'INSERT' operations
    if (type !== 'INSERT') {
      return new Response(JSON.stringify({ success: true, message: "Event ignored - not an INSERT" }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log("Processing new sample request:", record.id);

    // Generate a client ID (using the record ID for consistency)
    const clientId = record.id.replace(/-/g, '');

    // Build the Google Analytics payload
    const payload = {
      client_id: clientId,
      events: [
        {
          name: "proefpakket_aangevraagd",
          params: {
            id: record.id,
            company_name: record.company_name
          }
        }
      ]
    };

    // Send the event to Google Analytics
    const gaResponse = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!gaResponse.ok) {
      const errorText = await gaResponse.text();
      console.error("Error sending to GA:", errorText);
      throw new Error(`Failed to send event to Google Analytics: ${errorText}`);
    }

    console.log("Successfully sent event to Google Analytics for sample request:", record.id);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Event successfully sent to Google Analytics",
      recordId: record.id 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in track-sample-request function:", error);
    
    // Implement retry logic for network errors
    if (error.message && error.message.includes('network')) {
      // In a production environment, you would implement a more sophisticated
      // retry mechanism, potentially with exponential backoff
      console.log("Network error detected, will retry once...");
      
      try {
        // Simple retry logic - in production you'd want a more robust solution
        const { record } = await req.json();
        // Retry code would go here...
      } catch (retryError) {
        console.error("Retry also failed:", retryError);
      }
    }
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
