import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

interface EDALayoutProps {
  children: ReactNode;
}

export default function EDALayout({ children }: EDALayoutProps) {
  return (
    <Box sx={{ display: 'flex', height: '100vh', fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif", background: '#181a20' }}>
      {/* Sidebar */}
      <DashboardSidebar />
      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', pl: 0 }}>
        <DashboardHeader />
        <Box sx={{ flex: 1, p: 3, background: '#181a20', minHeight: 0 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
} 