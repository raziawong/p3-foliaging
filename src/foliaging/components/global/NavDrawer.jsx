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
} from "@mui/material";
import { FlexBox, NavBarDrawer, NavBarLink } from "../../styles/components";
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
            <FlexBox sx={{ justifyContent: "space-evenly", flexWrap: "wrap" }}>
              {globalState.isAuthenticated ? (
                <Fragment>
                  <Button
                    href="/profile"
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
                  <Button
                    onClick={handleLogout}
                    startIcon={<Icon className="ri-logout-box-r-line" />}>
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
            </FlexBox>
          </ListItem>
          <ListItem>
            <ListItemText>
              <NavBarLink to="/products">Products</NavBarLink>
            </ListItemText>
          </ListItem>
        </List>
      </NavBarDrawer>
      {globalState.isAuthenticated ? (
        <IconButton href="/cart" color="primary" aria-label="cart">
          <Badge badgeContent={globalState.cart?.length} color="secondary">
            <Icon className="ri-shopping-cart-2-line" />
          </Badge>
        </IconButton>
      ) : (
        <Fragment />
      )}
      <IconButton onClick={handleClick}>
        <Icon color="primary" className="ri-menu-4-line" />
      </IconButton>
    </Fragment>
  );
}
