import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

interface ResizerData {
  label: string;
}

interface ResizerNodeProps {
  data: ResizerData;
}

function ResizerNode({ data }: ResizerNodeProps) {
  return (
    <>
      <NodeResizer minWidth={1} minHeight={1} />
      <Handle
        type="target"
        position={Position.Left}
        className="custom-handle"
      />
      <div>{data.label}</div>
      <div className="resizer-node__handles">
        <Handle
          className="resizer-node__handle custom-handle"
          id="a"
          type="source"
          position={Position.Bottom}
        />
        <Handle
          className="resizer-node__handle custom-handle "
          id="b"
          type="source"
          position={Position.Bottom}
        />
      </div>
    </>
  );
}

export default memo(ResizerNode); 