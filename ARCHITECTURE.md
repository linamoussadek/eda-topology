# EDA Topology Builder - Architecture Documentation

## 🏗️ New Folder Structure

```
eda-topology-builder/
├── 📁 src/
│   ├── 📁 components/              # Reusable UI Components
│   │   ├── 📁 nodes/              # React Flow Node Components
│   │   │   ├── AnnotationNode.tsx
│   │   │   ├── CircleNode.tsx
│   │   │   ├── CustomNode.tsx
│   │   │   ├── ResizerNode.tsx
│   │   │   ├── TextInputNode.tsx
│   │   │   └── ToolbarNode.tsx
│   │   ├── 📁 edges/              # React Flow Edge Components
│   │   │   ├── ButtonEdge.tsx
│   │   │   └── CustomEdge.tsx
│   │   └── 📁 layout/             # Layout & Navigation Components
│   │       ├── DashboardHeader.tsx
│   │       ├── DashboardSidebar.tsx
│   │       ├── EDALayout.tsx
│   │       ├── LegendPanel.tsx
│   │       └── PortBadge.tsx
│   ├── 📁 features/               # Feature-Based Modules
│   │   ├── 📁 topology/           # Network Topology Feature
│   │   │   ├── 📁 components/     # Topology-Specific Components
│   │   │   │   ├── TopologyBuilder.tsx
│   │   │   │   ├── TopologyView.tsx
│   │   │   │   ├── TopologyControls.tsx
│   │   │   │   └── TopologyInfo.tsx
│   │   │   └── 📁 config/         # Topology Configuration
│   │   │       └── nodeTypes.ts
│   │   └── 📁 yaml/              # YAML Editing Feature
│   │       └── 📁 components/     # YAML-Specific Components
│   │           └── YAMLEditor.tsx
│   ├── 📁 config/                 # Application Configuration
│   │   └── constants.ts
│   ├── 📁 utils/                  # Utility Functions
│   │   └── yamlParser.ts
│   ├── 📁 types/                  # TypeScript Definitions
│   │   └── types.ts
│   ├── 📁 hooks/                  # Custom React Hooks
│   ├── 📁 services/               # API & External Services
│   ├── 📁 assets/                 # Static Assets
│   ├── App.tsx                    # Main Application Component
│   ├── main.tsx                   # Application Entry Point
│   └── index.css                  # Global Styles
├── 📁 public/                     # Public Assets
├── 📁 server/                     # Backend Server
│   └── server.js
├── package.json
├── README.md
└── ARCHITECTURE.md
```

## 🎯 Architecture Principles

### **1. Feature-Based Organization**
- **Related functionality grouped together**
- **Clear boundaries between features**
- **Easy to find and modify specific features**

### **2. Separation of Concerns**
- **UI Components**: Pure presentation logic
- **Business Logic**: Utility functions and services
- **Configuration**: Centralized constants and settings
- **Types**: TypeScript definitions for type safety

### **3. Reusability**
- **Common components in `/components/`**
- **Feature-specific components in `/features/`**
- **Shared utilities in `/utils/`**

## 🔄 Data Flow Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   YAML Editor   │───▶│  YAML Parser    │───▶│ Topology Gen.   │
│   (Feature)     │    │   (Utils)       │    │   (Feature)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   State Mgmt    │    │   Validation    │    │  React Flow     │
│   (React)       │    │   (Utils)       │    │   (Feature)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Backend API   │    │   Error State   │    │   Visual Nodes  │
│   (Services)    │    │   (React)       │    │   (Components)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🧩 Component Architecture

### **Feature Components**

#### **Topology Feature** (`/features/topology/`)
```typescript
// TopologyBuilder.tsx - Main logic hook
export default function TopologyBuilder() {
  // State management
  // API calls
  // Data transformation
  return { nodes, edges, handlers };
}

// TopologyView.tsx - Visual rendering
export default function TopologyView({ nodes, edges, ... }) {
  // React Flow integration
  // Visual layout
  // User interactions
}
```

#### **YAML Feature** (`/features/yaml/`)
```typescript
// YAMLEditor.tsx - YAML editing interface
export default function YAMLEditor({ value, onChange, isValid }) {
  // Text editing
  // Validation display
  // Quick configuration
}
```

### **Reusable Components**

#### **Node Components** (`/components/nodes/`)
```typescript
// CustomNode.tsx - Network device visualization
const CustomNode = ({ data }) => {
  // Device styling
  // Connection handles
  // Information display
};
```

