import React, { useState } from 'react';

const SchedulePage = () => {
  const [form, setForm] = useState({
    name: '',
    date: '',
    time: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appointment Scheduled:', form);
    alert('Your consultation has been scheduled!');
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Schedule a Consultation</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Your Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Select Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Select Time</label>
          <select
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">-- Select a time --</option>
            <option value="09:00">09:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="14:00">02:00 PM</option>
            <option value="16:00">04:00 PM</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Schedule
        </button>
      </form>
    </div>
  );
};

export default SchedulePage;
