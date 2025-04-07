import AWS from 'aws-sdk';

const ses = new AWS.SES({
  region: 'us-east-1', // Change if using a different SES region
});

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

    const params = {
      Source: 'services@protaxadvisors.tax',
      Destination: {
        ToAddresses: ['gdoffice@mail.com'],
      },
      Message: {
        Subject: {
          Data: `New contact form submission from ${data.name}`,
        },
        Body: {
          Text: {
            Data: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
          },
        },
      },
    };

    await ses.sendEmail(params).promise();

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
