import { Fragment, memo, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

export default memo(() => {
  const { setNodes } = useReactFlow();
  const [dimensions, setDimensions] = useState({ width: 150, height: 40 });

  const updateDimension = (attr: 'width' | 'height') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setDimensions((prev) => {
      const newDimensions = { ...prev };
      if (attr === 'width') {
        newDimensions.width = value;
      } else {
        newDimensions.height = value;
      }
      return newDimensions;
    });

    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === '2-3') {
          const parentNode = nodes.find((n) => n.id === node.parentId);
          const currentNode = nodes.find((n) => n.id === '2-3');
          
          if (parentNode && currentNode) {
            const parentWidth = parentNode.style?.width ? parseInt(parentNode.style.width as string) : Infinity;
            const parentHeight = parentNode.style?.height ? parseInt(parentNode.style.height as string) : Infinity;
            
            const currentPosX = currentNode.position.x;
            const currentPosY = currentNode.position.y;
            
            const maxWidth = Math.max(parentWidth - currentPosX, 0);
            const maxHeight = Math.max(parentHeight - currentPosY, 0);
            
            const newSize = {
              width: attr === 'width' ? Math.min(value, maxWidth) : currentNode.style?.width,
              height: attr === 'height' ? Math.min(value, maxHeight) : currentNode.style?.height,
            };
            
            return {
              ...node,
              style: {
                ...node.style,
                [attr]: newSize[attr],
              },
            };
          }
        }
        return node;
      })
    );
  };

  return (
    <Fragment>
      <Handle type="target" position={Position.Top} />
      <div style={{ padding: '10px' }}>
        <div>Resize node:</div>
        <label>
          width:
          <input
            type="number"
            value={dimensions.width}
            className="nodrag"
            onChange={updateDimension('width')}
            min={1}
            max={500}
          />
        </label>
        <label>
          height:
          <input
            type="number"
            value={dimensions.height}
            className="nodrag"
            onChange={updateDimension('height')}
            min={1}
            max={500}
          />
        </label>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </Fragment>
  );
}); 