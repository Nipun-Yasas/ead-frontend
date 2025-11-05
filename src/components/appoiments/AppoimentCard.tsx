import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Stack,
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  Person,
  Description,
} from '@mui/icons-material';

export interface Appointment {
  id: string;
  date: string;
  time: string;
  description: string;
  status: 'pending' | 'approved' | 'ongoing' | 'completed' | 'cancelled';
  employeeName?: string | null;
  employeeProfilePicture?: string;
  serviceName?: string;
  vehicleType?: string;
  vehicleNumber?: string;
  instructions?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppoimentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'ongoing':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card
      sx={{
        backgroundColor: '#171717',
        border: '1px solid rgba(212, 212, 216, 0.2)',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          borderColor: 'rgba(212, 212, 216, 0.3)',
          boxShadow: '0 4px 12px rgba(214, 5, 7, 0.1)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header with Status */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            {appointment.serviceName || 'Service Appointment'}
          </Typography>
          <Chip
            label={appointment.status.toUpperCase()}
            color={getStatusColor(appointment.status)}
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          />
        </Box>

        {/* Date and Time */}
        <Stack spacing={1.5} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <CalendarToday sx={{ color: '#D60507', fontSize: '1.2rem' }} />
            <Typography
              variant="body2"
              sx={{
                color: '#D4D4D8',
                fontSize: '0.95rem',
              }}
            >
              {formatDate(appointment.date)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AccessTime sx={{ color: '#D60507', fontSize: '1.2rem' }} />
            <Typography
              variant="body2"
              sx={{
                color: '#D4D4D8',
                fontSize: '0.95rem',
              }}
            >
              {appointment.time}
            </Typography>
          </Box>
        </Stack>

        {/* Description */}
        {appointment.description && (
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              mb: 2,
              alignItems: 'flex-start',
            }}
          >
            <Description sx={{ color: '#D60507', fontSize: '1.2rem', mt: 0.2 }} />
            <Typography
              variant="body2"
              sx={{
                color: '#A1A1AA',
                fontSize: '0.9rem',
                lineHeight: 1.6,
              }}
            >
              {appointment.description}
            </Typography>
          </Box>
        )}

        {/* Vehicle Type */}
        {appointment.vehicleType && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                color: '#71717A',
                fontSize: '0.8rem',
              }}
            >
              Vehicle: {appointment.vehicleType}
            </Typography>
          </Box>
        )}

        {/* Assigned Employee */}
        {appointment.employeeName && (
          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: '1px solid rgba(212, 212, 216, 0.15)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Person sx={{ color: '#D60507', fontSize: '1.2rem' }} />
              <Typography
                variant="caption"
                sx={{
                  color: '#71717A',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                }}
              >
                Assigned To:
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1.5 }}>
              <Avatar
                src={appointment.employeeProfilePicture}
                alt={appointment.employeeName}
                sx={{
                  width: 40,
                  height: 40,
                  border: '2px solid #D60507',
                }}
              >
                {appointment.employeeName.charAt(0).toUpperCase()}
              </Avatar>
              <Typography
                variant="body2"
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 500,
                }}
              >
                {appointment.employeeName}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AppoimentCard;
