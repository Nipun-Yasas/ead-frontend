import type { Navigation } from '@toolpad/core/AppProvider';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';

export const superAdminNavigation: Navigation = [
  {
    segment: 'superadmin/dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'superadmin/users',
    title: 'User Management',
    icon: <PeopleIcon />,
  },
  {
    segment: 'superadmin/inventory',
    title: 'Inventory',
    icon: <InventoryIcon />,
  },
  {
    segment: 'superadmin/settings',
    title: 'Settings',
    icon: <SettingsIcon />,
  },
];