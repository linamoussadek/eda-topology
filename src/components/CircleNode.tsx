import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';

export default memo(({ data }: NodeProps) => {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: 'transparent',
        border: '2px solid #ff0071',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        color: '#ff0071',
        fontWeight: 800,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div>{data?.label || 'Circle'}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}); 