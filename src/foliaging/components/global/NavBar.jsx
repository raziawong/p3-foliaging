import React, { Fragment, useState } from "react";
import logo from "../../../assets/images/brand.svg";
import {
  alpha,
  AppBar,
  Badge,
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
import { FlexBox, NavBarLink, NavBarLogo } from "../../styles/components";
import siteColors, { avatarColors } from "../../styles/colors";
import { useSiteContext } from "../../states/SiteContext";
import { resetUser } from "../../states/siteReducer";
import { removeLocalTokens } from "../../utils/auth";

export default function NavBar() {
  const [state, dispatch] = useSiteContext();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 70,
  });

  const [drawOpen, setDrawOpen] = useState(false);

  const handleLogout = (evt) => {
    evt.preventDefault();
    removeLocalTokens();
    dispatch(resetUser());
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
            <NavBarLogo to="/">
              <img src={logo} alt="foliaging" />
            </NavBarLogo>
          </Box>
          <FlexBox sx={{ flexGrow: 1 }}></FlexBox>
          <FlexBox sx={{ justifyContent: "flex-end", ml: "1rem" }}>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <NavDrawer
                globalState={state}
                drawOpen={drawOpen}
                setDrawOpen={setDrawOpen}
                handleLogout={handleLogout}
              />
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {state.isAuthenticated ? (
                <Fragment>
                  <Tooltip title="Cart">
                    <IconButton href="/cart" color="primary" aria-label="cary">
                      <Badge
                        badgeContent={state.cart?.length}
                        color="secondary">
                        <Icon className="ri-shopping-cart-2-line" />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Profile">
                    <IconButton href="/profile" aria-label="profile">
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
                      aria-label="logout"
                      onClick={handleLogout}>
                      <Icon className="ri-logout-box-r-line" />
                    </IconButton>
                  </Tooltip>
                </Fragment>
              ) : (
                <Fragment>
                  <Button
                    href="/login"
                    variant="outlined"
                    color="primary"
                    aria-label="login">
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
            backgroundColor: trigger ? alpha(siteColors.dark, 0.8) : "",
          }}>
          <FlexBox>
            <List>
              <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                <NavBarLink to="/products" color="secondary">
                  <Typography variant="subtitle1">Products</Typography>
                </NavBarLink>
              </ListItem>
            </List>
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
