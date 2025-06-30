import { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  type Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Box, Alert } from '@mui/material';
import { parseYamlToFabric, fabricToTopology, validateYaml } from '../../../utils/yamlParser';
import { nodeTypes, edgeTypes } from '../config/nodeTypes';

export default function TopologyBuilder() {
  const [yamlConfig, setYamlConfig] = useState('');
  const [isYamlValid, setIsYamlValid] = useState(true);

  // Simple YAML change handler - no server calls
  const handleYamlChange = useCallback((newYaml: string) => {
    setYamlConfig(newYaml);
  }, []);

  // Initialize topology from YAML
  const initialTopology = (() => {
    try {
      const fabric = parseYamlToFabric(yamlConfig);
      return fabricToTopology(fabric);
    } catch {
      return { nodes: [], edges: [] };
    }
  })();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialTopology.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialTopology.edges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Reactive YAML to topology conversion
  useEffect(() => {
    try {
      const isValid = validateYaml(yamlConfig);
      setIsYamlValid(isValid);
      
      if (isValid) {
        const fabric = parseYamlToFabric(yamlConfig);
        const { nodes: newNodes, edges: newEdges } = fabricToTopology(fabric);
        setNodes(newNodes);
        setEdges(newEdges);
      }
    } catch {
      setIsYamlValid(false);
    }
  }, [yamlConfig, setNodes, setEdges]);

  // Get the fabric name for the title
  let fabricName = '';
  try {
    const fabric = parseYamlToFabric(yamlConfig);
    fabricName = fabric.metadata?.name || '';
  } catch {
    // ignore
  }

  return {
    yamlConfig,
    handleYamlChange,
    isYamlValid,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    fabricName,
  };
} 