import { useCallback, useState, useEffect } from 'react';
import {
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { parseYamlToFabric, fabricToTopology, validateYaml } from '../../../utils/yamlParser';
import type { TopologyNodeData } from '../../../types/types';

export default function TopologyBuilder() {
  const [yamlConfig, setYamlConfig] = useState('');
  const [isYamlValid, setIsYamlValid] = useState(true);

  const handleYamlChange = useCallback((newYaml: string) => {
    setYamlConfig(newYaml);
  }, []);

  const initialTopology = (() => {
    try {
      const fabric = parseYamlToFabric(yamlConfig);
      return fabricToTopology(fabric);
    } catch {
      return { nodes: [], edges: [] };
    }
  })();

  const [nodes, setNodes, onNodesChange] = useNodesState<TopologyNodeData>(initialTopology.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialTopology.edges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

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