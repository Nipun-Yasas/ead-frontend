import type { Navigation } from '@toolpad/core/AppProvider';

import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssessmentIcon from '@mui/icons-material/Assessment';

export const employeeNavigation: Navigation = [
  {
    segment: 'employee/dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'employee/products',
    title: 'My Products',
    icon: <InventoryIcon />,
  },
  {
    segment: 'employee/orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'employee/reports',
    title: 'Reports',
    icon: <AssessmentIcon />,
  },
];