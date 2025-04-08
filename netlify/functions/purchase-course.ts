export const handler = async (event: any) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
      };
    }

    let courseId;
    try {
      const parsed = JSON.parse(event.body || '{}');
      courseId = parsed.courseId;
    } catch {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Invalid JSON in request body' }),
      };
    }

    if (!courseId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Missing courseId' }),
      };
    }

    // TODO: Replace this block with real Authorize.Net transaction creation
    const fakeAuthorizeNetCheckoutUrl = `https://secure.authorize.net/payment/start?courseId=${courseId}`;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        checkoutUrl: fakeAuthorizeNetCheckoutUrl,
      }),
    };
  } catch (error: any) {
    console.error('Authorize.Net purchase error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Failed to initiate purchase' }),
    };
  }
};
