import { createTheme } from '@mui/material/styles';

// Custom theme for Market Data Explorer
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
      light: '#42A5F5',
      dark: '#0D47A1',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF6F00',
      light: '#FFA040',
      dark: '#C43E00',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    error: {
      main: '#C62828',
      light: '#EF5350',
      dark: '#B71C1C',
    },
    warning: {
      main: '#ED6C02',
      light: '#FF9800',
      dark: '#E65100',
    },
    info: {
      main: '#0288D1',
      light: '#03A9F4',
      dark: '#01579B',
    },
    background: {
      default: '#F4F6F8',
      paper: '#FFFFFF',
      dark: '#1A1A2E',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#4A4A6A',
      disabled: '#9E9E9E',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#1A1A2E',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#1A1A2E',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#1A1A2E',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#1A1A2E',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#1A1A2E',
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 500,
      color: '#1A1A2E',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#4A4A6A',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: '#6A6A8A',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#1A1A2E',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: '#4A4A6A',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.08)',
    '0px 8px 16px rgba(0,0,0,0.1)',
    '0px 12px 24px rgba(0,0,0,0.12)',
    '0px 16px 32px rgba(0,0,0,0.14)',
    '0px 20px 40px rgba(0,0,0,0.16)',
    '0px 24px 48px rgba(0,0,0,0.18)',
    '0px 28px 56px rgba(0,0,0,0.2)',
    '0px 32px 64px rgba(0,0,0,0.22)',
    '0px 36px 72px rgba(0,0,0,0.24)',
    '0px 40px 80px rgba(0,0,0,0.26)',
    '0px 44px 88px rgba(0,0,0,0.28)',
    '0px 48px 96px rgba(0,0,0,0.3)',
    '0px 52px 104px rgba(0,0,0,0.32)',
    '0px 56px 112px rgba(0,0,0,0.34)',
    '0px 60px 120px rgba(0,0,0,0.36)',
    '0px 64px 128px rgba(0,0,0,0.38)',
    '0px 68px 136px rgba(0,0,0,0.4)',
    '0px 72px 144px rgba(0,0,0,0.42)',
    '0px 76px 152px rgba(0,0,0,0.44)',
    '0px 80px 160px rgba(0,0,0,0.46)',
    '0px 84px 168px rgba(0,0,0,0.48)',
    '0px 88px 176px rgba(0,0,0,0.5)',
    '0px 92px 184px rgba(0,0,0,0.52)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1565C0 0%, #0A3D7A 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #FF6F00 0%, #C43E00 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #E65100 0%, #BF360C 100%)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        },
        elevation3: {
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: '#F4F6F8',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: '#1A1A2E',
        },
        body: {
          color: '#4A4A6A',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
        colorPrimary: {
          background: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)',
        },
        colorSecondary: {
          background: 'linear-gradient(135deg, #FF6F00 0%, #FFA040 100%)',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976D2',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardSuccess: {
          background: '#E8F5E9',
        },
        standardError: {
          background: '#FFEBEE',
        },
        standardWarning: {
          background: '#FFF3E0',
        },
        standardInfo: {
          background: '#E3F2FD',
        },
      },
    },
  },
});

// Dark theme variant (optional)
export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#42A5F5',
      light: '#64B5F6',
      dark: '#1976D2',
    },
    secondary: {
      main: '#FFA040',
      light: '#FFB74D',
      dark: '#FF6F00',
    },
    background: {
      default: '#121212',
      paper: '#1E1E2E',
      dark: '#0A0A1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0C0',
      disabled: '#6A6A7A',
    },
  },
  components: {
    ...theme.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: '#2A2A3E',
        },
      },
    },
  },
});

export default theme;