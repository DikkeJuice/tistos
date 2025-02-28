
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  console.log("Function called with method:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Handling OPTIONS request");
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Check if request has a body
    const contentType = req.headers.get('content-type') || '';
    console.log("Content-Type:", contentType);
    
    let payload;
    if (contentType.includes('application/json')) {
      // Only try to parse as JSON if content-type is application/json
      const text = await req.text();
      console.log("Request body text:", text);
      
      if (!text || text.trim() === '') {
        throw new Error('Empty request body');
      }
      
      try {
        payload = JSON.parse(text);
      } catch (parseError) {
        console.error("JSON parse error:", parseError.message);
        throw new Error(`Invalid JSON in request body: ${parseError.message}`);
      }
    } else {
      // For webhook test calls which might not include JSON
      console.log("Not a JSON request, creating dummy payload for testing");
      payload = {
        record: {
          id: `test-${Date.now()}`,
          company_name: "Test Company",
          member_count: "Test"
        }
      };
    }
    
    console.log('Received payload:', payload);
    
    // Extract the record data - this is from the INSERT event
    const record = payload.record;
    if (!record || !record.id) {
      throw new Error('Invalid payload: missing record data');
    }
    
    const GA_MEASUREMENT_ID = 'G-HTY2JPV7C1'; // Google Analytics Measurement ID
    const GA_API_SECRET = '0e4zeMNRQD6Y61XADfKdgA'; // Measurement Protocol API Secret
    
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
    
    console.log('Sending event to Google Analytics:', eventData);
    
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
    
    const responseStatus = response.status;
    console.log(`Google Analytics response status: ${responseStatus}`);
    
    let responseText;
    try {
      responseText = await response.text();
      console.log('Google Analytics response:', responseText);
    } catch (error) {
      console.error('Failed to read response text:', error);
      responseText = 'Failed to read response';
    }
    
    if (!response.ok) {
      throw new Error(`Failed to send event to Google Analytics: ${responseStatus} ${responseText}`);
    }
    
    console.log('Successfully sent event to Google Analytics');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Event tracked successfully',
        gaStatus: responseStatus,
        gaResponse: responseText
      }),
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
});
