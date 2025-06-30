import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
} from '@mui/material';
import {
  Router,
  Hub,
  Settings,
  NetworkCheck,
} from '@mui/icons-material';
import { type EDAFabric } from '../../../types/types';

interface TopologyInfoProps {
  fabric: EDAFabric | null;
}

const TopologyInfo: React.FC<TopologyInfoProps> = ({ fabric }) => {
  if (!fabric) {
    return null;
  }

  const { metadata, spec } = fabric;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: '8px',
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Settings sx={{ color: '#90caf9', fontSize: 20 }} />
        <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
          Topology Configuration
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Fabric Information */}
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#90caf9', fontWeight: 600, mb: 1 }}>
            Fabric Details
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={`Name: ${metadata.name}`}
              size="small"
              sx={{ backgroundColor: 'rgba(144, 202, 249, 0.2)', color: '#90caf9' }}
            />
            <Chip
              label={`Namespace: ${metadata.namespace}`}
              size="small"
              sx={{ backgroundColor: 'rgba(144, 202, 249, 0.2)', color: '#90caf9' }}
            />
            <Chip
              label={`API Version: ${fabric.apiVersion}`}
              size="small"
              sx={{ backgroundColor: 'rgba(144, 202, 249, 0.2)', color: '#90caf9' }}
            />
          </Box>
        </Box>

        <Divider sx={{ borderColor: '#333' }} />

        {/* Node Information */}
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#90caf9', fontWeight: 600, mb: 1 }}>
            Node Configuration
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Router sx={{ color: '#90caf9', fontSize: 16 }} />
              <Chip
                label={`Leaf Selector: ${spec.leafs.leafNodeSelector.join(', ')}`}
                size="small"
                sx={{ backgroundColor: 'rgba(144, 202, 249, 0.2)', color: '#90caf9' }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Hub sx={{ color: '#f48fb1', fontSize: 16 }} />
              <Chip
                label={`Spine Selector: ${spec.spines.spineNodeSelector.join(', ')}`}
                size="small"
                sx={{ backgroundColor: 'rgba(244, 143, 177, 0.2)', color: '#f48fb1' }}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: '#333' }} />

        {/* Link Information */}
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#90caf9', fontWeight: 600, mb: 1 }}>
            Link Configuration
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={`Link Selector: ${spec.interSwitchLinks.linkSelector.join(', ')}`}
              size="small"
              sx={{ backgroundColor: 'rgba(144, 202, 249, 0.2)', color: '#90caf9' }}
            />
            <Chip
              label={`Unnumbered: ${spec.interSwitchLinks.unnumbered}`}
              size="small"
              sx={{ backgroundColor: 'rgba(144, 202, 249, 0.2)', color: '#90caf9' }}
            />
          </Box>
        </Box>

        <Divider sx={{ borderColor: '#333' }} />

        {/* Protocol Information */}
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#90caf9', fontWeight: 600, mb: 1 }}>
            Protocol Configuration
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NetworkCheck sx={{ color: '#4caf50', fontSize: 16 }} />
              <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                Underlay Protocol: {spec.underlayProtocol.protocol.join(', ')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NetworkCheck sx={{ color: '#4caf50', fontSize: 16 }} />
              <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                Overlay Protocol: {spec.overlayProtocol.protocol}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                ASN Pool: {spec.underlayProtocol.bgp.asnPool}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                System Pool IPv4: {spec.systemPoolIPV4}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default TopologyInfo; 