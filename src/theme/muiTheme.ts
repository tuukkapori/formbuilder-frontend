import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color']
    }
  }

  interface Palette {
    neutral: Palette['primary']
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary']
  }

  interface PaletteColor {
    darker?: string
  }
  interface SimplePaletteColorOptions {
    darker?: string
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color']
    }
  }
}

// A custom theme for this app
const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    neutral: {
      main: '#ffffff',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Tahoma',
    h4: {
      fontWeight: 600,
      fontSize: '25px',
    },
    h5: {
      fontWeight: 600,
      fontSize: '18px',
    },
    subtitle1: {
      color: 'rgba(0, 0, 0, 0.7)',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::before': {
            borderBottom: '1px solid rgba(0, 0, 0, 0.42)', // use your color
          },
        },
      },
    },
  },
})

export default theme
