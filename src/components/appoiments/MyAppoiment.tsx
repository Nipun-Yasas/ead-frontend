import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Button,
} from '@mui/material';
import { Add, Refresh } from '@mui/icons-material';
import Navbar from '../Navbar';
import Footer from '../Footer';
import AppoimentCard from './AppoimentCard';
import type { Appointment } from './AppoimentCard';

type FilterType = 'all' | 'pending' | 'approved' | 'ongoing' | 'completed';

export const MyAppoiment = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with actual API call
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      
      // Simulating API call
      setTimeout(() => {
        const mockAppointments: Appointment[] = [
          {
            id: '1',
            date: '2025-11-10',
            time: '10:00 AM',
            description: 'Regular oil change and tire rotation service',
            status: 'approved',
            serviceName: 'Oil Change & Tire Rotation',
            vehicleType: 'Toyota Camry',
            employeeName: 'John Smith',
            employeeProfilePicture: '',
          },
          {
            id: '2',
            date: '2025-11-08',
            time: '2:00 PM',
            description: 'Complete brake system inspection and repair',
            status: 'pending',
            serviceName: 'Brake System Service',
            vehicleType: 'Honda Civic',
          },
          {
            id: '3',
            date: '2025-11-12',
            time: '9:30 AM',
            description: 'Engine diagnostic and performance check',
            status: 'ongoing',
            serviceName: 'Engine Diagnostics',
            vehicleType: 'Ford F-150',
            employeeName: 'Sarah Johnson',
            employeeProfilePicture: '',
          },
          {
            id: '4',
            date: '2025-11-05',
            time: '11:00 AM',
            description: 'Air conditioning system repair and recharge',
            status: 'completed',
            serviceName: 'AC Service',
            vehicleType: 'BMW 3 Series',
            employeeName: 'Mike Davis',
            employeeProfilePicture: '',
          },
          {
            id: '5',
            date: '2025-11-15',
            time: '3:00 PM',
            description: 'Battery replacement and electrical system check',
            status: 'approved',
            serviceName: 'Battery Service',
            vehicleType: 'Tesla Model 3',
            employeeName: 'Emma Wilson',
            employeeProfilePicture: '',
          },
          {
            id: '6',
            date: '2025-11-07',
            time: '1:00 PM',
            description: 'Transmission fluid change and inspection',
            status: 'pending',
            serviceName: 'Transmission Service',
            vehicleType: 'Chevrolet Silverado',
          },
        ];
        
        setAppointments(mockAppointments);
        setLoading(false);
      }, 1000);
    };

    fetchAppointments();
  }, []);

  const handleFilterChange = (_event: React.SyntheticEvent, newValue: FilterType) => {
    setActiveFilter(newValue);
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => setLoading(false), 500);
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
