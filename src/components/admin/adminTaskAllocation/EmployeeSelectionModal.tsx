import React, { useState } from 'react';
import type { User } from '../../../types/appointment';
import LoadingSpinner from './LoadingSpinner';

interface EmployeeSelectionModalProps {
  employees: User[];
  onClose: () => void;
  onSelect: (employeeId: number) => void;
  isLoading?: boolean;
}

const EmployeeSelectionModal: React.FC<EmployeeSelectionModalProps> = ({
  employees,
  onClose,
  onSelect,
  isLoading = false,
}) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Add null safety checks
  const filteredEmployees = employees.filter((employee) => {
    const fullName = employee.fullName?.toLowerCase() || '';
    const email = employee.email?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    
    return fullName.includes(search) || email.includes(search);
  });

  const handleConfirm = () => {
    if (selectedEmployeeId) {
      onSelect(selectedEmployeeId);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-xl shadow-2xl flex flex-col"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div 
          className="px-6 py-4 border-b"
          style={{ 
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border-primary)' 
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 
              className="text-xl font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Select Employee
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

          {/* Search Bar */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: 'var(--color-text-tertiary)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
                '--tw-ring-color': 'var(--color-primary)',
              } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Employee List */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <LoadingSpinner text="Loading employees..." />
          ) : filteredEmployees.length === 0 ? (
            <div className="text-center py-8">
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                {searchTerm ? 'No employees found' : 'No employees available'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredEmployees.map((employee) => (
                <button
                  key={employee.id}
                  onClick={() => setSelectedEmployeeId(employee.id)}
                  className={`w-full p-4 rounded-lg border transition-all hover:scale-[1.01] ${
                    selectedEmployeeId === employee.id ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: selectedEmployeeId === employee.id 
                      ? 'var(--color-hover-bg)' 
                      : 'var(--color-bg-secondary)',
                    borderColor: selectedEmployeeId === employee.id
                      ? 'var(--color-primary)'
                      : 'var(--color-border-primary)',
                    '--tw-ring-color': 'var(--color-primary)',
                  } as React.CSSProperties}
                >
                  <div className="flex items-center space-x-4">
                    {/* Avatar - ✅ Add null safety */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                      style={{
                        backgroundColor: selectedEmployeeId === employee.id
                          ? 'var(--color-primary)'
                          : 'var(--color-bg-tertiary)',
                        color: selectedEmployeeId === employee.id
                          ? 'white'
                          : 'var(--color-text-primary)',
                      }}
                    >
                      {employee.fullName?.charAt(0)?.toUpperCase() || '?'}
                    </div>

                    {/* Employee Info - ✅ Add fallbacks */}
                    <div className="flex-1 text-left">
                      <h3
                        className="font-semibold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {employee.fullName || 'Unknown Employee'}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {employee.email || 'No email'}
                      </p>
                      {/* ✅ Add null safety for role */}
                      {employee.role && (
                        <span
                          className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium"
                          style={{
                            backgroundColor: 'var(--color-bg-tertiary)',
                            color: 'var(--color-text-tertiary)',
                          }}
                        >
                          {typeof employee.role === 'string' 
                            ? employee.role 
                            : employee.role.name || 'Employee'}
                        </span>
                      )}
                    </div>

                    {/* Selection Indicator */}
                    {selectedEmployeeId === employee.id && (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      >
                        <svg
                          className="w-4 h-4"
                          style={{ color: 'white' }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div 
          className="px-6 py-4 border-t flex items-center justify-end space-x-3"
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
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedEmployeeId}
            className="px-6 py-2 rounded-lg font-medium transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'white' 
            }}
          >
            Confirm Allocation
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSelectionModal;