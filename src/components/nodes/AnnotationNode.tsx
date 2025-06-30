import { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface AnnotationData {
  label: string;
  level: number;
  arrowStyle: {
    right?: number;
    bottom?: number;
    transform?: string;
    left?: number;
  };
}

interface AnnotationNodeProps {
  data: AnnotationData;
}

function AnnotationNode({ data }: AnnotationNodeProps) {
  return (
    <div className="annotation-node">
      <div className="annotation-node__body">
        <p>{data.label}</p>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(AnnotationNode); 