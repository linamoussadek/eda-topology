import { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Alert,
  Button,
  ButtonGroup,
  Tooltip,
} from '@mui/material';
import { generateSampleYaml } from '../utils/yamlParser';

interface YAMLEditorProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
}

export default function YAMLEditor({ value, onChange, isValid }: YAMLEditorProps) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  }, [onChange]);

  const handleQuickConfig = useCallback((config: {
    spineCount?: number;
    leafCount?: number;
    protocol?: string;
    fabricName?: string;
  }) => {
    const newYaml = generateSampleYaml(config);
    setLocalValue(newYaml);
    onChange(newYaml);
  }, [onChange]);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #333', backgroundColor: '#23293a' }}>
        <Typography variant="h6" sx={{ color: '#e2e8f0', mb: 1, fontWeight: 600 }}>
          EDA Fabric Configuration
        </Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
          Edit the YAML configuration to modify the network topology
        </Typography>
        
        {/* Quick Configuration Buttons */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 1 }}>
            Quick Configurations:
          </Typography>
          <ButtonGroup size="small" variant="outlined" sx={{ flexWrap: 'wrap' }}>
            <Tooltip title="2 Spines, 3 Leaves, EBGP">
              <Button 
                onClick={() => handleQuickConfig({ spineCount: 2, leafCount: 3, protocol: 'EBGP' })}
                sx={{ color: '#e2e8f0', borderColor: '#666', '&:hover': { borderColor: '#90caf9' } }}
              >
                Small EBGP
              </Button>
            </Tooltip>
            <Tooltip title="3 Spines, 4 Leaves, EBGP">
              <Button 
                onClick={() => handleQuickConfig({ spineCount: 3, leafCount: 4, protocol: 'EBGP' })}
                sx={{ color: '#e2e8f0', borderColor: '#666', '&:hover': { borderColor: '#90caf9' } }}
              >
                Medium EBGP
              </Button>
            </Tooltip>
            <Tooltip title="4 Spines, 6 Leaves, OSPF">
              <Button 
                onClick={() => handleQuickConfig({ spineCount: 4, leafCount: 6, protocol: 'OSPF' })}
                sx={{ color: '#e2e8f0', borderColor: '#666', '&:hover': { borderColor: '#90caf9' } }}
              >
                Large OSPF
              </Button>
            </Tooltip>
            <Tooltip title="2 Spines, 2 Leaves, ISIS">
              <Button 
                onClick={() => handleQuickConfig({ spineCount: 2, leafCount: 2, protocol: 'ISIS' })}
                sx={{ color: '#e2e8f0', borderColor: '#666', '&:hover': { borderColor: '#90caf9' } }}
              >
                Small ISIS
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Box>
        
        {!isValid && (
          <Alert severity="error" sx={{ backgroundColor: '#1b5e20' }}>
            Invalid YAML format
          </Alert>
        )}
      </Box>
      
      <Box sx={{ flex: 1, p: 2 }}>
        <TextField
          multiline
          fullWidth
          value={localValue}
          onChange={handleChange}
          variant="outlined"
          sx={{
            height: '100%',
            '& .MuiOutlinedInput-root': {
              height: '100%',
              color: '#e2e8f0',
              backgroundColor: '#1a1a1a',
              fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
              fontSize: '13px',
              lineHeight: 1.4,
              '& fieldset': {
                borderColor: '#333',
              },
              '&:hover fieldset': {
                borderColor: '#666',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#90caf9',
              },
              '& .MuiInputBase-input': {
                height: '100% !important',
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#1a1a1a',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#666',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#888',
                },
              },
            },
          }}
          InputProps={{
            style: {
              height: '100%',
              alignItems: 'flex-start',
            },
          }}
        />
      </Box>
    </Box>
  );
} 