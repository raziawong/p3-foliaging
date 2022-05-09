import React, { Fragment, useState } from "react";
import logo from "../../../assets/images/brand.svg";
import {
  alpha,
  AppBar,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import NavDrawer from "./NavDrawer";
import { NavBarLink, NavBarLogo } from "../../styles/components";
import siteColors from "../../styles/colors";

export default function NavBar() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 70,
  });

  const [drawOpen, setDrawOpen] = useState(false);

  return (
    <Fragment>
      <AppBar position="sticky">
        <Toolbar
          component="nav"
          sx={{
            py: { xs: 1, md: 2 },
            width: "100%",
            maxWidth: "100%",
            backgroundColor: trigger
              ? alpha(siteColors.backgroundHeader, 0.8)
              : "",
          }}>
          <Box sx={{ position: "relative", flexGrow: { xs: 1, md: "unset" } }}>
            <NavBarLogo to="/">
              <img src={logo} alt="foliaging" />
            </NavBarLogo>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            <ListItem sx={{ display: "flex" }}>
              <ListItemText>
                <NavBarLink to="/products">Products</NavBarLink>
              </ListItemText>
            </ListItem>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", ml: "1rem" }}>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <NavDrawer drawOpen={drawOpen} setDrawOpen={setDrawOpen} />
            </Box>
            <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
              <Button href="/login" variant="outlined" color="primary">
                Login
              </Button>
              <Button href="/register" variant="outlined" color="tertiary">
                Register
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
