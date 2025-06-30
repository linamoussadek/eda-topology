import React from 'react';
import { Box } from '@mui/material';

export type PortType = 'inter-switch' | 'access' | 'lag' | 'multi-homed-lag';

const portTypeStyles: Record<PortType, { bg: string; border: string; color: string }> = {
  'inter-switch': { bg: '#ede7f6', border: '#b39ddb', color: '#6d4caf' }, // purple
  'access': { bg: '#eceff1', border: '#b0bec5', color: '#37474f' }, // gray
  'lag': { bg: '#e8f5e9', border: '#66bb6a', color: '#1b5e20' }, // green
  'multi-homed-lag': { bg: '#e3f2fd', border: '#29b6f6', color: '#01579b' }, // blue
};

export interface PortBadgeProps {
  port: string | number;
  type: PortType;
  style?: React.CSSProperties;
}

const PortBadge: React.FC<PortBadgeProps> = ({ port, type, style }) => {
  const s = portTypeStyles[type];
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 22,
        height: 22,
        px: 1,
        fontSize: 13,
        fontWeight: 500,
        borderRadius: '7px',
        background: s.bg,
        color: s.color,
        border: `2px solid ${s.border}`,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        mr: 0.5,
        mb: 0.5,
        ...style,
      }}
    >
      {port}
    </Box>
  );
};

export default PortBadge; 