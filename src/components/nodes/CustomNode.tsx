import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';

const CustomNode = ({ data }: NodeProps) => {
  // Slightly different background for spines vs leaves
  const isSpine = data.nodeType === 'spine';
  const bgColor = isSpine ? '#20223a' : '#23293a';

  return (
    <div
      style={{
        background: bgColor,
        border: '1px solid #333',
        borderRadius: 5,
        color: '#e2e8f0',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
        fontWeight: 400, // not bold
        fontSize: 12, // smaller text
        padding: '6px 14px',
        minWidth: 100,
        minHeight: 32,
        maxHeight: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        letterSpacing: 0.1,
        boxShadow: 'none',
      }}
      className="rf-default-node"
    >
      <Handle type="target" position={Position.Top} style={{ background: '#6366f1', border: 0 }} />
      {/* Device Name */}
      <span style={{ fontWeight: 500, fontSize: 12, color: '#e2e8f0', marginBottom: 1 }}>{data.label}</span>
      {/* Model (if present) */}
      {data.model && (
        <span style={{ color: '#b0b0b0', fontSize: 10, marginBottom: 1 }}>{data.model}</span>
      )}
      {/* Config Info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 1 }}>
        {data.protocol && (
          <span style={{ color: '#94a3b8', fontSize: 10 }}>{data.protocol}</span>
        )}
        {data.asnPool && (
          <span style={{ color: '#94a3b8', fontSize: 10 }}>ASN: {data.asnPool}</span>
        )}
        {data.unnumbered && (
          <span style={{ color: '#94a3b8', fontSize: 10 }}>Unnumbered: {data.unnumbered}</span>
        )}
        {data.selectors && data.selectors.length > 0 && (
          <span style={{ color: '#94a3b8', fontSize: 9 }}>{data.selectors.join(', ')}</span>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#6366f1', border: 0 }} />
    </div>
  );
};

export default memo(CustomNode); 