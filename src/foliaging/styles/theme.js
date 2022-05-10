import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import siteColors from "./colors";

let siteTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: siteColors.primary,
      light: siteColors.champagne,
      dark: siteColors.mustard,
    },
    secondary: {
      main: siteColors.secondary,
      light: siteColors.honeydew,
      dark: siteColors.feldgrau,
    },
    tertiary: {
      main: siteColors.tertiary,
      light: siteColors.lavendar,
      dark: siteColors.charcoal,
    },
    text: {
      primary: siteColors.primaryText,
      secondary: siteColors.secondaryText,
    },
    error: {
      main: siteColors.error,
    },
    info: {
      main: siteColors.info,
    },
    success: {
      main: siteColors.success,
    },
    warning: {
      main: siteColors.warning,
    },
    background: {
      default: siteColors.dark,
      paper: siteColors.dark,
      light: siteColors.light,
    },
  },
  typography: {
    htmlFontSize: 12,
    fontSize: 10,
    fontFamily: "Montserrat Alternates, sans-serif",
    h1: { fontSize: "4.5rem" },
    h2: { fontSize: "3.75rem" },
    h3: { fontSize: "3rem" },
    h4: { fontSize: "2.125rem" },
    h5: { fontSize: "1.5rem" },
    h6: { fontSize: "1.25rem" },
    body1: {
      fontFamily: "Montserrat, sans-serif",
    },
    body2: {
      fontFamily: "Montserrat, sans-serif",
    },
    button: {
      fontFamily: "Montserrat, sans-serif",
    },
    caption: {
      fontFamily: "Montserrat, sans-serif",
    },
    subtitle1: {
      fontFamily: "Montserrat, sans-serif",
    },
    subtitle2: {
      fontFamily: "Montserrat, sans-serif",
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiPaper: {
      defaultProps: {
        color: "transparent",
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
      },
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          height: "auto",
          boxSizing: "content-box",
          padding: 3,
        },
      },
    },
  },
});

siteTheme = responsiveFontSizes(siteTheme);
export default siteTheme;
