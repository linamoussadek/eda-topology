# EDA Topology Builder

A modern, interactive topology builder for Nokia Event Driven Automation (EDA) platform, built with React and React Flow.

## Features

- **Interactive Topology Visualization**: Drag-and-drop network nodes with React Flow
- **YAML Import/Export**: Load and save topology configurations in EDA's YAML format
- **Custom Node Types**: Distinct visual representation for leaf and spine nodes
- **Modern UI**: Beautiful Material-UI interface with controls and minimap
- **Real-time Editing**: Add, remove, and modify nodes and connections
- **Export Functionality**: Download topology as YAML for use with EDA

## Getting Started

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

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Basic Operations

1. **Import YAML**: Click "Import YAML" to load a topology from `myfabric-1.yaml`
2. **Add Nodes**: Click "Add Node" to create new network nodes
3. **Connect Nodes**: Drag from one node's handle to another to create connections
4. **Move Nodes**: Click and drag nodes to reposition them
5. **Export YAML**: Click "Export YAML" to download the current topology

### Node Types

- **Leaf Nodes**: Blue nodes representing leaf switches (access layer)
- **Spine Nodes**: Orange nodes representing spine switches (aggregation layer)

### Controls

- **Zoom Controls**: Use the control panel to zoom in/out and fit view
- **MiniMap**: Navigate the topology using the minimap in the bottom-right
- **Background Grid**: Visual grid to help with node positioning

## Project Structure

```
src/
├── components/
│   ├── CustomNode.tsx      # Custom React Flow node component
│   └── TopologyControls.tsx # Control panel component
├── utils/
│   └── yamlParser.ts       # YAML parsing and conversion utilities
├── types.ts                # TypeScript type definitions
├── App.tsx                 # Main application component
└── index.css              # Global styles
```

## EDA Integration

This topology builder is designed to work with Nokia's EDA platform:

- **YAML Format**: Compatible with EDA's fabric configuration format
- **Node Selectors**: Supports EDA's node selector patterns
- **Protocol Support**: Handles EBGP and other EDA protocols
- **Export Ready**: Generated YAML can be directly used in EDA deployments

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. **Custom Node Types**: Add new node types in `CustomNode.tsx`
2. **YAML Parsing**: Extend `yamlParser.ts` for additional EDA features
3. **UI Components**: Create new components in the `components/` directory

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Flow** - Interactive node-based UI
- **Material-UI** - Modern UI components
- **js-yaml** - YAML parsing and generation
- **Vite** - Build tool and dev server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues related to EDA integration, please refer to the Nokia EDA documentation or contact your EDA administrator.
