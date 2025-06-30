import React from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  Alert,
  Snackbar
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { type TopologyNode, type TopologyEdge } from '../../../types/types';

interface TopologyControlsProps {
  onImportYaml: () => void;
  onExportYaml: () => void;
  onAddNode: () => void;
  onClearTopology: () => void;
  onResetTopology: () => void;
  nodes: TopologyNode[];
  edges: TopologyEdge[];
  error: string | null;
  onClearError: () => void;
  isYamlValid: boolean;
}

const TopologyControls: React.FC<TopologyControlsProps> = ({
  onImportYaml,
  onExportYaml,
  onAddNode,
  onClearTopology,
  onResetTopology,
  nodes,
  edges,
  error,
  onClearError,
  isYamlValid
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 2,
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: '12px',
      }}
    >
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          color: '#ffffff', 
          fontWeight: 700,
          fontSize: '24px',
          marginBottom: 3
        }}
      >
        EDA Topology Builder
      </Typography>
      
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" gap={2}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={onImportYaml}
            sx={{ 
              backgroundColor: '#90caf9',
              color: '#000000',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
              '&:hover': {
                backgroundColor: '#64b5f6'
              }
            }}
          >
            Import YAML
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={onExportYaml}
            disabled={nodes.length === 0}
            sx={{ 
              backgroundColor: '#4caf50',
              color: '#ffffff',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
              '&:hover': {
                backgroundColor: '#388e3c'
              },
              '&:disabled': {
                backgroundColor: '#424242',
                color: '#666666'
              }
            }}
          >
            Export YAML
          </Button>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onAddNode}
            sx={{ 
              borderColor: '#ff9800',
              color: '#ff9800',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
              '&:hover': {
                borderColor: '#f57c00',
                backgroundColor: 'rgba(255, 152, 0, 0.1)'
              }
            }}
          >
            Add Node
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={onClearTopology}
            disabled={nodes.length === 0}
            sx={{ 
              borderColor: '#f44336',
              color: '#f44336',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
              '&:hover': {
                borderColor: '#d32f2f',
                backgroundColor: 'rgba(244, 67, 54, 0.1)'
              },
              '&:disabled': {
                borderColor: '#424242',
                color: '#666666'
              }
            }}
          >
            Clear All
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={onResetTopology}
            sx={{ 
              borderColor: '#9c27b0',
              color: '#9c27b0',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
              '&:hover': {
                borderColor: '#7b1fa2',
                backgroundColor: 'rgba(156, 39, 176, 0.1)'
              }
            }}
          >
            Reset
          </Button>
        </Stack>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#b0b0b0',
              fontWeight: 500,
              fontSize: '14px'
            }}
          >
            Nodes: {nodes.length} | Edges: {edges.length}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: '4px',
            backgroundColor: isYamlValid ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
            border: `1px solid ${isYamlValid ? '#4caf50' : '#f44336'}`
          }}>
            <Typography 
              variant="caption" 
              sx={{ 
                color: isYamlValid ? '#4caf50' : '#f44336',
                fontWeight: 600,
                fontSize: '12px'
              }}
            >
              {isYamlValid ? 'Valid YAML' : 'Invalid YAML'}
            </Typography>
          </Box>
        </Box>
      </Stack>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={onClearError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={onClearError} 
          severity="error" 
          sx={{ 
            width: '100%',
            borderRadius: '8px',
            fontWeight: 500,
            backgroundColor: '#d32f2f',
            color: '#ffffff',
            '& .MuiAlert-icon': { color: '#ffffff' }
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default TopologyControls; 