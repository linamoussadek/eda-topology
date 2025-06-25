import React from 'react';
import { Box, Typography } from '@mui/material';
import PortBadge from './PortBadge';

const legend = [
  { port: 1, type: 'inter-switch', label: 'inter-switch link' },
  { port: 3, type: 'access', label: 'edge link (access)' },
  { port: 10, type: 'lag', label: 'LAG' },
  { port: 12, type: 'multi-homed-lag', label: 'Multi-homed LAG' },
];

const LegendPanel: React.FC = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 28,
      right: 28,
      zIndex: 20,
      background: 'rgba(44, 48, 60, 0.98)',
      border: '1.5px solid #333',
      borderRadius: '14px',
      px: 3,
      py: 2,
      minWidth: 220,
      boxShadow: '0 2px 12px 0 #23293a44',
      display: 'flex',
      flexDirection: 'column',
      gap: 1.5,
    }}
  >
    {legend.map((item) => (
      <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        <PortBadge port={item.port} type={item.type as any} />
        <Typography variant="body2" sx={{ color: '#e2e8f0', ml: 1, fontSize: 15, fontWeight: 400 }}>
          {item.label}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default LegendPanel; 