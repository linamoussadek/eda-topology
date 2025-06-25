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
        fontSize: 13, // smaller text
        padding: '8px 28px',
        minWidth: 140,
        minHeight: 28,
        maxHeight: 48,
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
      <span>{data.label}</span>
      {data.protocol && (
        <span style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>{data.protocol}</span>
      )}
      {data.asnPool && (
        <span style={{ color: '#94a3b8', fontSize: 11 }}>ASN: {data.asnPool}</span>
      )}
      {data.unnumbered && (
        <span style={{ color: '#94a3b8', fontSize: 11 }}>Unnumbered: {data.unnumbered}</span>
      )}
      {data.selectors && data.selectors.length > 0 && (
        <span style={{ color: '#94a3b8', fontSize: 10, marginTop: 2 }}>
          {data.selectors.join(', ')}
        </span>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: '#6366f1', border: 0 }} />
    </div>
  );
};

export default memo(CustomNode); 