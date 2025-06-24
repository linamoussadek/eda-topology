import React from 'react';
import { Handle, Position } from 'reactflow';
import { Box, Typography } from '@mui/material';
import RouterIcon from '@mui/icons-material/Router';
import HubIcon from '@mui/icons-material/Hub';

interface CustomNodeProps {
  data: {
    label: string;
    nodeType: 'leaf' | 'spine';
    role: string;
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  const isLeaf = data.nodeType === 'leaf';
  
  return (
    <Box
      sx={{
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: isLeaf ? '#90caf9' : '#f48fb1',
        backgroundColor: '#1a1a1a',
        minWidth: 140,
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
          transform: 'translateY(-2px)',
          borderColor: isLeaf ? '#64b5f6' : '#f06292',
        },
      }}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ 
          background: '#90caf9',
          width: '6px',
          height: '6px',
          border: '1px solid #1a1a1a'
        }} 
      />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isLeaf ? 'rgba(144, 202, 249, 0.2)' : 'rgba(244, 143, 177, 0.2)',
            color: isLeaf ? '#90caf9' : '#f48fb1',
            marginBottom: 1,
          }}
        >
          {isLeaf ? (
            <RouterIcon sx={{ fontSize: 18 }} />
          ) : (
            <HubIcon sx={{ fontSize: 18 }} />
          )}
        </Box>
        
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600,
            color: '#ffffff',
            fontSize: '14px'
          }}
        >
          {data.label}
        </Typography>
        
        <Typography 
          variant="caption" 
          sx={{ 
            color: isLeaf ? '#90caf9' : '#f48fb1',
            fontWeight: 500,
            textTransform: 'uppercase',
            fontSize: '11px',
            letterSpacing: '0.5px'
          }}
        >
          {data.nodeType}
        </Typography>
      </Box>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={{ 
          background: '#90caf9',
          width: '6px',
          height: '6px',
          border: '1px solid #1a1a1a'
        }} 
      />
    </Box>
  );
};

export default CustomNode; 