import React, { useState, useEffect } from 'react';
import { appointmentService } from '../../services/appointmentService';
import type { Appointment, GroupedAppointments, User } from '../../types/appointment';
import LoadingSpinner from './LoadingSpinner';
import ConfirmedAppointmentsList from './ConfirmedAppointmentsList';
import AppointmentDetailsModal from './AppointmentDetailsModal';
import EmployeeSelectionModal from './EmployeeSelectionModal';

const TaskAllocationPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [groupedAppointments, setGroupedAppointments] = useState<GroupedAppointments[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal states
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [isAllocating, setIsAllocating] = useState(false);

  // Fetch confirmed appointments
  useEffect(() => {
    fetchConfirmedAppointments();
  }, []);

  const fetchConfirmedAppointments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await appointmentService.getByStatus('CONFIRMED');
      
      console.log('📋 Fetched appointments:', data);
      
      setAppointments(data);
      
      // ✅ FIX: Call grouping and set state
      const grouped = groupAppointmentsByCustomer(data);
      console.log('👥 Grouped result:', grouped);
      
      setGroupedAppointments(grouped);
      
    } catch (err: any) {
      console.error('❌ Error fetching appointments:', err);
      setError(err.response?.data?.message || 'Failed to load appointments');
    } finally {
      setIsLoading(false);
    }
  };

  const groupAppointmentsByCustomer = (
    appointments: Appointment[]
  ): GroupedAppointments[] => {
    const grouped = appointments.reduce((acc, appointment) => {
      // Extract customer info from nested customer object OR direct fields
      const customerEmail = 
        appointment.customer?.email || 
        appointment.customerEmail || 
        'anonymous';
      
      const customerName = 
        appointment.customer?.fullName || 
        appointment.customerName || 
        'Unknown Customer';
      
      const customerId = appointment.customer?.id || appointment.customerId;

      if (!acc[customerEmail]) {
        acc[customerEmail] = {
          customerId,
          customerName,
          customerEmail,
          totalCount: 0,
          appointments: [],
        };
      }

      acc[customerEmail].appointments.push(appointment);
      acc[customerEmail].totalCount++;

      return acc;
    }, {} as Record<string, GroupedAppointments>);

    return Object.values(grouped);
  };

  // Handle appointment card click
  const handleAppointmentClick = async (appointmentId: number) => {
    try {
      const appointment = await appointmentService.getById(appointmentId);
      setSelectedAppointment(appointment);
      setShowDetailsModal(true);
    } catch (err: any) {
      console.error('Error fetching appointment details:', err);
      setError('Failed to load appointment details');
    }
  };

  // Handle allocate button click
  const handleAllocateClick = async () => {
    try {
      setIsLoadingEmployees(true);
      const employeeData = await appointmentService.getAvailableEmployees();
      setEmployees(employeeData);
      setShowEmployeeModal(true);
    } catch (err: any) {
      console.error('Error fetching employees:', err);
      setError('Failed to load employees');
    } finally {
      setIsLoadingEmployees(false);
    }
  };

    // Handle employee selection
  const handleEmployeeSelect = async (employeeId: number) => {
    if (!selectedAppointment) return;

    try {
      setIsAllocating(true);
      setError(null); // ✅ Clear previous errors
      
      // Backend now auto-creates chat after allocation
      await appointmentService.allocateToEmployee(selectedAppointment.id, employeeId);
      
      // Show success message
      const employeeName = employees.find(e => e.id === employeeId)?.fullName;
      setSuccessMessage(
        `✅ Successfully allocated to ${employeeName}. Chat created automatically!`
      );
      
      // Close modals
      setShowEmployeeModal(false);
      setShowDetailsModal(false);
      
      // Refresh appointments list
      await fetchConfirmedAppointments();
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
      
    } catch (err: any) {
      console.error('❌ Error allocating appointment:', err);
      
      const errorMsg = err.response?.data?.message || 
                      err.message || 
                      'Failed to allocate appointment';
      
      setError(`❌ ${errorMsg}`);
      
      // Don't close modals on error so user can retry
    } finally {
      setIsAllocating(false);
    }
  };

  // Close modals
  const closeModals = () => {
    setShowDetailsModal(false);
    setShowEmployeeModal(false);
    setSelectedAppointment(null);
  };

  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 
            className="text-3xl font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Task Allocation
          </h1>
          <button
            onClick={fetchConfirmedAppointments}
            className="p-2 rounded-lg transition-colors hover:opacity-80"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            title="Refresh"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Allocate confirmed appointments to available employees
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)' 
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Total Appointments
                </p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {appointments.length}
                </p>
              </div>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary-light)' }}
              >
                <svg
                  className="w-6 h-6"
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
              </div>
            </div>
          </div>

          <div 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)' 
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Unique Customers
                </p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {groupedAppointments.length}
                </p>
              </div>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-success-light)' }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: 'var(--color-success)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)' 
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Status
                </p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--color-success)' }}
                >
                  Confirmed
                </p>
              </div>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-warning-light)' }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: 'var(--color-warning)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div 
          className="max-w-7xl mx-auto mb-6 p-4 rounded-lg border flex items-center animate-fade-in"
          style={{ 
            backgroundColor: 'var(--color-success-light)',
            borderColor: 'var(--color-success)' 
          }}
        >
          <svg
            className="w-5 h-5 mr-3"
            style={{ color: 'var(--color-success)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span style={{ color: 'var(--color-success)' }}>
            {successMessage}
          </span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div 
          className="max-w-7xl mx-auto mb-6 p-4 rounded-lg border flex items-center justify-between"
          style={{ 
            backgroundColor: 'var(--color-error-light)',
            borderColor: 'var(--color-error)' 
          }}
        >
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-3"
              style={{ color: 'var(--color-error)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span style={{ color: 'var(--color-error)' }}>
              {error}
            </span>
          </div>
          <button
            onClick={() => setError(null)}
            className="p-1 rounded hover:opacity-80"
          >
            <svg
              className="w-5 h-5"
              style={{ color: 'var(--color-error)' }}
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
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <LoadingSpinner size="lg" text="Loading confirmed appointments..." />
        ) : (
          <ConfirmedAppointmentsList
            groupedAppointments={groupedAppointments}
            onAppointmentClick={handleAppointmentClick}
          />
        )}
      </div>

      {/* Appointment Details Modal */}
      {showDetailsModal && selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={closeModals}
          onAllocate={handleAllocateClick}
          isAllocating={isLoadingEmployees}
        />
      )}

      {/* Employee Selection Modal */}
      {showEmployeeModal && (
        <EmployeeSelectionModal
          
          employees={employees}
          onClose={() => setShowEmployeeModal(false)}
          onSelect={handleEmployeeSelect}
          isLoading={isAllocating}
        />
      )}
    </div>
  );
};

export default TaskAllocationPage;