import { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

import AnnotationNode from './components/AnnotationNode';
import ToolbarNode from './components/ToolbarNode';
import ResizerNode from './components/ResizerNode';
import CircleNode from './components/CircleNode';
import TextInputNode from './components/TextInputNode';
import ButtonEdge from './components/ButtonEdge';
import EDALayout from './components/EDALayout';
import YAMLEditor from './components/YAMLEditor';
import { CssBaseline, ThemeProvider, createTheme, Box, Alert } from '@mui/material';
import { parseYamlToFabric, fabricToTopology, validateYaml } from './utils/yamlParser';

const nodeTypes = {
  annotation: AnnotationNode,
  tools: ToolbarNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextInputNode,
};

const edgeTypes = {
  button: ButtonEdge,
};

const nodeClassName = (node: Node) => node.type || 'default';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8f3fff', // vivid purple
    },
    secondary: {
      main: '#6366f1', // blue accent
    },
    background: {
      default: '#181a20',
      paper: '#23293a',
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#94a3b8',
    },
    info: {
      main: '#4f46e5',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
    fontWeightBold: 700,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    h6: {
      fontWeight: 700,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #23293a 0%, #181a20 100%)',
          borderRadius: 14,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});

// Sample EDA YAML configuration
const sampleYamlConfig = `apiVersion: fabrics.eda.nokia.com/v1alpha1
kind: Fabric
metadata:
  name: myfabric-1
  namespace: eda
spec:
  leafs:
    leafNodeSelector:
      - eda.nokia.com/role=leaf
  spines:
    spineNodeSelector:
      - eda.nokia.com/role=spine
  interSwitchLinks:
    linkSelector:
      - eda.nokia.com/role=interSwitch
    unnumbered: IPV6
  systemPoolIPV4: systemipv4-pool
  underlayProtocol:
    protocol:
      - EBGP
    bgp:
      asnPool: asn-pool
  overlayProtocol:
    protocol: EBGP`;

// Network topology nodes and edges
const networkNodes = [
  {
    id: 'spine-1',
    type: 'input',
    data: { label: 'Spine-1', nodeType: 'spine' },
    position: { x: 250, y: 50 },
    style: { 
      background: '#ff6b6b', 
      border: '2px solid #ff5252',
      borderRadius: '8px',
      color: 'white',
      fontWeight: 'bold'
    }
  },
  {
    id: 'spine-2',
    type: 'input',
    data: { label: 'Spine-2', nodeType: 'spine' },
    position: { x: 450, y: 50 },
    style: { 
      background: '#ff6b6b', 
      border: '2px solid #ff5252',
      borderRadius: '8px',
      color: 'white',
      fontWeight: 'bold'
    }
  },
  {
    id: 'leaf-1',
    type: 'default',
    data: { label: 'Leaf-1', nodeType: 'leaf' },
    position: { x: 100, y: 200 },
    style: { 
      background: '#4ecdc4', 
      border: '2px solid #26a69a',
      borderRadius: '8px',
      color: 'white',
      fontWeight: 'bold'
    }
  },
  {
    id: 'leaf-2',
    type: 'default',
    data: { label: 'Leaf-2', nodeType: 'leaf' },
    position: { x: 300, y: 200 },
    style: { 
      background: '#4ecdc4', 
      border: '2px solid #26a69a',
      borderRadius: '8px',
      color: 'white',
      fontWeight: 'bold'
    }
  },
  {
    id: 'leaf-3',
    type: 'output',
    data: { label: 'Leaf-3', nodeType: 'leaf' },
    position: { x: 500, y: 200 },
    style: { 
      background: '#4ecdc4', 
      border: '2px solid #26a69a',
      borderRadius: '8px',
      color: 'white',
      fontWeight: 'bold'
    }
  },
  {
    id: 'annotation-1',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 1,
      label: 'Spine-Leaf Network Topology',
      arrowStyle: {
        right: 0,
        bottom: 0,
        transform: 'translate(-30px,10px) rotate(-80deg)',
      },
    },
    position: { x: 50, y: -50 },
  },
];

