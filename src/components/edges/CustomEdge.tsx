import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath, Position } from 'reactflow';
import { Box, Typography } from '@mui/material';

interface CustomEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  style?: React.CSSProperties;
  markerEnd?: string;
  data?: {
    protocol?: string;
    asnPool?: string;
    unnumbered?: string;
  };
}

const CustomEdge: React.FC<CustomEdgeProps> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <Box
          sx={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
            backgroundColor: 'rgba(26, 26, 26, 0.9)',
            border: '1px solid #333',
            borderRadius: '4px',
            padding: '2px 6px',
            color: '#ffffff',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            minWidth: '60px',
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" sx={{ fontSize: '10px', color: '#90caf9', fontWeight: 600 }}>
            {data?.protocol || 'EBGP'}
          </Typography>
          {data?.asnPool && (
            <Typography variant="caption" sx={{ fontSize: '9px', color: '#b0b0b0', display: 'block' }}>
              ASN: {data.asnPool}
            </Typography>
          )}
          {data?.unnumbered && (
            <Typography variant="caption" sx={{ fontSize: '9px', color: '#b0b0b0', display: 'block' }}>
              {data.unnumbered}
            </Typography>
          )}
        </Box>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge; 