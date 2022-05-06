import { createTheme, responsiveFontSizes, alpha } from "@mui/material/styles";

let siteTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#BFF0D4',
    },
    secondary: {
      main: '#FFEAEC',
    },
    text: {
      primary: '#C5D6D8',
      secondary: '#FFEAEC',
    },
    background: {
      default: '#54494B',
      paper: '#34403A',
    },
  },
  typography: {
    fontFamily: 'Montserrat Alternates, sans-serif',
    body1: {
      fontFamily: 'Montserrat, sans-serif',
    },
    body2: {
      fontFamily: 'Montserrat, sans-serif',
    },
    button: {
      fontFamily: 'Montserrat, sans-serif',
    },
    caption: {
      fontFamily: 'Montserrat, sans-serif',
    },
    subtitle1: {
      fontFamily: 'Montserrat, sans-serif',
    },
    subtitle2: {
      fontFamily: 'Montserrat, sans-serif',
    },
    htmlFontSize: 16,
  },
  props: {
    MuiAppBar: {
      color: 'transparent',
    },
  },
  shape: {
    borderRadius: 0,
    boxShadow: 'none',
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: 'none',
      },
    },
  },
});

siteTheme = responsiveFontSizes(siteTheme);
export default siteTheme;
