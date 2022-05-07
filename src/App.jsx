import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import siteTheme from "./foliaging/styles/theme";
import Site from "./foliaging/Site";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={siteTheme}>
        <CssBaseline />
        <Site />
      </ThemeProvider>
    </BrowserRouter>
  );
}
