import { createTheme, responsiveFontSizes, alpha } from "@mui/material/styles";
import siteColors from "./colors";

let siteTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: siteColors.primary,
    },
    secondary: {
      main: siteColors.secondary,
    },
    text: {
      primary: siteColors.primaryText,
      secondary: siteColors.secondaryText,
    },
    background: {
      default: siteColors.background,
      paper: siteColors.backgoundContrast,
    },
  },
  typography: {
    fontFamily: "Montserrat Alternates, sans-serif",
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
    htmlFontSize: 12,
  },
  shape: {
    borderRadius: 0,
    boxShadow: "none",
  },
  components: {
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
  },
});

siteTheme = responsiveFontSizes(siteTheme);
export default siteTheme;
