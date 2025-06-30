// Theme Configuration
export const THEME_CONFIG = {
  palette: {
    mode: 'dark' as const,
    primary: {
      main: '#8f3fff', // vivid purple
    },
    secondary: {
      main: '#6366f1', // blue accent
    },
    background: {
      default: '#181a20',
      paper: '#23293a',
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#94a3b8',
    },
    info: {
      main: '#4f46e5',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
    fontWeightBold: 700,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    h6: {
      fontWeight: 700,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#23293a',
          borderRadius: 14,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none' as const,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
};

// Network Configuration
export const NETWORK_CONFIG = {
  defaultSpineCount: 2,
  defaultLeafCount: 3,
  defaultProtocol: 'EBGP',
  defaultFabricName: 'myfabric-1',
  nodeSpacing: {
    spine: 200,
    leaf: 200,
  },
  nodePositions: {
    spineY: 50,
    leafY: 250,
    startX: 100,
  },
};

// File Paths
export const FILE_PATHS = {
  yamlFile: 'public/myfabric-1.yaml',
}; 