import { Modal } from '../ui/Modal';
import { BookingForm } from './BookingForm';
import { useConsultation } from '../../hooks/useConsultation';
import { useNotificationStore } from '../../lib/store';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
}

export function BookingModal({ isOpen, onClose, serviceType }: BookingModalProps) {
  const { scheduleConsultation } = useConsultation();
  const { addNotification } = useNotificationStore();
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      await scheduleConsultation(data);
      addNotification('Consultation scheduled successfully', 'success');
      onClose();
      navigate('/dashboard/consultations');
    } catch (error) {
      addNotification('Failed to schedule consultation', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Consultation"
    >
      <BookingForm
        serviceType={serviceType}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}