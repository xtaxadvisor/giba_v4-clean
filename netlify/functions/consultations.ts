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

    if (!event.body) {
      return {
        ...createErrorResponse(400, 'Request body is required'),
        headers: corsHeaders,
      };
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch {
      return {
        ...createErrorResponse(400, 'Invalid JSON in request body'),
        headers: corsHeaders,
      };
    }

    console.log('Received consultation request:', body);

    return {
      ...createSuccessResponse({
        message: 'Consultation received successfully',
        data: body,
      }),
      headers: corsHeaders,
    };
  } catch (error) {
    console.error('Error in consultations function:', error);
    return {
      ...createErrorResponse(500, 'Failed to process consultation'),
      headers: getCorsHeaders(event),
    };
  }
};