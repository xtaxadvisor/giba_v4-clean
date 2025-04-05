export const handler = async (event) => {
    try {
      if (event.httpMethod !== 'POST') {
        return {
          statusCode: 405,
          body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
      }
  
      const { serviceType } = JSON.parse(event.body || '{}');
  
      if (!serviceType) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Missing serviceType' }),
        };
      }
  
      // TODO: Add your backend logic here (e.g. store to DB, trigger email, etc.)
  
      const redirectUrl = `/confirmation?service=${serviceType}`;
  
      return {
        statusCode: 200,
        body: JSON.stringify({ redirectUrl }),
      };
    } catch (err) {
      console.error('Error handling appointment:', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
  };