# EDA Topology Builder

A modern, interactive topology builder for Nokia Event Driven Automation (EDA) platform, built with React and React Flow.

## 🏗️ Project Architecture

This project follows a **feature-based architecture** with clear separation of concerns:

```
src/
├── 📁 components/           # Reusable UI components
│   ├── 📁 nodes/           # React Flow node components
│   ├── 📁 edges/           # React Flow edge components
│   └── 📁 layout/          # Layout and navigation components
├── 📁 features/            # Feature-based modules
│   ├── 📁 topology/        # Network topology functionality
│   │   ├── 📁 components/  # Topology-specific components
│   │   └── 📁 config/      # Topology configuration
│   └── 📁 yaml/           # YAML editing functionality
│       └── 📁 components/  # YAML-specific components
├── 📁 config/              # Application configuration
├── 📁 utils/               # Utility functions
├── 📁 types/               # TypeScript type definitions
├── 📁 hooks/               # Custom React hooks
├── 📁 services/            # API and external services
└── 📁 assets/              # Static assets
```

## 🎯 Key Features

- **Interactive Topology Visualization**: Drag-and-drop network nodes with React Flow
- **YAML Import/Export**: Load and save topology configurations in EDA's YAML format
- **Custom Node Types**: Distinct visual representation for leaf and spine nodes
- **Modern UI**: Beautiful Material-UI interface with controls and minimap
- **Real-time Editing**: Add, remove, and modify nodes and connections
- **Export Functionality**: Download topology as YAML for use with EDA

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eda-topology-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Start the backend server (in a separate terminal):
```bash
npm run start:server
```

5. Open your browser and navigate to `http://localhost:5173`

## 📁 Folder Structure Explained

### **`/src/components/`** - Reusable UI Components
- **`/nodes/`**: React Flow node components (CustomNode, CircleNode, etc.)
- **`/edges/`**: React Flow edge components (ButtonEdge, CustomEdge)
- **`/layout/`**: Layout components (EDALayout, DashboardHeader, Sidebar)

### **`/src/features/`** - Feature-Based Modules
- **`/topology/`**: Everything related to network topology
  - **`/components/`**: Topology-specific components (TopologyView, TopologyControls)
  - **`/config/`**: Topology configuration (nodeTypes, edgeTypes)
- **`/yaml/`**: Everything related to YAML editing
  - **`/components/`**: YAML-specific components (YAMLEditor)

### **`/src/config/`** - Application Configuration
- **`constants.ts`**: API URLs, theme configuration, network defaults
- Centralized configuration for easy maintenance

### **`/src/utils/`** - Utility Functions
- **`yamlParser.ts`**: YAML parsing, validation, and conversion utilities
- Business logic separated from UI components

### **`/src/types/`** - TypeScript Definitions
- **`types.ts`**: All TypeScript interfaces and type definitions
- Ensures type safety across the application

## 🔄 Data Flow

```
YAML Editor → YAML Parser → Topology Generator → React Flow → Visual Output
     ↓              ↓              ↓              ↓            ↓
User Input → Validation → Node/Edge Creation → Rendering → Network Diagram
```

### **Step-by-Step Process:**

1. **User Input**: User types in YAML editor
2. **State Update**: YAML text stored in React state
3. **Validation**: YAML syntax and structure validated
4. **Parsing**: YAML converted to structured JavaScript object
5. **Topology Generation**: Object converted to React Flow nodes/edges
6. **Visual Update**: React Flow renders the network diagram

## 🎨 Component Architecture

### **Feature Components**
- **`TopologyBuilder`**: Main logic for topology management
- **`TopologyView`**: Visual rendering of the network
- **`YAMLEditor`**: YAML editing interface

### **Reusable Components**
- **`CustomNode`**: Network device visualization
- **`ButtonEdge`**: Network connection visualization
- **`EDALayout`**: Application layout wrapper

## 🔧 Configuration

### **Theme Configuration** (`/src/config/constants.ts`)
```typescript
export const THEME_CONFIG = {
  palette: {
    mode: 'dark',
    primary: { main: '#8f3fff' },
    // ... more theme settings
  }
};
```

### **Network Configuration**
```typescript
export const NETWORK_CONFIG = {
  defaultSpineCount: 2,
  defaultLeafCount: 3,
  defaultProtocol: 'EBGP',
  // ... network defaults
};
```

## 🛠️ Development

### **Available Scripts**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run start:server` - Start backend API server

### **Adding New Features**

1. **New Node Types**: Add to `/src/components/nodes/`
2. **New Features**: Create new folder in `/src/features/`
3. **Utilities**: Add to `/src/utils/`
4. **Types**: Add to `/src/types/`

### **Code Organization Principles**

- **Single Responsibility**: Each component has one clear purpose
- **Feature Isolation**: Related code grouped in feature folders
- **Reusability**: Common components in `/components/`
- **Configuration**: All constants in `/config/`
- **Type Safety**: Strong TypeScript typing throughout

## 🔌 EDA Integration

This topology builder is designed to work with Nokia's EDA platform:

- **YAML Format**: Compatible with EDA's fabric configuration format
- **Node Selectors**: Supports EDA's node selector patterns
- **Protocol Support**: Handles EBGP, OSPF, ISIS protocols
- **Export Ready**: Generated YAML can be directly used in EDA deployments

## 🧪 Testing

The application includes:
- **TypeScript**: Compile-time type checking
- **ESLint**: Code quality and consistency
- **React Flow**: Built-in testing capabilities
- **Material-UI**: Component testing utilities

## 📚 Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **React Flow** - Interactive node-based UI
- **Material-UI** - Modern UI components
- **js-yaml** - YAML parsing and generation
- **Vite** - Build tool and dev server
- **Express** - Backend API server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the folder structure conventions
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues related to EDA integration, please refer to the Nokia EDA documentation or contact your EDA administrator.
