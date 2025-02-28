
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const GA_MEASUREMENT_ID = 'G-HTY2JPV7C1'; // Your Google Analytics Measurement ID
    const GA_API_SECRET = '0e4zeMNRQD6Y61XADfKdgA'; // Your Measurement Protocol API Secret
    
    // Parse the webhook payload
    const payload = await req.json();
    console.log('Received webhook payload:', payload);
    
    // Extract the record data - this is from the INSERT event
    const record = payload.record;
    if (!record || !record.id) {
      throw new Error('Invalid webhook payload: missing record data');
    }
    
    // Prepare the event data for Google Analytics
    const eventData = {
      client_id: record.id, // Use the record ID as the client ID
      events: [{
        name: 'sample_request',
        params: {
          request_id: record.id,
          company_name: record.company_name || 'Not provided',
          member_count: record.member_count || 'Not provided'
        }
      }]
    };
    
    console.log('Preparing to send event to Google Analytics:', eventData);
    
    // Send the event to Google Analytics Measurement Protocol
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error sending to Google Analytics:', errorText);
      throw new Error(`Failed to send event to Google Analytics: ${response.status} ${response.statusText}`);
    }
    
    console.log('Successfully sent event to Google Analytics');
    
    return new Response(
      JSON.stringify({ success: true, message: 'Event tracked successfully' }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in track-sample-request function:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
})
