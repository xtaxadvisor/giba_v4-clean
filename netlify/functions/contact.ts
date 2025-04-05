export const handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    const data = JSON.parse(event.body || '{}');

    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    console.log('Contact form submitted:', data);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Form received successfully', data }),
    };
  } catch (error) {
    console.error('Contact function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};
