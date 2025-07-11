import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import DashboardSidebar from './components/layout/DashboardSidebar';
import DashboardHeader from './components/layout/DashboardHeader';

interface EDALayoutProps {
  children: ReactNode;
}

export default function EDALayout({ children }: EDALayoutProps) {
  return (
    <Box sx={{ display: 'flex', height: '100vh', fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif", background: '#10141c' }}>
      <DashboardSidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', pl: 0 }}>
        <DashboardHeader />
        <Box sx={{ flex: 1, p: 3, background: '#131723', minHeight: 0 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
} 