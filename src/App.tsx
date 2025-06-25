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
import CustomNode from './components/CustomNode';
import { CssBaseline, ThemeProvider, createTheme, Box, Alert } from '@mui/material';
import { parseYamlToFabric, fabricToTopology, validateYaml } from './utils/yamlParser';
import LegendPanel from './components/LegendPanel';

const nodeTypes = {
  annotation: AnnotationNode,
  tools: ToolbarNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextInputNode,
  custom: CustomNode,
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

const YAML_API_URL = 'http://localhost:5174/api/yaml';

function TopologyBuilder() {
  const [yamlConfig, setYamlConfig] = useState('');
  const [isYamlValid, setIsYamlValid] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch YAML from backend on mount
  useEffect(() => {
    fetch(YAML_API_URL)
      .then(res => res.json())
      .then(data => {
        setYamlConfig(data.yaml);
      })
      .catch(() => {
        setError('Failed to load YAML from server');
      });
  }, []);

  // Save YAML to backend on every change
  const handleYamlChange = useCallback((newYaml: string) => {
    setYamlConfig(newYaml);
    fetch(YAML_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ yaml: newYaml })
    }).catch(() => setError('Failed to save YAML to server'));
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
      setError(null);
      const isValid = validateYaml(yamlConfig);
      setIsYamlValid(isValid);
      
      if (isValid) {
        const fabric = parseYamlToFabric(yamlConfig);
        const { nodes: newNodes, edges: newEdges } = fabricToTopology(fabric);
        setNodes(newNodes);
        setEdges(newEdges);
      }
    } catch (err) {
      setIsYamlValid(false);
      setError(err instanceof Error ? err.message : 'Invalid YAML format');
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
            fontSize: 20,
            color: '#e2e8f0',
            letterSpacing: 0.2,
            textShadow: '0 2px 8px #23293a',
          }}>
            {fabricName ? `${fabricName} Network Topology` : 'Network Topology'}
          </span>
        </Box>
        {/* Legend Panel */}
        <LegendPanel />
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
          fitViewOptions={{ padding: 0.2 }}
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
