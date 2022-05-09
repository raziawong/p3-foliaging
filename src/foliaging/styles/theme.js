import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import siteColors from "./colors";

let siteTheme = createTheme({
  palette: {
    mode: "light",
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
    htmlFontSize: 12,
    fontSize: 10,
    fontFamily: "Montserrat Alternates, sans-serif",
    h1: { fontSize: "6rem" },
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
