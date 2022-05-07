import React, { Fragment } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { NavBarDrawer, NavBarLink } from "../../styles/components";

export default function NavDrawer() {
  return (
    <Fragment>
      <NavBarDrawer anchor="right">
        <List sx={{ minWidth: "40vw" }}>
          <ListItem
            sx={{ m: 2, display: { xs: "flex", sm: "none" } }}></ListItem>
          <ListItem sx={{ mt: 3 }}>
            <ListItemText>
              <NavBarLink to="/">Home</NavBarLink>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <NavBarLink to="/products">Products</NavBarLink>
            </ListItemText>
          </ListItem>
        </List>
      </NavBarDrawer>
      {/* <IconButton onClick={handleClick}>
        <MenuSharp />
      </IconButton> */}
    </Fragment>
  );
}
