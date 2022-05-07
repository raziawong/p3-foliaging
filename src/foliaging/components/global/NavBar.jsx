import React, { Fragment } from "react";
import logo from "../../../assets/images/brand.svg";
import {
  AppBar,
  Box,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";
import NavDrawer from "./NavDrawer";
import { NavBarLink, NavBarLogo } from "../../styles/components";

export default function NavBar() {
  return (
    <Fragment>
      <AppBar position="sticky">
        <Toolbar component="nav">
          <Box sx={{ position: "relative", flexGrow: 1 }}>
            <NavBarLogo
              to="/"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <img src={logo} alt="foliaging" />
            </NavBarLogo>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}></Box>
          <Box sx={{ display: "flex", ml: "1rem" }}>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <NavDrawer />
            </Box>
            <List sx={{ display: { xs: "none", md: "inline-flex" } }}>
              <ListItem>
                <ListItemText>
                  <NavBarLink to="/products">Products</NavBarLink>
                </ListItemText>
              </ListItem>
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
