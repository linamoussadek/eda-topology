import type { ReactNode } from 'react';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

const Sidebar = styled(Box)(() => ({
  width: 240,
  backgroundColor: '#181a20',
  borderRight: '1.5px solid #23293a',
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
  backgroundColor: '#181a20',
}));

const Header = styled(AppBar)(() => ({
  backgroundColor: '#8f3fff',
  boxShadow: 'none',
  borderBottom: '1.5px solid #23293a',
  minHeight: 64,
  display: 'flex',
  justifyContent: 'center',
}));

interface EDALayoutProps {
  children: ReactNode;
}

export default function EDALayout({ children }: EDALayoutProps) {
  return (
    <Box sx={{ display: 'flex', height: '100vh', fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif" }}>
      {/* Sidebar */}
      <Sidebar>
        <Box sx={{ p: 2, borderBottom: '1.5px solid #23293a' }}>
          <Typography variant="h6" sx={{ color: '#e2e8f0', fontWeight: 700, fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif" }}>
            Nokia EDA
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif" }}>
            Event Driven Automation
          </Typography>
        </Box>
        <Box sx={{ flex: 1, p: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#94a3b8', mb: 1, fontWeight: 600, fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif" }}>
            Topology Builder
          </Typography>
        </Box>
      </Sidebar>

      {/* Main Content */}
      <Main>
        <Header position="static">
          <Toolbar sx={{ minHeight: 64, display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Echidna logo placeholder */}
            <Box sx={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1 0%, #8f3fff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
              {/* Replace with actual SVG/PNG if available */}
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 22, fontFamily: 'monospace' }}>N</span>
            </Box>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, letterSpacing: 0.5, fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif" }}>
              Nokia Event Driven Automation
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