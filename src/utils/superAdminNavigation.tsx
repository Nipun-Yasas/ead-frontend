import type { Navigation } from '@toolpad/core/AppProvider';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const superAdminNavigation: Navigation = [
  {
    segment: 'superadmin/dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'superadmin/task-allocation',
    title: 'Task Allocation',
    icon: <AssignmentIcon />,
  },
  {
    segment: 'superadmin/users',
    title: 'User Management',
    icon: <PeopleIcon />,
  },
];