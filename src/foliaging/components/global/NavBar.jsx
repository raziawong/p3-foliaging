import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useSiteStateContext,
  processLogout,
  useSiteDispatchContext,
} from "../../states";
import logo from "../../../assets/images/brand.svg";
import {
  alpha,
  AppBar,
  Box,
  Button,
  Icon,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { default as BoringAvatar } from "boring-avatars";
import NavDrawer from "./NavDrawer";
import { FlexBox, NavBarLink, NavBarLogo } from "../styled/components";
import siteColors, { avatarColors } from "../../styles/colors";
import CartDrawer from "./CartDrawer";

export default function NavBar() {
  const state = useSiteStateContext();
  const dispatch = useSiteDispatchContext();
  const location = useLocation();
  const navigate = useNavigate();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 70,
  });

  const [meunOpen, setMenuOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setCartOpen(false);
  }, [location]);

  const handleLogout = (evt) => {
    evt.preventDefault();
    processLogout({ dispatch });
    navigate("/login");
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar
          component="nav"
          sx={{
            pt: { xs: 1, md: 2 },
            width: "100%",
            maxWidth: "100%",
          }}>
          <Box sx={{ position: "relative", flexGrow: { xs: 1, md: "unset" } }}>
            <NavBarLogo araia-label="to home" to="/">
              <img src={logo} alt="foliaging" />
            </NavBarLogo>
          </Box>
          <FlexBox sx={{ flexGrow: 1 }}></FlexBox>
          <FlexBox sx={{ justifyContent: "flex-end", ml: "1rem" }}>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              {state.isAuthenticated ? (
                <CartDrawer
                  globalState={state}
                  drawOpen={cartOpen}
                  setDrawOpen={setCartOpen}
                />
              ) : (
                <Fragment />
              )}
              <NavDrawer
                globalState={state}
                drawOpen={meunOpen}
                setDrawOpen={setMenuOpen}
                handleLogout={handleLogout}
              />
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {state.isAuthenticated ? (
                <Fragment>
                  <CartDrawer
                    globalState={state}
                    drawOpen={cartOpen}
                    setDrawOpen={setCartOpen}
                  />
                  <Tooltip title="Profile">
                    <IconButton
                      aria-label="to profile"
                      onClick={() => navigate("/profile")}>
                      <BoringAvatar
                        size={25}
                        square={true}
                        name={state.user?.email}
                        variant="marble"
                        colors={avatarColors}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Logout">
                    <IconButton
                      color="primary"
                      aria-label="to logout"
                      onClick={handleLogout}>
                      <Icon className="ri-logout-box-r-line" />
                    </IconButton>
                  </Tooltip>
                </Fragment>
              ) : (
                <Fragment>
                  <Button
                    variant="outlined"
                    color="primary"
                    aria-label="to login"
                    onClick={() => navigate("/login")}>
                    Login
                  </Button>
                </Fragment>
              )}
            </Box>
          </FlexBox>
        </Toolbar>
      </AppBar>
      <AppBar position="sticky" sx={{ display: { xs: "none", md: "initial" } }}>
        <Toolbar
          component="nav"
          sx={{
            width: "100%",
            maxWidth: "100%",
            borderBottom: trigger
              ? "none"
              : `1px solid ${alpha(siteColors.honeydew, 0.3)}`,
            backgroundColor: trigger ? alpha(siteColors.feldgrau, 0.95) : "",
          }}>
          <FlexBox>
            <List>
              <ListItem
                sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <NavBarLink
                  to="/plants"
                  color="secondary"
                  aria-label="to plants">
                  <Typography variant="subtitle1">Plants</Typography>
                </NavBarLink>
                <NavBarLink
                  to="/planters"
                  color="secondary"
                  aria-label="to planters">
                  <Typography variant="subtitle1">Planters</Typography>
                </NavBarLink>
                <NavBarLink
                  to="/supplies"
                  color="secondary"
                  aria-label="to supplies">
                  <Typography variant="subtitle1">Supplies</Typography>
                </NavBarLink>
                <NavBarLink
                  to="/products"
                  color="secondary"
                  aria-label="to all products">
                  <Typography variant="subtitle1">All Products</Typography>
                </NavBarLink>
              </ListItem>
            </List>
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
