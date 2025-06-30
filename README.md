# EDA Topology Builder

A React-based network topology builder for Nokia's Event Driven Automation (EDA) platform. Lets you create and visualize network configurations using a drag-and-drop interface.

## Tech Stack

- React 19
- TypeScript
- React Flow (for node-based UI)
- Material-UI
- js-yaml
- Vite

## Features

- Interactive network topology visualization
- YAML configuration editor
- Real-time topology updates
- Custom node types (spine/leaf)
- Protocol support (EBGP, OSPF, ISIS)
- Export to EDA-compatible YAML

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the dev server:
```bash
npm run dev
```

3. Open http://localhost:5173

## Project Structure

```
src/
├── components/     # Reusable UI components
├── features/       # Main features (topology, yaml)
├── config/         # App configuration
├── utils/          # Utility functions
└── types/          # TypeScript definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## How it Works

The app parses YAML configuration files and converts them into interactive network diagrams. You can edit the YAML on the left panel and see the topology update in real-time on the right. The generated YAML can be used directly with Nokia's EDA platform.
