export const handler = async (event: any) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    const { courseId } = JSON.parse(event.body || '{}');

    if (!courseId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing courseId' }),
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
      body: JSON.stringify({ error: 'Failed to initiate purchase' }),
    };
  }
};
