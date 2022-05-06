import { CssBaseline, ThemeProvider } from "@mui/material";
import siteTheme from "./foliaging/styles/theme";
import Site from "./foliaging/Site";

export default function App() {
  return (
    <ThemeProvider theme={siteTheme}>
      <CssBaseline />
      <Site />
    </ThemeProvider>
  );
}
