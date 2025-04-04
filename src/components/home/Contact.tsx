import { Mail, Phone, MapPin } from 'lucide-react';
import { Form } from '../ui/Form';
import { Card } from '../ui/Card';

export function Contact() {
  const handleSubmit = (data: Record<string, string>) => {
    console.log('Form submitted:', data);
  };

  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      placeholder: 'John Doe',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'john@example.com',
      required: true,
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'How can we help you?',
      required: true,
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-xl text-gray-600">
            Get in touch with our team of experts
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-8 rounded-lg">
            <Form
              fields={formFields}
              onSubmit={handleSubmit}
              submitText="Send Message"
            />
          </div>

          <div className="space-y-8">
            <Card
              icon={Mail}
              title="Email Us"
              value="gilberto27601@protaxadvisors.tax"
              description="info@protaxadvisors.tax"
            />
            <Card
              icon={Phone}
              title="Call Us"
              value="(833) 854-5020"
              description="Mon-Fri 9am-6pm EST"
            />
            <Card
              icon={MapPin}
              title="Visit Us"
              value="7575 Kingspointe Pkwy Suite 20"
              description="Orlando, Florida 32819"
            />
          </div>
        </div>
      </div>
    </section>
  );
}