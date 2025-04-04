import React from 'react';

import { Client } from '../../types/client'; // Adjust the import path as necessary
interface ClientFormProps {
  initialData: Client; // Add this line to define the initialData prop
  onSubmit: (data: Partial<Client>) => void;
  onCancel: () => void;
}
export const ClientForm: React.FC<ClientFormProps> = (props) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Client Information Form</h2>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit({}); // Example usage of onSubmit
        }}
      >
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="mt-1 block w-full border p-2 rounded"
            placeholder="Enter client's full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            className="mt-1 block w-full border p-2 rounded"
            placeholder="client@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            className="mt-1 block w-full border p-2 rounded"
            placeholder="(123) 456-7890"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};