import React, { Fragment } from "react";
import {
  Box,
  Button,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { NavBarDrawer, NavBarLink } from "../../styles/components";

export default function NavDrawer({ drawOpen, setDrawOpen }) {
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
                justifyContent: "space-evenly",
                width: "100%",
              }}>
              <Button href="/login" variant="outlined" color="primary">
                Login
              </Button>
              <Button href="/register" variant="outlined" color="tertiary">
                Register
              </Button>
            </Box>
          </ListItem>
          <ListItem>
            <ListItemText>
              <NavBarLink to="/products">Products</NavBarLink>
            </ListItemText>
          </ListItem>
        </List>
      </NavBarDrawer>
      <IconButton onClick={handleClick}>
        <Icon color="primary" className="ri-menu-4-line" />
      </IconButton>
    </Fragment>
  );
}
