import { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface ToolbarData {
  label: string;
}

interface ToolbarNodeProps {
  data: ToolbarData;
}

function ToolbarNode({ data }: ToolbarNodeProps) {
  return (
    <div className="toolbar-node">
      <Handle type="target" position={Position.Top} />
      <div className="toolbar-node__body">
        <p>{data.label}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(ToolbarNode); 