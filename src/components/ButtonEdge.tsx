import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
  type EdgeProps,
} from 'reactflow';

export default function ButtonEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
}: EdgeProps) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          className="button-edge__label nodrag nopan"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            zIndex: 10,
          }}
        >
          {label && (
            <span
              style={{
                background: '#6366f1',
                color: '#fff',
                borderRadius: 8,
                padding: '2px 14px',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: 1,
                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
                border: '1.5px solid #6366f1',
                fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
                marginRight: 8,
              }}
            >
              {label}
            </span>
          )}
          <button
            className="react-flow__edge-button"
            onClick={(event) => {
              event.stopPropagation();
              onEdgeClick();
            }}
            style={{
              background: '#6366f1',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
} 