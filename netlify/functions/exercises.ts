export const handler = async (event) => {
  try {
    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    const exercises = [
      {
        category: 'Taxes',
        items: [
          { id: 'tax-1', title: 'Understand your federal and state tax obligations' },
          { id: 'tax-2', title: 'Register for an EIN with the IRS' },
          { id: 'tax-3', title: 'Explore quarterly estimated tax requirements' }
        ]
      },
      {
        category: 'Liabilities',
        items: [
          { id: 'liab-1', title: 'Evaluate potential business liabilities' },
          { id: 'liab-2', title: 'Determine if you need an LLC or other entity structure' }
        ]
      },
      {
        category: 'Insurances',
        items: [
          { id: 'ins-1', title: 'Research general liability insurance' },
          { id: 'ins-2', title: 'Consider professional liability or E&O coverage' }
        ]
      },
      {
        category: 'Payroll',
        items: [
          { id: 'pay-1', title: 'Choose a payroll provider' },
          { id: 'pay-2', title: 'Register for state and federal payroll taxes' },
          { id: 'pay-3', title: 'Understand employee vs. contractor classification' }
        ]
      },
      {
        category: 'Accounting',
        items: [
          { id: 'acct-1', title: 'Set up accounting software or spreadsheet system' },
          { id: 'acct-2', title: 'Track all income and expenses' },
          { id: 'acct-3', title: 'Consider hiring a bookkeeper or CPA' }
        ]
      }
    ];

    return {
      statusCode: 200,
      body: JSON.stringify({ exercises }),
    };
  } catch (error) {
    console.error('Error in exercises function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Error' }),
    };
  }
};
