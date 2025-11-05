import React from 'react';
import type { Appointment } from '../../types/appointment';

interface AppointmentDetailsModalProps {
  appointment: Appointment;
  onClose: () => void;
  onAllocate: () => void;
  isAllocating?: boolean;
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  appointment,
  onClose,
  onAllocate,
  isAllocating = false,
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div 
          className="sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between"
          style={{ 
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border-primary)' 
          }}
        >
          <h2 
            className="text-xl font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Appointment Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:opacity-80"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <svg
              className="w-5 h-5"
              style={{ color: 'var(--color-text-secondary)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: 'var(--color-success-light)',
                color: 'var(--color-success)',
              }}
            >
              {appointment.status}
            </span>
            <span 
              className="text-sm"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              ID: #{appointment.id}
            </span>
          </div>

          {/* Customer Information */}
          <div 
            className="rounded-lg p-4 border"
            style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)' 
            }}
          >
            <h3 
              className="text-sm font-semibold mb-3 flex items-center"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <svg
                className="w-5 h-5 mr-2"
                style={{ color: 'var(--color-primary)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Customer Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>Name:</span>
                <span 
                  className="font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {appointment.customerName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>Email:</span>
                <span 
                  className="font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {appointment.customerEmail}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>Phone:</span>
                <span 
                  className="font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {appointment.customerPhone}
                </span>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div 
            className="rounded-lg p-4 border"
            style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)' 
            }}
          >
            <h3 
              className="text-sm font-semibold mb-3 flex items-center"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <svg
                className="w-5 h-5 mr-2"
                style={{ color: 'var(--color-primary)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Service Details
            </h3>
            <div className="space-y-3">
              <div>
                <label 
                  className="block text-xs mb-1"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  Service Type
                </label>
                <span
                  className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: 'var(--color-hover-bg)',
                    color: 'var(--color-primary)',
                  }}
                >
                  {appointment.serviceType}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label 
                    className="block text-xs mb-1"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    Date
                  </label>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      style={{ color: 'var(--color-text-secondary)' }}
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
                    <span 
                      className="font-medium"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {formatDate(appointment.date)}
                    </span>
                  </div>
                </div>

                <div>
                  <label 
                    className="block text-xs mb-1"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    Time
                  </label>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      style={{ color: 'var(--color-text-secondary)' }}
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
                    <span 
                      className="font-medium"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {formatTime(appointment.time)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div 
            className="rounded-lg p-4 border"
            style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)' 
            }}
          >
            <h3 
              className="text-sm font-semibold mb-3 flex items-center"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <svg
                className="w-5 h-5 mr-2"
                style={{ color: 'var(--color-primary)' }}
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
              Vehicle Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label 
                  className="block text-xs mb-1"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  Vehicle Type
                </label>
                <span 
                  className="font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {appointment.vehicleType}
                </span>
              </div>
              <div>
                <label 
                  className="block text-xs mb-1"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  Vehicle Number
                </label>
                <span 
                  className="font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {appointment.vehicleNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          {appointment.instructions && (
            <div 
              className="rounded-lg p-4 border"
              style={{ 
                backgroundColor: 'var(--color-bg-secondary)',
                borderColor: 'var(--color-border-primary)' 
              }}
            >
              <h3 
                className="text-sm font-semibold mb-2 flex items-center"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  style={{ color: 'var(--color-primary)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Special Instructions
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {appointment.instructions}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div 
          className="sticky bottom-0 px-6 py-4 border-t flex items-center justify-end space-x-3"
          style={{ 
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border-primary)' 
          }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-primary)' 
            }}
          >
            Close
          </button>
          <button
            onClick={onAllocate}
            disabled={isAllocating}
            className="px-6 py-2 rounded-lg font-medium transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'white' 
            }}
          >
            {isAllocating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Allocating...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Allocate Employee</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;