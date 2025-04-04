class TwilioService {
  private static instance: TwilioService;

  private static get config() {
    return {
      accountSid: process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID!,
      authToken: process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN!,
      phoneNumber: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER!,
      whatsappNumber: process.env.NEXT_PUBLIC_TWILIO_WHATSAPP_NUMBER!
    };
  }

  private constructor() {
    this.validateEnvVars();
  }

  private validateEnvVars() {
    const config = TwilioService.config;
    for (const [key, value] of Object.entries(config)) {
      if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
      }
    }
  }

  public static getInstance(): TwilioService {
    if (!TwilioService.instance) {
      TwilioService.instance = new TwilioService();
    }
    return TwilioService.instance;
  }

  async sendSMS(to: string, message: string) {
    try {
      const response = await fetch('/.netlify/functions/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          message,
          accountSid: TwilioService.config.accountSid,
          authToken: TwilioService.config.authToken,
          from: TwilioService.config.phoneNumber
        })
      });

      if (!response.ok) throw new Error('Failed to send SMS');
      return await response.json();
    } catch (error) {
      console.error('SMS sending error:', error);
      throw error;
    }
  }

  async sendWhatsApp(to: string, message: string) {
    try {
      const response = await fetch('/.netlify/functions/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: `whatsapp:${to}`,
          from: `whatsapp:${TwilioService.config.whatsappNumber}`,
          message,
          accountSid: TwilioService.config.accountSid,
          authToken: TwilioService.config.authToken
        })
      });

      if (!response.ok) throw new Error('Failed to send WhatsApp message');
      return await response.json();
    } catch (error) {
      console.error('WhatsApp sending error:', error);
      throw error;
    }
  }
}

export const twilioService = TwilioService.getInstance();