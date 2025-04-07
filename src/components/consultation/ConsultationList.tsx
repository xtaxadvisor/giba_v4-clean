import React from 'react';
import { Plus, Video } from 'lucide-react';
import { ConsultationCard } from './ConsultationCard';
import { useConsultation } from '../../hooks/useConsultation';
import { useNotificationStore } from '../../lib/store';
import { Button } from '../ui/Button';
import { BookingModal } from '../booking/BookingModal';
// Removed duplicate export default function
const LazyConsultationList = React.lazy(() => import('./ConsultationList'));
export default function ConsultationList() {
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);
  const { addNotification } = useNotificationStore();
  const handleCancel = async (consultationId: string) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    try {
      // Implement cancellation logic
      // await consultationService.cancel(consultationId);
      // Mocking cancellation for demonstration
      console.log(`Cancelled consultation with ID: ${consultationId}`);
      // Show success notification
      addNotification('Consultation cancelled successfully', 'success');
    } catch (error) {
      addNotification('Failed to cancel consultation', 'error');
    }
  };

  const handleReschedule = async (consultationId: string) => {
      try {
        // Implement rescheduling logic
        addNotification(`Rescheduling consultation with ID: ${consultationId} coming soon`, 'info');
      } catch (error) {
        addNotification('Failed to reschedule consultation', 'error');
      }
    };

  const { consultation } = useConsultation();
  const consultations = consultation
  ? [{
      ...consultation,
      startTime: new Date(consultation.startTime).toISOString(),
      endTime: consultation.endTime
        ? new Date(consultation.endTime).toISOString()
        : new Date().toISOString(),
      type: String(consultation.type || 'defaultType'),
      status: ['cancelled', 'scheduled', 'in-progress', 'completed'].includes(consultation.status as string)
        ? (consultation.status as 'cancelled' | 'scheduled' | 'in-progress' | 'completed')
        : 'scheduled',
    }]
  : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Virtual Consultations</h1>
        <Button 
          variant="primary" 
          icon={Plus} 
          onClick={() => setIsBookingModalOpen(true)}
        >
          Schedule Consultation
        </Button>
      </div>

      {consultations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Video className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No consultations</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by scheduling your first consultation
          </p>
          <div className="mt-6">
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => setIsBookingModalOpen(true)}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Upcoming Consultations */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Consultations</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {consultations
                .filter(c => new Date(c.startTime) > new Date() && c.status !== 'cancelled')
                .map(consultation => (
                  <ConsultationCard
                    key={consultation.id}
                    consultation={consultation}
                    onCancel={() => handleCancel(consultation.id)}
                    onReschedule={() => handleReschedule(consultation.id)}
                  />
                ))}
            </div>
          </div>

          {/* Past Consultations */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Past Consultations</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {consultations
                .filter(c => new Date(c.startTime) <= new Date() || c.status === 'cancelled')
                .map(consultation => (
                  <ConsultationCard
                  key={consultation.id}
                  consultation={consultation}
                />
                ))}
            </div>
          </div>
        </div>
      )}

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceType="virtual-consulting"
      />
    </div>
  );
}