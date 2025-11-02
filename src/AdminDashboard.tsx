import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "./components/adminDashboard/StatCard";
import ServiceStatusChart from "./components/adminDashboard/ServiceStatusChart";
import MonthlyTrendChart from "./components/adminDashboard/MonthlyTrendChart";
import EmployeeWorkloadChart from "./components/adminDashboard/EmployeeWorkloadChart";
import UpcomingAppointmentsTable from "./components/adminDashboard/UpcomingAppointmentsTable";

interface DashboardStats {
  totalServices: number;
  completedServices: number;
  inProgressServices: number;
  pendingServices: number;
  todayAppointments: number;
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

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token") || "";

        if (!token) {
          navigate("/login");
          return;
        }

      const response = await fetch(
        "http://localhost:8080/api/admin/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard stats");
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl text-red-600">
          Error: {error || "Failed to load dashboard"}
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[rgb(0_0_0_/0.8)] text-text-secondary">
      {/* Header */}
      <header className="bg-primary text-black p-6 shadow-lg">
        <h1 className="text-3xl font-bold">ADMIN DASHBOARD</h1>
      </header>

      <div className="container mx-auto p-6 ">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 text-text-primary">
          <StatCard
            title="TOTAL SERVICES"
            value={stats.totalServices}
            bgColor="bg-[rgb(0_0_0_/0.7)]"
        
          />
          <StatCard
            title="COMPLETED"
            value={stats.completedServices}
            bgColor="bg-[rgb(0_0_0_/0.7)]"
          />
          <StatCard
            title="IN PROGRESS"
            value={stats.inProgressServices}
            bgColor="bg-[rgb(0_0_0_/0.7)]"
          />
          <StatCard
            title="PENDING"
            value={stats.pendingServices}
            bgColor="bg-[rgb(0_0_0_/0.7)]"
          />
          <StatCard
            title="TODAY APPOINTMENTS"
            value={stats.todayAppointments}
            bgColor="bg-[rgb(0_0_0_/0.7)]"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trend */}
          <div className="bg-black rounded-lg shadow-md p-6 bg-[rgb(0_0_0_/0.7)]">
            <h2 className="text-xl font-bold mb-4 text-primary ">
              AVERAGE SERVICE TIME TREND
            </h2>
            <MonthlyTrendChart data={stats.monthlyTrend} />
          </div>

          {/* Services by Status */}
          <div className="bg-black rounded-lg shadow-md p-6 bg-[rgb(0_0_0_/0.7)]">
            <h2 className="text-xl font-bold mb-4 text-primary">
              SERVICES BY STATUS
            </h2>
            <ServiceStatusChart data={stats.servicesByStatus} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div className="bg-black rounded-lg shadow-md p-6 bg-[rgb(0_0_0_/0.7)]">
            <h2 className="text-xl font-bold mb-4 text-primary">
              UPCOMING APPOINTMENTS
            </h2>
            <UpcomingAppointmentsTable data={stats.upcomingAppointments} />
          </div>

          {/* Employee Workload */}
          <div className="bg-black rounded-lg shadow-md p-6 bg-[rgb(0_0_0_/0.7)]">
            <h2 className="text-xl font-bold mb-4 text-primary">
              WORKLOAD PER EMPLOYEE
            </h2>
            <EmployeeWorkloadChart data={stats.employeeWorkload} />
          </div>
        </div>
      </div>
    </div>
  );
}