#### **Edge Components** (`/components/edges/`)
```typescript
// ButtonEdge.tsx - Network connection visualization
const ButtonEdge = ({ id, source, target, ... }) => {
  // Connection styling
  // Protocol indicators
  // Interactive elements
};
```

## ⚙️ Configuration Architecture

### **Centralized Configuration** (`/config/constants.ts`)
```typescript
// API Configuration
export const YAML_API_URL = 'http://localhost:5174/api/yaml';

// Theme Configuration
export const THEME_CONFIG = {
  palette: { /* ... */ },
  typography: { /* ... */ },
  components: { /* ... */ }
};

// Network Configuration
export const NETWORK_CONFIG = {
  defaultSpineCount: 2,
  defaultLeafCount: 3,
  defaultProtocol: 'EBGP'
};
```

### **Feature Configuration** (`/features/topology/config/`)
```typescript
// nodeTypes.ts - React Flow node type mapping
export const nodeTypes = {
  annotation: AnnotationNode,
  custom: CustomNode,
  // ... other node types
};
```

## 🔧 Utility Architecture

### **YAML Processing** (`/utils/yamlParser.ts`)
```typescript
// Core YAML functions
export function parseYamlToFabric(yamlString: string): EDAFabric
export function fabricToTopology(fabric: EDAFabric): TopologyData
export function validateYaml(yamlString: string): boolean
export function generateSampleYaml(config: Config): string
```

### **Type Definitions** (`/types/types.ts`)
```typescript
// Core interfaces
export interface EDAFabric { /* ... */ }
export interface TopologyNode { /* ... */ }
export interface TopologyEdge { /* ... */ }
```

## 🚀 Benefits of New Architecture

### **1. Maintainability**
- **Clear file locations**: Easy to find specific functionality
- **Isolated features**: Changes don't affect unrelated code
- **Consistent patterns**: Similar structure across features

### **2. Scalability**
- **Feature growth**: Easy to add new features
- **Component reuse**: Common components shared across features
- **Configuration management**: Centralized settings

### **3. Developer Experience**
- **Intuitive navigation**: Logical folder structure
- **Type safety**: Strong TypeScript integration
- **Clear boundaries**: Feature isolation prevents conflicts

### **4. Testing**
- **Feature isolation**: Test features independently
- **Component testing**: Test reusable components separately
- **Utility testing**: Test business logic in isolation

## 🔄 Migration from Old Structure

### **Before (Monolithic)**
```
src/
├── components/          # Mixed concerns
├── App.tsx             # 284 lines, multiple responsibilities
├── types.ts            # Mixed with components
└── utils/              # Only yamlParser.ts
```

### **After (Feature-Based)**
```
src/
├── components/          # Pure UI components
├── features/           # Feature modules
├── config/             # Centralized configuration
├── types/              # Dedicated type definitions
├── utils/              # Business logic utilities
└── App.tsx             # 60 lines, single responsibility
```

## 📈 Performance Improvements

### **1. Code Splitting**
- **Feature-based bundling**: Load only needed features
- **Lazy loading**: Load components on demand
- **Tree shaking**: Remove unused code

### **2. State Management**
- **Localized state**: State close to where it's used
- **Reduced re-renders**: Better component isolation
- **Optimized updates**: Only update changed components

### **3. Development Speed**
- **Faster builds**: Smaller, focused modules
- **Better caching**: Feature-based cache invalidation
- **Parallel development**: Teams can work on different features

## 🎯 Best Practices

### **1. File Naming**
- **PascalCase**: React components (`TopologyView.tsx`)
- **camelCase**: Utilities and hooks (`yamlParser.ts`)
- **kebab-case**: Folders (`topology-builder/`)

### **2. Import Organization**
```typescript
// 1. External libraries
import React from 'react';
import { Box } from '@mui/material';

// 2. Internal utilities
import { parseYamlToFabric } from '../../utils/yamlParser';

// 3. Internal components
import CustomNode from '../../components/nodes/CustomNode';

// 4. Types
import { TopologyNode } from '../../types/types';
```

### **3. Component Structure**
```typescript
// 1. Imports
// 2. Types/Interfaces
// 3. Component definition
// 4. Export
```

This architecture provides a **scalable, maintainable, and developer-friendly** foundation for the EDA Topology Builder application. 