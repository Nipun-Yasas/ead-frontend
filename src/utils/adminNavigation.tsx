import type { Navigation } from "@toolpad/core/AppProvider";

import DashboardIcon from "@mui/icons-material/Dashboard";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BuildIcon from "@mui/icons-material/Build";
import PeopleIcon from "@mui/icons-material/People";

export const adminNavigation: Navigation = [
  {
    segment: "admin/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "admin/appointments",
    title: "Appointments",
    icon: <EventAvailableIcon />,
  },
  {
    segment: "admin/services",
    title: "Services",
    icon: <BuildIcon />,
  },
  {
    segment: "admin/employees",
    title: "Employees",
    icon: <PeopleIcon />,
  },
];
