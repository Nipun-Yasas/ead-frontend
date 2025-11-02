import type { Navigation } from "@toolpad/core/AppProvider";

import DashboardIcon from "@mui/icons-material/Dashboard";

export const adminNavigation: Navigation = [
  {
    segment: "admin/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
];
