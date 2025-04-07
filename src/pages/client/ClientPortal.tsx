import { Routes, Route } from 'react-router-dom';
import { ClientLayout } from '../../components/client/ClientLayout';
import { ClientDashboard } from '../../components/client/Dashboard/ClientDashboard';
import { Documents } from '../../components/dashboard/Documents';
import { Messages } from '../../components/dashboard/Messages';
import { Calendar } from '../../components/dashboard/Calendar';
import { Settings } from '../../components/dashboard/Settings';
import ConsultationList from '../../components/consultation/ConsultationList';
import { ClientInsights } from '../../components/client/Dashboard/ClientInsights';

export default function ClientPortal() { 
  return ( 
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<ClientDashboard />} />
        <Route path="documents" element={<Documents />} />
        <Route path="messages" element={<Messages />} />
        <Route path="appointments" element={<Calendar />} />
        <Route path="consultations" element={<ConsultationList />} />
        <Route path="finances" element={<ClientInsights />} />
        <Route path="tax-planning" element={<ClientInsights />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

// Inside Calendar component
import { useState } from 'react';

const LocalCalendar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleNewEvent = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleNewEvent} className="btn-primary">
        + New Event
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Event</h2>
            <p>This is a placeholder for your BookingForm or BookingModal.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      {/* Other LocalCalendar content */}
    </div>
  );
};