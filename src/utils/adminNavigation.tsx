import type { Navigation } from '@toolpad/core/AppProvider';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';

export const adminNavigation: Navigation = [
  {
    segment: 'admin/dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'admin/shop',
    title: 'Shop',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'admin/orders',
    title: 'My Orders',
    icon: <HistoryIcon />,
  },
  {
    segment: 'admin/wishlist',
    title: 'Wishlist',
    icon: <FavoriteIcon />,
  },
  {
    segment: 'admin/profile',
    title: 'Profile',
    icon: <AccountCircleIcon />,
  },
];