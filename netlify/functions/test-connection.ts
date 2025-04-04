import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { handleCors, getCorsHeaders } from './utils/cors';
import { createErrorResponse, createSuccessResponse } from './utils/response';

export const handler: Handler = async (event) => {
  try {
    // Handle CORS
    const corsHeaders = handleCors(event);
    if ('statusCode' in corsHeaders) {
      return corsHeaders;
    }

    // Create Supabase client
    const supabaseUrl = process.env.VITE_SUPABASE_URL!;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test connection using RPC
    const { data, error } = await supabase.rpc('test_connection');

    if (error) {
      console.error('Connection test error:', error);
      return {
        ...createErrorResponse(500, 'Database connection test failed'),
        headers: corsHeaders
      };
    }

    return {
      ...createSuccessResponse({ success: true, data }),
      headers: corsHeaders
    };

  } catch (error) {
    console.error('Connection test error:', error);
    return {
      ...createErrorResponse(
        500,
        'Connection test failed',
        process.env.NODE_ENV === 'development' ? error : undefined
      ),
      headers: getCorsHeaders(event)
    };
  }
};