import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import {
  CheckCircle,
  Clock,
  PlayCircle,
  Calendar,
  Package,
  XCircle,
  Users,
  UserCheck,
  ShieldCheck,
} from "lucide-react";

import StatCard from "./StatCard";

interface DashboardStats {
  totalServices: number;
  completedServices: number;
  inProgressServices: number;
  pendingServices: number;
  todayAppointments: number;
  cancelledServices: number;
  totalUsers: number;
  totalEmployees: number;
  totalAdmins: number;
  servicesByStatus: { status: string; count: number }[];
  monthlyTrend: { month: string; value: number }[];
  employeeWorkload: { employeeName: string; taskCount: number }[];
  upcomingAppointments: {
    customerName: string;
    vehicleModel: string;
    serviceType: string;
    appointmentDate: string;
  }[];
}

/* Dummy data used for local/dev preview */
const DUMMY_STATS: DashboardStats = {
  totalServices: 1240,
  completedServices: 980,
  inProgressServices: 120,
  pendingServices: 140,
  todayAppointments: 18,
  cancelledServices: 25,
  totalUsers: 450,
  totalEmployees: 35,
  totalAdmins: 8,
  servicesByStatus: [
    { status: "COMPLETED", count: 980 },
    { status: "IN_PROGRESS", count: 120 },
    { status: "PENDING", count: 140 },
  ],
  monthlyTrend: [
    { month: "Jan", value: 80 },
    { month: "Feb", value: 95 },
    { month: "Mar", value: 110 },
    { month: "Apr", value: 120 },
    { month: "May", value: 130 },
    { month: "Jun", value: 140 },
    { month: "Jul", value: 150 },
    { month: "Aug", value: 135 },
    { month: "Sep", value: 125 },
    { month: "Oct", value: 140 },
    { month: "Nov", value: 155 },
    { month: "Dec", value: 160 },
  ],
  employeeWorkload: [
    { employeeName: "A. Silva", taskCount: 24 },
    { employeeName: "B. Perera", taskCount: 18 },
    { employeeName: "C. Fernando", taskCount: 15 },
    { employeeName: "D. Kumar", taskCount: 12 },
  ],
  upcomingAppointments: [
    {
      customerName: "Michael Scott",
      vehicleModel: "Toyota Corolla",
      serviceType: "Oil Change",
      appointmentDate: new Date().toISOString(),
    },
    {
      customerName: "Pam Beesly",
      vehicleModel: "Honda Civic",
      serviceType: "Brake Service",
      appointmentDate: new Date(Date.now() + 86400000).toISOString(),
    },
    {
      customerName: "Jim Halpert",
      vehicleModel: "Ford Ranger",
      serviceType: "Inspection",
      appointmentDate: new Date(Date.now() + 2 * 86400000).toISOString(),
    },
  ],
};

export default function Dashboard() {
  const [stats] = useState<DashboardStats | null>(DUMMY_STATS);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "var(--color-bg-primary)",
          color: "var(--color-text-secondary)",
        }}
      >
        <CircularProgress color="inherit" />
        <Typography
          sx={{ ml: 2, fontSize: 18, color: "var(--color-text-secondary)" }}
        >
          Loading dashboard...
        </Typography>
      </Box>
    );
  }

  if (error || !stats) {

    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "var(--color-bg-primary)",
          px: 2,
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 800, width: "100%" }}>
          <Typography variant="h6">Error</Typography>
          <Typography>{error || "Failed to load dashboard"}</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", pb: 4 }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 0.5,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
            }}
          >
            Dashboard Overview
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--color-text-tertiary)" }}
          >
            Monitor your service center performance
          </Typography>
        </Box>

        {/* First Row - 3 Cards */}
       <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 3,
            mb: 4,
          }}
        >
            <StatCard
              title="TOTAL SERVICES"
              value={stats.totalServices}
              icon={<Package size={32} color="#007BFF" />}
              color="#007BFF"
            />
            <StatCard
              title="COMPLETED"
              value={stats.completedServices}
              icon={<CheckCircle size={32} color="#28a745" />}
              color="#28a745"
            />
            <StatCard
              title="IN PROGRESS"
              value={stats.inProgressServices}
              icon={<PlayCircle size={32} color="#6A0DAD" />}
              color="#6A0DAD"
            />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 3,
            mb: 4,
          }}
        >
            <StatCard
              title="PENDING"
              value={stats.pendingServices}
              icon={<Clock size={32} color="#FF7A00" />}
              color="#FF7A00"
            />
            <StatCard
              title="TODAY'S APPOINTMENTS"
              value={stats.todayAppointments}
              icon={<Calendar size={32} color="#D60507" />}
              color="#D60507"
            />
            <StatCard
              title="CANCELLED"
              value={stats.cancelledServices}
              icon={<XCircle size={32} color="#dc3545" />}
              color="#dc3545"
            />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 3,
            mb: 4,
          }}
        >
            <StatCard
              title="TOTAL USERS"
              value={stats.totalUsers}
              icon={<Users size={32} color="#17a2b8" />}
              color="#17a2b8"
            />
            <StatCard
              title="EMPLOYEES"
              value={stats.totalEmployees}
              icon={<UserCheck size={32} color="#20c997" />}
              color="#20c997"
            />
            <StatCard
              title="ADMINS"
              value={stats.totalAdmins}
              icon={<ShieldCheck size={32} color="#6610f2" />}
              color="#6610f2"
            />
        </Box>
      </Container>
    </Box>
  );
}
