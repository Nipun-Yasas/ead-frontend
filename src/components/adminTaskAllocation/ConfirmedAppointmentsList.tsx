import React from 'react';
import type { GroupedAppointments } from '../../types/appointment';
import AppointmentCard from './AppointmentCard';

interface ConfirmedAppointmentsListProps {
  groupedAppointments: GroupedAppointments[];
  onAppointmentClick: (appointmentId: number) => void;
}

const ConfirmedAppointmentsList: React.FC<ConfirmedAppointmentsListProps> = ({
  groupedAppointments,
  onAppointmentClick,
}) => {
  if (groupedAppointments.length === 0) {
    return (
      <div className="text-center py-16">
        <div
          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          <svg
            className="w-8 h-8"
            style={{ color: 'var(--color-text-tertiary)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          No Confirmed Appointments
        </h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          There are no confirmed appointments to allocate at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groupedAppointments.map((group) => {
        // ✅ Extract customer name and email with fallbacks
        const customerName = group.customerName || 'Unknown Customer';
        const customerEmail = group.customerEmail || 'No email provided';
        const firstLetter = customerName.charAt(0).toUpperCase();

        return (
          <div
            key={`${customerEmail}-${group.customerId || 'anonymous'}`}
            className="rounded-lg border p-5"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)',
            }}
          >
            {/* Customer Header */}
            <div className="flex items-start justify-between mb-4 pb-4 border-b"
              style={{ borderColor: 'var(--color-border-secondary)' }}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                  }}
                >
                  {firstLetter}
                </div>
                
                {/* Customer Info */}
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {customerName}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {customerEmail}
                  </p>
                </div>
              </div>

              {/* Appointment Count Badge */}
              {group.totalCount > 1 && (
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: 'var(--color-hover-bg)',
                    color: 'var(--color-primary)',
                  }}
                >
                  {group.totalCount} Services
                </span>
              )}
            </div>

            {/* Appointments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onClick={() => onAppointmentClick(appointment.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConfirmedAppointmentsList;