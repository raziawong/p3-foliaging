import React, { Fragment } from "react";
import { default as BoringAvatar } from "boring-avatars";
import {
  Badge,
  Box,
  Button,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavBarDrawer, NavBarLink } from "../../styles/components";
import { useSiteContext } from "../../states/SiteContext";
import { avatarColors } from "../../styles/colors";

export default function NavDrawer({
  globalState,
  drawOpen,
  setDrawOpen,
  handleLogout,
}) {
  const handleClick = () => {
    setDrawOpen(true);
  };
  const handleClose = () => {
    setDrawOpen(false);
  };

  return (
    <Fragment>
      <NavBarDrawer anchor="right" open={drawOpen} onClose={handleClose}>
        <List sx={{ minWidth: "40vw" }}>
          <ListItem
            sx={{ p: 2, display: { xs: "flex", sm: "none" } }}></ListItem>
          <ListItem sx={{ my: 3, width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: globalState.isAuthenticated
                  ? "space-evenly"
                  : "center",
                flexDirection: globalState.isAuthenticated ? "column" : "row",
                width: "100%",
              }}>
              {globalState.isAuthenticated ? (
                <Fragment>
                  <Button
                    startIcon={
                      <BoringAvatar
                        size={25}
                        square={true}
                        name={globalState.user?.email}
                        variant="marble"
                        colors={avatarColors}
                      />
                    }>
                    Profile
                  </Button>
                  <Button startIcon={<Icon className="ri-logout-box-r-line" />}>
                    Logout
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <Button href="/login" variant="outlined" color="primary">
                    Login
                  </Button>
                  <Button href="/register" variant="outlined" color="tertiary">
                    Register
                  </Button>
                </Fragment>
              )}
            </Box>
          </ListItem>
          <ListItem>
            <ListItemText>
              <NavBarLink to="/products">Products</NavBarLink>
            </ListItemText>
          </ListItem>
        </List>
      </NavBarDrawer>
      <IconButton href="/cart" color="primary" aria-label="cart">
        <Badge badgeContent={globalState.cart?.items?.length} color="secondary">
          <Icon className="ri-shopping-cart-2-line" />
        </Badge>
      </IconButton>
      <IconButton onClick={handleClick}>
        <Icon color="primary" className="ri-menu-4-line" />
      </IconButton>
    </Fragment>
  );
}
