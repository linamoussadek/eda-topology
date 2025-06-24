import type { ReactNode } from 'react';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

const Sidebar = styled(Box)(() => ({
  width: 240,
  backgroundColor: '#1a1a2e',
  borderRight: '1px solid #333',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  zIndex: 1200,
}));

const Main = styled(Box)(() => ({
  marginLeft: 240,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: '#0f0f23',
}));

const Header = styled(AppBar)(() => ({
  backgroundColor: '#6b46c1',
  boxShadow: 'none',
  borderBottom: '1px solid #333',
}));

interface EDALayoutProps {
  children: ReactNode;
}

export default function EDALayout({ children }: EDALayoutProps) {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar>
        <Box sx={{ p: 2, borderBottom: '1px solid #333' }}>
          <Typography variant="h6" sx={{ color: '#e2e8f0', fontWeight: 600 }}>
            Nokia EDA
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            Event Driven Automation
          </Typography>
        </Box>
        
        <Box sx={{ flex: 1, p: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#94a3b8', mb: 1 }}>
            Topology Builder
          </Typography>
        </Box>
      </Sidebar>

      {/* Main Content */}
      <Main>
        <Header position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ color: '#e2e8f0' }}>
              Network Topology Builder
            </Typography>
          </Toolbar>
        </Header>
        
        <Box sx={{ flex: 1, p: 2 }}>
          {children}
        </Box>
      </Main>
    </Box>
  );
} 