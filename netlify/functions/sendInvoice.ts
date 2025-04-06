export const handler = async (event) => {
    try {
      if (event.httpMethod !== 'POST') {
        return {
          statusCode: 405,
          body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
      }
  
      const invoice = JSON.parse(event.body || '{}');
  
      if (!invoice.clientName || !invoice.items || !Array.isArray(invoice.items)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid invoice data' }),
        };
      }
  
      const paymentLink = `https://protaxadvisors.tax/pay/invoice?invoiceId=inv_${Date.now()}`;
  
      console.log('Sending invoice:', {
        ...invoice,
        paymentLink,
      });
  
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Invoice sent successfully',
          paymentLink,
          invoicePreview: {
            client: invoice.clientName,
            dueDate: invoice.dueDate,
            items: invoice.items,
            total: invoice.total,
          },
        }),
      };
    } catch (error) {
      console.error('Error sending invoice:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server error sending invoice' }),
      };
    }
  };