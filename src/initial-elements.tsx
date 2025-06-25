import { MarkerType } from 'reactflow';

export const nodes = [
  {
    id: 'annotation-1',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 1,
      label:
        'Built-in node and edge types. Draggable, deletable and connectable!',
      arrowStyle: {
        right: 0,
        bottom: 0,
        transform: 'translate(-30px,10px) rotate(-80deg)',
      },
    },
    position: { x: -200, y: -30 },
  },
  {
    id: '1-1',
    type: 'custom',
    data: {
      label: 'Spine-1',
      nodeType: 'spine',
    },
    position: { x: 150, y: 0 },
  },
  {
    id: '1-2',
    type: 'custom',
    data: {
      label: 'Leaf-1',
      nodeType: 'leaf',
    },
    position: { x: 0, y: 100 },
  },
  {
    id: '1-3',
    type: 'custom',
    data: {
      label: 'Leaf-2',
      nodeType: 'leaf',
    },
    position: { x: 300, y: 100 },
  },
  {
    id: 'annotation-2',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 2,
      label: 'Sub flows, toolbars and resizable nodes!',
      arrowStyle: {
        left: 0,
        bottom: 0,
        transform: 'translate(5px, 25px) scale(1, -1) rotate(100deg)',
      },
    },
    position: { x: 220, y: 200 },
  },
  {
    id: '2-1',
    type: 'group',
    position: {
      x: -170,
      y: 250,
    },
    style: {
      width: 380,
      height: 180,
    },
    data: {
      level: 2,
      label: 'Group',
    },
  },
  {
    id: '2-2',
    data: {
      level: 2,
      label: 'Toolbar Node',
    },
    type: 'tools',
    position: { x: 50, y: 50 },
    style: {
      width: 80,
      height: 80,
    },
    parentId: '2-1',
    extent: 'parent',
  },
  {
    id: '2-3',
    type: 'resizer',
    data: {
      level: 2,
      label: 'Resize Me',
    },
    position: { x: 250, y: 50 },
    style: {
      width: 80,
      height: 80,
    },
    parentId: '2-1',
    extent: 'parent',
  },
  {
    id: 'annotation-3',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 3,
      label: 'Nodes and edges can be anything and are fully customizable!',
      arrowStyle: {
        right: 0,
        bottom: 0,
        transform: 'translate(-35px, 20px) rotate(-80deg)',
      },
    },
    position: { x: -40, y: 570 },
  },
  {
    id: '3-2',
    type: 'textinput',
    position: { x: 150, y: 650 },
    data: {
      level: 3,
      label: 'Text Input Node',
    },
  },
  {
    id: '3-1',
    type: 'circle',
    position: { x: 350, y: 500 },
    data: {
      level: 3,
      label: 'Circle Node',
    },
  },
];

export const edges = [
  {
    id: 'e1-2',
    source: '1-1',
    target: '1-2',
    label: 'edge',
    type: 'smoothstep',
    animated: true,
    style: {
      stroke: '#6366f1',
      strokeWidth: 3,
    },
  },
  {
    id: 'e1-3',
    source: '1-1',
    target: '1-3',
    animated: true,
    label: 'animated edge',
    style: {
      stroke: '#6366f1',
      strokeWidth: 3,
    },
  },
  {
    id: 'e2-2',
    source: '1-2',
    target: '2-2',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e2-3',
    source: '2-2',
    target: '2-3',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e3-3',
    source: '2-3',
    sourceHandle: 'a',
    target: '3-2',
    type: 'button',
    animated: true,
    style: { stroke: 'rgb(158, 118, 255)' },
  },
  {
    id: 'e3-4',
    source: '2-3',
    sourceHandle: 'b',
    target: '3-1',
    type: 'button',
  },
]; 