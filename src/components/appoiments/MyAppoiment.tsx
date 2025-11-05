import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Button,
  Alert,
} from '@mui/material';
import { Add, Refresh } from '@mui/icons-material';
import Navbar from '../Navbar';
import Footer from '../Footer';
import AppoimentCard from './AppoimentCard';
import type { Appointment } from './AppoimentCard';
import { appointmentApi, type ApiAppointment } from '../../api/appointments';
import { useAuth } from '../../contexts/AuthContext';

type FilterType = 'all' | 'pending' | 'approved' | 'ongoing' | 'completed';

export const MyAppoiment = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Transform API appointment to frontend appointment
  const transformApiAppointment = useCallback((apiAppointment: ApiAppointment): Appointment => {
    // Format time from API - handle both string format and object format
    const formatTime = (time: any) => {
      let hour: number, minute: number;
      
      if (typeof time === 'string') {
        // Parse "12:30:00" format
        const [hourStr, minuteStr] = time.split(':');
        hour = parseInt(hourStr, 10);
        minute = parseInt(minuteStr, 10);
      } else if (time && typeof time === 'object') {
        // Handle object format {hour: 12, minute: 30, ...}
        hour = time.hour;
        minute = time.minute;
      } else {
        // Fallback
        hour = 0;
        minute = 0;
      }
      
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      const displayMinute = minute.toString().padStart(2, '0');
      return `${displayHour}:${displayMinute} ${ampm}`;
    };

    return {
      id: apiAppointment.id.toString(),
      date: apiAppointment.date,
      time: formatTime(apiAppointment.time),
      description: apiAppointment.instructions || '',
      status: apiAppointment.status.toLowerCase() as Appointment['status'],
      serviceName: apiAppointment.service,
      vehicleType: apiAppointment.vehicleType,
      vehicleNumber: apiAppointment.vehicleNumber,
      instructions: apiAppointment.instructions,
      // Only show employee data if it exists and if user is not a customer viewing their own appointments
      employeeName: apiAppointment.employee?.fullName || null,
      employeeProfilePicture: '', // API doesn't provide profile pictures yet
      // For customer view, don't include customer data as they already know their own info
      // Only include customer data if user is an employee/admin viewing appointments
      ...(user?.role !== 'CUSTOMER' && {
        customerName: apiAppointment.customer?.fullName || apiAppointment.customerName,
        customerEmail: apiAppointment.customer?.email || apiAppointment.customerEmail,
        customerPhone: apiAppointment.customerPhone,
      }),
    };
  }, [user?.role]);

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching appointments...');
        const apiAppointments = await appointmentApi.getMyAppointments();
        console.log('Raw API response:', apiAppointments);
        
        const transformedAppointments = apiAppointments.map(transformApiAppointment);
        console.log('Transformed appointments:', transformedAppointments);
        
        setAppointments(transformedAppointments);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAppointments();
    }
  }, [user, transformApiAppointment]);

  const handleFilterChange = (_event: React.SyntheticEvent, newValue: FilterType) => {
    setActiveFilter(newValue);
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Refreshing appointments...');
      const apiAppointments = await appointmentApi.getMyAppointments();
      console.log('Raw API response:', apiAppointments);
      
      const transformedAppointments = apiAppointments.map(transformApiAppointment);
      console.log('Transformed appointments:', transformedAppointments);
      
      setAppointments(transformedAppointments);
    } catch (err) {
      console.error('Error refreshing appointments:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh appointments');
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (activeFilter === 'all') return true;
    return appointment.status === activeFilter;
  });

  const getFilterCount = (filter: FilterType) => {
    if (filter === 'all') return appointments.length;
    return appointments.filter((apt) => apt.status === filter).length;
  };

  return (
    <div className="min-h-screen bg-bg-header flex flex-col">
      <Navbar />

      <div className="flex-1 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
            <Typography
              variant="h4"
              className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl"
            >
              My Appointments
            </Typography>
            <div className="flex gap-2 sm:gap-3">
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={handleRefresh}
                sx={{
                  color: '#D4D4D8',
                  borderColor: 'rgba(212, 212, 216, 0.2)',
                  '&:hover': {
                    borderColor: '#D60507',
                    backgroundColor: 'rgba(214, 5, 7, 0.1)',
                  },
                }}
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{
                  backgroundColor: '#D60507',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#B91C1C',
                  },
                }}
              >
                <span className="hidden sm:inline">New Appointment</span>
                <span className="sm:hidden">New</span>
              </Button>
            </div>
          </div>

          <Typography
            variant="body1"
            className="text-text-tertiary mb-6"
          >
            View and manage all your service appointments
          </Typography>

          {/* Filter Tabs */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'rgba(212, 212, 216, 0.2)',
            }}
          >
            <Tabs
              value={activeFilter}
              onChange={handleFilterChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  color: '#A1A1AA',
                  textTransform: 'none',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  fontWeight: 500,
                  minWidth: 'auto',
                  px: { xs: 2, sm: 3 },
                  '&.Mui-selected': {
                    color: '#D60507',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#D60507',
                  height: 3,
                },
              }}
            >
              <Tab
                label={`All (${getFilterCount('all')})`}
                value="all"
              />
              <Tab
                label={`Pending (${getFilterCount('pending')})`}
                value="pending"
              />
              <Tab
                label={`Approved (${getFilterCount('approved')})`}
                value="approved"
              />
              <Tab
                label={`Ongoing (${getFilterCount('ongoing')})`}
                value="ongoing"
              />
              <Tab
                label={`Completed (${getFilterCount('completed')})`}
                value="completed"
              />
            </Tabs>
          </Box>
        </div>

        {/* Error Display */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 4 }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {/* Appointments Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <CircularProgress sx={{ color: '#D60507' }} size={50} />
          </div>
        ) : filteredAppointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="h-full">
                <AppoimentCard appointment={appointment} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-bg-primary rounded-lg border border-border-primary">
            <Typography
              variant="h6"
              className="text-text-tertiary mb-2"
            >
              No appointments found
            </Typography>
            <Typography
              variant="body2"
              className="text-text-muted mb-6"
            >
              {activeFilter === 'all'
                ? 'You have no appointments yet'
                : `No ${activeFilter} appointments`}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                backgroundColor: '#D60507',
                color: '#FFFFFF',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#B91C1C',
                },
              }}
            >
              Book New Appointment
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
