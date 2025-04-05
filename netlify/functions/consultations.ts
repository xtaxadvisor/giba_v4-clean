import { createSuccessResponse, createErrorResponse } from './utils/response';
import { handleCors, getCorsHeaders } from './utils/cors';

export const handler = async (event) => {
  try {
    const corsHeaders = handleCors(event);
    if ('statusCode' in corsHeaders) return corsHeaders;

    if (event.httpMethod !== 'POST') {
      return {
        ...createErrorResponse(405, 'Method Not Allowed'),
        headers: corsHeaders,
      };
    }

    const body = JSON.parse(event.body || '{}');

    console.log('Received consultation request:', body);

    // You can forward this to a database, email, or CRM here

    return {
      ...createSuccessResponse({
        message: 'Consultation received successfully',
        data: body
      }),
      headers: corsHeaders
    };
  } catch (error) {
    console.error('Error in consultations function:', error);
    return {
      ...createErrorResponse(500, 'Failed to process consultation'),
      headers: getCorsHeaders(event),
    };
  }
};