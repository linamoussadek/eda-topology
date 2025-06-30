import { type Node, type Edge } from 'reactflow';

// EDA Fabric Types
export interface EDANodePort {
  port: number;
  type: 'inter-switch' | 'access' | 'lag' | 'multi-homed-lag';
}

export interface EDANode {
  name: string;
  model: string;
  ports: EDANodePort[];
}

export interface EDAFabric {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
  };
  spec: {
    leafs: {
      leafNodeSelector: string[];
    };
    spines: {
      spineNodeSelector: string[];
    };
    interSwitchLinks: {
      linkSelector: string[];
      unnumbered: string;
    };
    systemPoolIPV4: string;
    underlayProtocol: {
      protocol: string[];
      bgp: {
        asnPool: string;
      };
    };
    overlayProtocol: {
      protocol: string;
    };
    nodes?: EDANode[];
  };
}

// Node data interface
export interface TopologyNodeData {
  label: string;
  nodeType: 'leaf' | 'spine';
  model: string;
  ports: { port: number; type: string }[];
}

// React Flow Node Types
export type TopologyNode = Node<TopologyNodeData, 'custom'>;

// React Flow Edge Types
export type TopologyEdge = Edge & {
  type?: string;
  data?: {
    label?: string;
  };
};

// Sample nodes for demonstration
export const sampleNodes: TopologyNode[] = [
  {
    id: 'leaf-1',
    type: 'custom',
    position: { x: 100, y: 200 },
    data: { label: 'Leaf-1', nodeType: 'leaf', model: '', ports: [] }
  },
  {
    id: 'leaf-2',
    type: 'custom',
    position: { x: 300, y: 200 },
    data: { label: 'Leaf-2', nodeType: 'leaf', model: '', ports: [] }
  },
  {
    id: 'spine-1',
    type: 'custom',
    position: { x: 200, y: 50 },
    data: { label: 'Spine-1', nodeType: 'spine', model: '', ports: [] }
  },
  {
    id: 'spine-2',
    type: 'custom',
    position: { x: 200, y: 350 },
    data: { label: 'Spine-2', nodeType: 'spine', model: '', ports: [] }
  }
];

export const sampleEdges: TopologyEdge[] = [
  { id: 'e1', source: 'leaf-1', target: 'spine-1', type: 'default' },
  { id: 'e2', source: 'leaf-1', target: 'spine-2', type: 'default' },
  { id: 'e3', source: 'leaf-2', target: 'spine-1', type: 'default' },
  { id: 'e4', source: 'leaf-2', target: 'spine-2', type: 'default' }
]; 