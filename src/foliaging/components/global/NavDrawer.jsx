import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { default as BoringAvatar } from "boring-avatars";
import {
  Button,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FlexBox, NavBarDrawer, NavBarLink } from "../styled/components";
import { avatarColors } from "../../styles/colors";
import { useSiteStateContext } from "../../states";

export default function NavDrawer({
  drawOpen,
  setDrawOpen,
  handleLogout,
  handleChange,
  handleSearch,
}) {
  const state = useSiteStateContext();
  const navigate = useNavigate();

  const handleClick = () => {
    setDrawOpen(true);
  };

  const handleClose = () => {
    setDrawOpen(false);
  };

  return (
    <Fragment>
      <NavBarDrawer anchor="right" open={drawOpen} onClose={handleClose}>
        <IconButton
          sx={{ alignSelf: "flex-start" }}
          color="secondary"
          aria-label="close cart"
          onClick={handleClose}>
          <Icon className="ri-close-line" />
        </IconButton>
        <FlexBox
          sx={{
            flexDirection: "column",
            width: { xs: "90vw", sm: "70vw" },
            gap: 3,
          }}>
          <FlexBox sx={{ px: 3, mt: 3, display: { xs: "flex", sm: "none" } }}>
            <TextField
              fullWidth
              color="secondary"
              name="text"
              label="Search for a product"
              aria-label="search products"
              variant="standard"
              autoComplete="off"
              value={state.query.text}
              onChange={handleChange}
              onKeyDown={handleSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      size="small"
                      color="primary"
                      aria-label="submit search"
                      onClick={handleSearch}
                      onMouseDown={handleSearch}
                      onKeyDown={handleSearch}>
                      <Icon className="ri-search-2-line" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FlexBox>
          <FlexBox
            sx={{ my: 1, justifyContent: "space-evenly", flexWrap: "wrap" }}>
            {state.isAuthenticated ? (
              <Fragment>
                <Button
                  onClick={() => navigate("/profile")}
                  aria-label="to profile"
                  startIcon={
                    <BoringAvatar
                      size={25}
                      square={true}
                      name={state.user?.email}
                      variant="marble"
                      colors={avatarColors}
                    />
                  }>
                  Profile
                </Button>
                <Button
                  aria-label="logout"
                  onClick={handleLogout}
                  startIcon={<Icon className="ri-logout-box-r-line" />}>
                  Logout
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  onClick={() => navigate("/login")}
                  aria-label="to login"
                  variant="outlined"
                  color="primary">
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  aria-label="to cart"
                  variant="outlined"
                  color="tertiary">
                  Register
                </Button>
              </Fragment>
            )}
          </FlexBox>
          <NavBarLink to="/plants" color="secondary" aria-label="to plants">
            <Typography variant="subtitle1">Plants</Typography>
          </NavBarLink>
          <NavBarLink to="/planters" color="secondary" aria-label="to planters">
            <Typography variant="subtitle1">Planters</Typography>
          </NavBarLink>
          <NavBarLink to="/supplies" color="secondary" aria-label="to supplies">
            <Typography variant="subtitle1">Supplies</Typography>
          </NavBarLink>
          <NavBarLink
            to="/products"
            color="secondary"
            aria-label="to all products">
            <Typography variant="subtitle1">All Products</Typography>
          </NavBarLink>
        </FlexBox>
      </NavBarDrawer>
      <IconButton aria-label="expand drawer menu" onClick={handleClick}>
        <Icon color="primary" className="ri-menu-4-line" />
      </IconButton>
    </Fragment>
  );
}
