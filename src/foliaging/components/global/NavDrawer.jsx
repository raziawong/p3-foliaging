import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { default as BoringAvatar } from "boring-avatars";
import { Button, Icon, IconButton } from "@mui/material";
import { FlexBox, NavBarDrawer, NavBarLink } from "../styled/components";
import { avatarColors } from "../../styles/colors";
import { useSiteStateContext } from "../../states";

export default function NavDrawer({ drawOpen, setDrawOpen, handleLogout }) {
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
          sx={{ flexDirection: "column", width: { xs: "90vw", md: "70vw" } }}>
          <FlexBox
            sx={{ my: 2, justifyContent: "space-evenly", flexWrap: "wrap" }}>
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
          <NavBarLink to="/products" aria-label="to products">
            Products
          </NavBarLink>
        </FlexBox>
      </NavBarDrawer>
      <IconButton aria-label="expand drawer menu" onClick={handleClick}>
        <Icon color="primary" className="ri-menu-4-line" />
      </IconButton>
    </Fragment>
  );
}
