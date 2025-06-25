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
                background: 'linear-gradient(90deg, #6366f1 0%, #8f3fff 100%)',
                color: '#fff',
                borderRadius: 8,
                padding: '2px 14px',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: 1,
                boxShadow: '0 2px 8px #8f3fff33',
                border: '1.5px solid #8f3fff',
                fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
                marginRight: 8,
              }}
            >
              {label}
            </span>
          )}
          <button className="edgebutton" onClick={onEdgeClick} style={{
            background: 'rgba(99,102,241,0.18)',
            color: '#a78bfa',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            marginLeft: 4,
            cursor: 'pointer',
            padding: '0 8px',
            boxShadow: '0 2px 8px #8f3fff33',
            fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
          }}>
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
} 