const networkEdges = [
  {
    id: 'spine1-leaf1',
    source: 'spine-1',
    target: 'leaf-1',
    animated: true,
    style: { stroke: '#ffd700', strokeWidth: 3 },
    label: 'EBGP',
    labelStyle: { fill: '#ffd700', fontWeight: 'bold' },
  },
  {
    id: 'spine1-leaf2',
    source: 'spine-1',
    target: 'leaf-2',
    animated: true,
    style: { stroke: '#ffd700', strokeWidth: 3 },
    label: 'EBGP',
    labelStyle: { fill: '#ffd700', fontWeight: 'bold' },
  },
  {
    id: 'spine1-leaf3',
    source: 'spine-1',
    target: 'leaf-3',
    animated: true,
    style: { stroke: '#ffd700', strokeWidth: 3 },
    label: 'EBGP',
    labelStyle: { fill: '#ffd700', fontWeight: 'bold' },
  },
  {
    id: 'spine2-leaf1',
    source: 'spine-2',
    target: 'leaf-1',
    animated: true,
    style: { stroke: '#ffd700', strokeWidth: 3 },
    label: 'EBGP',
    labelStyle: { fill: '#ffd700', fontWeight: 'bold' },
  },
  {
    id: 'spine2-leaf2',
    source: 'spine-2',
    target: 'leaf-2',
    animated: true,
    style: { stroke: '#ffd700', strokeWidth: 3 },
    label: 'EBGP',
    labelStyle: { fill: '#ffd700', fontWeight: 'bold' },
  },
  {
    id: 'spine2-leaf3',
    source: 'spine-2',
    target: 'leaf-3',
    animated: true,
    style: { stroke: '#ffd700', strokeWidth: 3 },
    label: 'EBGP',
    labelStyle: { fill: '#ffd700', fontWeight: 'bold' },
  },
];

function TopologyBuilder() {
  const [yamlConfig, setYamlConfig] = useState(sampleYamlConfig);
  const [isYamlValid, setIsYamlValid] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize topology from YAML
  const initialTopology = (() => {
    try {
      const fabric = parseYamlToFabric(sampleYamlConfig);
      return fabricToTopology(fabric);
    } catch {
      return { nodes: [], edges: [] };
    }
  })();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialTopology.nodes as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialTopology.edges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Reactive YAML to topology conversion
  useEffect(() => {
    try {
      setError(null);
      const isValid = validateYaml(yamlConfig);
      setIsYamlValid(isValid);
      
      if (isValid) {
        const fabric = parseYamlToFabric(yamlConfig);
        const { nodes: newNodes, edges: newEdges } = fabricToTopology(fabric);
        setNodes(newNodes as any);
        setEdges(newEdges);
      }
    } catch (err) {
      setIsYamlValid(false);
      setError(err instanceof Error ? err.message : 'Invalid YAML format');
    }
  }, [yamlConfig, setNodes, setEdges]);

  const handleYamlChange = useCallback((newYaml: string) => {
    setYamlConfig(newYaml);
  }, []);

  return (
    <Box sx={{ 
      display: 'flex', 
      height: 'calc(100vh - 120px)', 
      gap: 2,
      p: 2,
      background: 'linear-gradient(135deg, #23293a 0%, #181a20 100%)',
    }}>
      {/* Left Panel: YAML Configuration */}
      <Box sx={{ 
        flex: 1,
        background: 'linear-gradient(135deg, #23293a 0%, #181a20 100%)',
        border: '1.5px solid #4f46e5',
        boxShadow: '0 2px 16px 0 #4f46e533',
        borderRadius: '18px',
        overflow: 'hidden',
      }}>
        <YAMLEditor
          value={yamlConfig}
          onChange={handleYamlChange}
          isValid={isYamlValid}
        />
        {error && (
          <Box sx={{ p: 2 }}>
            <Alert severity="error" sx={{ backgroundColor: '#1b5e20' }}>
              {error}
            </Alert>
          </Box>
        )}
      </Box>

      {/* Right Panel: Network Topology */}
      <Box sx={{ 
        flex: 2,
        background: 'linear-gradient(135deg, #23293a 0%, #181a20 100%)',
        border: '1.5px solid #8f3fff',
        boxShadow: '0 2px 24px 0 #8f3fff33',
        borderRadius: '18px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {!isYamlValid && (
          <Box sx={{ 
            position: 'absolute', 
            top: 10, 
            left: 10, 
            right: 10, 
            zIndex: 1000 
          }}>
            <Alert severity="warning" sx={{ backgroundColor: '#f57c00' }}>
              Invalid YAML configuration. Topology may not display correctly.
            </Alert>
          </Box>
        )}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="bottom-left"
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={{
            style: { stroke: 'url(#edge-gradient)', strokeWidth: 2 },
          }}
        >
          <defs>
            <linearGradient id="edge-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8f3fff" />
            </linearGradient>
          </defs>
          <MiniMap 
            zoomable 
            pannable 
            nodeClassName={nodeClassName}
            style={{
              background: 'linear-gradient(135deg, #23293a 0%, #181a20 100%)',
              border: '1.5px solid #6366f1',
              borderRadius: 12,
            }}
          />
          <Controls 
            style={{
              background: 'rgba(79,70,229,0.85)',
              border: '1.5px solid #8f3fff',
              borderRadius: 12,
              color: '#e2e8f0',
            }}
          />
          <Background 
            color="#23293a" 
            gap={22}
            size={1.5}
          />
        </ReactFlow>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EDALayout>
        <TopologyBuilder />
      </EDALayout>
    </ThemeProvider>
  );
}

export default App;
