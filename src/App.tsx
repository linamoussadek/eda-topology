import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import EDALayout from './components/layout/EDALayout';
import TopologyBuilder from './features/topology/components/TopologyBuilder';
import TopologyView from './features/topology/components/TopologyView';
import YAMLEditor from './features/yaml/components/YAMLEditor';
import { THEME_CONFIG } from './config/constants';

const theme = createTheme(THEME_CONFIG);

function TopologyBuilderApp() {
  const {
    yamlConfig,
    handleYamlChange,
    isYamlValid,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    fabricName,
  } = TopologyBuilder();

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
      </Box>

      {/* Right Panel: Network Topology */}
      <TopologyView
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        fabricName={fabricName}
      />
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EDALayout>
        <TopologyBuilderApp />
      </EDALayout>
    </ThemeProvider>
  );
}

export default App;
