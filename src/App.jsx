import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import siteTheme from "./foliaging/styles/theme";
import Site from "./foliaging/Site";
import { SiteContextProvider } from "./foliaging/states";
import { SiteContainer } from "./foliaging/styles/components";

export default function App() {
  return (
    <SiteContextProvider>
      <ThemeProvider theme={siteTheme}>
        <BrowserRouter>
          <CssBaseline />
          <SiteContainer>
            <Site />
          </SiteContainer>
        </BrowserRouter>
      </ThemeProvider>
    </SiteContextProvider>
  );
}
