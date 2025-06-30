import React from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DashboardHeader: React.FC = () => (
  <AppBar
    position="static"
    sx={{
      background: '#181c23',
      boxShadow: '0 2px 12px 0 #23293a44',
      borderBottom: '1.5px solid #23293a',
      minHeight: 64,
      display: 'flex',
      justifyContent: 'center',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      px: 0,
    }}
  >
    <Toolbar sx={{ minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3 }}>
      {/* Left: Logo and Product Name */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Nokia logo placeholder */}
        <Box sx={{ width: 36, height: 36, borderRadius: '8px', background: '#0a0a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
          <Typography sx={{ color: '#4f8cff', fontWeight: 900, fontSize: 22, fontFamily: 'monospace', letterSpacing: 2 }}>NOKIA</Typography>
        </Box>
        <Typography variant="h6" sx={{ color: '#e2e8f0', fontWeight: 700, letterSpacing: 0.5, fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif" }}>
          Event Driven Automation
        </Typography>
      </Box>
      {/* Right: Icons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton sx={{ color: '#94a3b8' }}>
          <NotificationsIcon />
        </IconButton>
        <IconButton sx={{ color: '#94a3b8' }}>
          <AccountCircleIcon />
        </IconButton>
        <Avatar sx={{ width: 32, height: 32, bgcolor: '#6366f1', fontSize: 16, fontWeight: 700 }}>IL</Avatar>
      </Box>
    </Toolbar>
  </AppBar>
);

export default DashboardHeader; 