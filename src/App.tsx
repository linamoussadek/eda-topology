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
          background: '#23293a',
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
      gap: 3,
      p: 3,
      background: '#131723',
    }}>
      {/* Left Panel: YAML Configuration */}
      <Box sx={{ 
        flex: 1,
        background: '#1d222e',
        border: '1.5px solid #23293a',
        boxShadow: '0 2px 16px 0 #181a2040',
        borderRadius: '18px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
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
