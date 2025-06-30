import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

const icons = [
  { icon: <DashboardIcon />, label: 'Home', active: false },
  { icon: <DeviceHubIcon />, label: 'Topology', active: true }, // active for topology page
  { icon: <ListAltIcon />, label: 'Transactions', active: false },
  { icon: <SettingsIcon />, label: 'Settings', active: false },
  { icon: <PersonIcon />, label: 'Profile', active: false },
];

const DashboardSidebar: React.FC = () => (
  <Box
    sx={{
      width: 72,
      background: '#181c23',
      borderRight: '1.5px solid #23293a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: 2,
      borderTopLeftRadius: 18,
      borderBottomLeftRadius: 18,
      boxShadow: '2px 0 12px 0 #181a2040',
      minHeight: '100vh',
      gap: 1.5,
    }}
  >
    {icons.map((item, _) => (
      <Tooltip title={item.label} placement="right" key={item.label}>
        <IconButton
          sx={{
            color: item.active ? '#8f3fff' : '#94a3b8',
            background: item.active ? 'rgba(143,63,255,0.12)' : 'none',
            borderRadius: 2,
            mb: 1.5,
            width: 44,
            height: 44,
            '&:hover': {
              background: 'rgba(143,63,255,0.08)',
              color: '#8f3fff',
            },
            transition: 'all 0.2s',
          }}
        >
          {item.icon}
        </IconButton>
      </Tooltip>
    ))}
  </Box>
);

export default DashboardSidebar; 