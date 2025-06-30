import ReactFlow, {
  Controls,
  Background,
  type Connection,
  type OnNodesChange,
  type OnEdgesChange,
  type Node,
  type Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Box } from '@mui/material';
import { nodeTypes, edgeTypes } from '../config/nodeTypes';
import type { TopologyNodeData } from '../../../types/types';

interface TopologyViewProps {
  nodes: Node<TopologyNodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (params: Connection) => void;
  fabricName: string;
}

export default function TopologyView({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  fabricName,
}: TopologyViewProps) {
  return (
    <Box sx={{ 
      flex: 2,
      background: '#1d222e',
      border: '1.5px solid #23293a',
      boxShadow: '0 2px 24px 0 #23293a44',
      borderRadius: '18px',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Topology Title */}
      <Box sx={{
        position: 'absolute',
        top: 18,
        left: 24,
        zIndex: 10,
      }}>
        <span style={{
          fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
          fontWeight: 700,
          fontSize: 18,
          color: '#e2e8f0',
          letterSpacing: 0.2,
          textShadow: '0 2px 8px #23293a',
        }}>
          {fabricName ? `${fabricName} Network Topology` : 'Network Topology'}
        </span>
      </Box>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="bottom-left"
        style={{
          background: '#1d222e',
        }}
      >
        <Controls />
        <Background color="#666" gap={16} />
      </ReactFlow>
    </Box>
  );
} 