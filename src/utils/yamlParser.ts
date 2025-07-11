import * as yaml from 'js-yaml';
import type { TopologyNodeData } from '../types/types';

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
  };
}

export interface TopologyNode {
  id: string;
  type: 'custom';
  data: TopologyNodeData;
  position: { x: number; y: number };
  style?: React.CSSProperties;
}

export interface TopologyEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  style?: React.CSSProperties;
  label?: string;
  labelStyle?: React.CSSProperties;
}

export function parseYamlToFabric(yamlString: string): EDAFabric {
  try {
    const fabric = yaml.load(yamlString) as EDAFabric;
    return fabric;
  } catch (error) {
    throw new Error(`Failed to parse YAML: ${error}`);
  }
}

export function fabricToTopology(fabric: EDAFabric): {
  nodes: TopologyNode[];
  edges: TopologyEdge[];
} {
  const nodes: TopologyNode[] = [];
  const edges: TopologyEdge[] = [];
  
  // extract node counts from selectors
  const spineCount = Math.max(1, fabric.spec.spines.spineNodeSelector.length || 2);
  const leafCount = Math.max(1, fabric.spec.leafs.leafNodeSelector.length || 3);
  
  // calculate dynamic positioning based on node counts
  const spineSpacing = Math.max(200, 800 / spineCount);
  const leafSpacing = Math.max(200, 600 / leafCount);
  const startX = 100;
  const spineY = 50;
  const leafY = 250;
  
  // create spine nodes
  for (let i = 1; i <= spineCount; i++) {
    nodes.push({
      id: `spine-${i}`,
      type: 'custom',
      data: {
        label: `Spine-${i}`,
        nodeType: 'spine',
        model: '7220 IXR-D5',
        ports: [
          { port: 1, type: 'inter-switch' },
          { port: 2, type: 'inter-switch' },
          { port: 3, type: 'access' },
          { port: 10, type: 'lag' },
          { port: 12, type: 'multi-homed-lag' }
        ]
      },
      position: {
        x: startX + (i - 1) * spineSpacing,
        y: spineY
      },
    });
  }
  
  // create leaf nodes
  for (let i = 1; i <= leafCount; i++) {
    nodes.push({
      id: `leaf-${i}`,
      type: 'custom',
      data: {
        label: `Leaf-${i}`,
        nodeType: 'leaf',
        model: '7220 IXR-D3L',
        ports: [
          { port: 3, type: 'access' },
          { port: 9, type: 'access' },
          { port: 10, type: 'lag' },
          { port: 11, type: 'lag' },
          { port: 12, type: 'multi-homed-lag' }
        ]
      },
      position: {
        x: startX + (i - 1) * leafSpacing,
        y: leafY
      },
    });
  }
  
  // create edges between spines and leaves
  const protocol = fabric.spec.underlayProtocol.protocol.join(', ');
  const edgeColor = protocol.includes('EBGP') ? '#ffd700' : 
                   protocol.includes('OSPF') ? '#ff6b6b' : 
                   protocol.includes('ISIS') ? '#4ecdc4' : '#90caf9';
  
  for (let spine = 1; spine <= spineCount; spine++) {
    for (let leaf = 1; leaf <= leafCount; leaf++) {
      edges.push({
        id: `spine${spine}-leaf${leaf}`,
        source: `spine-${spine}`,
        target: `leaf-${leaf}`,
        animated: true,
        style: { 
          stroke: edgeColor, 
          strokeWidth: 3 
        },
        label: protocol,
        labelStyle: { 
          fill: edgeColor, 
          fontWeight: 'bold',
          fontSize: '12px'
        },
      });
    }
  }
  
  return { nodes, edges };
}

export function validateYaml(yamlString: string): boolean {
  let fabric: EDAFabric;
  try {
    fabric = parseYamlToFabric(yamlString);
  } catch {
    return false;
  }

  const hasApiVersion = fabric.apiVersion !== undefined && fabric.apiVersion !== '';
  const hasCorrectKind = fabric.kind === 'Fabric';
  const hasMetadataName = Boolean(fabric.metadata && fabric.metadata.name && fabric.metadata.name !== '');
  const hasLeafs = Boolean(fabric.spec && fabric.spec.leafs);
  const hasSpines = Boolean(fabric.spec && fabric.spec.spines);
  const hasUnderlayProtocol = Boolean(fabric.spec && fabric.spec.underlayProtocol);

  const isYamlValid = hasApiVersion && 
                     hasCorrectKind && 
                     hasMetadataName && 
                     hasLeafs && 
                     hasSpines && 
                     hasUnderlayProtocol;

  return isYamlValid;
}

// helper function to generate sample YAML with different configurations
export function generateSampleYaml(config: {
  spineCount?: number;
  leafCount?: number;
  protocol?: string;
  fabricName?: string;
}): string {
  const { 
    spineCount = 2, 
    leafCount = 3, 
    protocol = 'EBGP',
    fabricName = 'myfabric-1'
  } = config;
  
  const spineSelectors = Array(spineCount).fill('eda.nokia.com/role=spine');
  const leafSelectors = Array(leafCount).fill('eda.nokia.com/role=leaf');
  
  return `apiVersion: fabrics.eda.nokia.com/v1alpha1
kind: Fabric
metadata:
  name: ${fabricName}
  namespace: eda
spec:
  leafs:
    leafNodeSelector:
${leafSelectors.map(selector => `      - ${selector}`).join('\n')}
  spines:
    spineNodeSelector:
${spineSelectors.map(selector => `      - ${selector}`).join('\n')}
  interSwitchLinks:
    linkSelector:
      - eda.nokia.com/role=interSwitch
    unnumbered: IPV6
  systemPoolIPV4: systemipv4-pool
  underlayProtocol:
    protocol:
      - ${protocol}
    bgp:
      asnPool: asn-pool
  overlayProtocol:
    protocol: ${protocol}`;
}

// load YAML file from public directory
export const loadYamlFile = async (filename: string): Promise<EDAFabric> => {
  try {
    const response = await fetch(`/public/${filename}`);
    const yamlText = await response.text();
    return parseYamlToFabric(yamlText);
  } catch (error) {
    throw new Error(`Failed to load YAML file: ${error}`);
  }
};

// export selector-based EDA YAML format
export const topologyToFabric = (_nodes: TopologyNode[], _edges: TopologyEdge[], fabricName: string = 'myfabric-1'): EDAFabric => {
  return {
    apiVersion: 'fabrics.eda.nokia.com/v1alpha1',
    kind: 'Fabric',
    metadata: {
      name: fabricName,
      namespace: 'eda'
    },
    spec: {
      leafs: {
        leafNodeSelector: ['eda.nokia.com/role=leaf']
      },
      spines: {
        spineNodeSelector: ['eda.nokia.com/role=spine']
      },
      interSwitchLinks: {
        linkSelector: ['eda.nokia.com/role=interSwitch'],
        unnumbered: 'IPV6'
      },
      systemPoolIPV4: 'systemipv4-pool',
      underlayProtocol: {
        protocol: ['EBGP'],
        bgp: {
          asnPool: 'asn-pool'
        }
      },
      overlayProtocol: {
        protocol: 'EBGP'
      }
    }
  };
};

// export topology as YAML string
export const exportTopologyToYaml = (nodes: TopologyNode[], edges: TopologyEdge[], fabricName: string = 'myfabric-1'): string => {
  const fabric = topologyToFabric(nodes, edges, fabricName);
  return yaml.dump(fabric);
}; 