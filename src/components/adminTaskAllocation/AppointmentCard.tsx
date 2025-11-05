import React from 'react';
import type { Appointment } from '../../types/appointment';

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  onClick 
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    // time is in HH:mm:ss format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div
      onClick={onClick}
      className="p-4 rounded-lg cursor-pointer transition-all hover:scale-[1.02] border"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderColor: 'var(--color-border-primary)',
      }}
    >
      {/* Service Type Badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: 'var(--color-hover-bg)',
            color: 'var(--color-primary)',
          }}
        >
          {appointment.serviceType}
        </span>
        
        <svg
          className="w-5 h-5"
          style={{ color: 'var(--color-text-tertiary)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      {/* Vehicle Info */}
      <div className="mb-3">
        <div className="flex items-center space-x-2 mb-1">
          <svg
            className="w-5 h-5"
            style={{ color: 'var(--color-text-tertiary)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {appointment.vehicleType}
          </span>
        </div>
        <p
          className="text-xs ml-7"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {appointment.vehicleNumber}
        </p>
      </div>

      {/* Date & Time */}
      <div className="flex items-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <svg
            className="w-4 h-4"
            style={{ color: 'var(--color-text-tertiary)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span style={{ color: 'var(--color-text-secondary)' }}>
            {formatDate(appointment.date)}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <svg
            className="w-4 h-4"
            style={{ color: 'var(--color-text-tertiary)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span style={{ color: 'var(--color-text-secondary)' }}>
            {formatTime(appointment.time)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;