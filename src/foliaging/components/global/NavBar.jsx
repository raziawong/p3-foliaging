import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useSiteStateContext,
  processLogout,
  useSiteDispatchContext,
  setQuery,
  processProductQueries,
  stateKey,
  initialState,
} from "../../states";
import logo from "../../../assets/images/brand.svg";
import {
  alpha,
  AppBar,
  Box,
  Button,
  Icon,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
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
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

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

  const handleChange = ({ target }) => {
    dispatch(
      setQuery({
        type: stateKey.PRODUCTS,
        text: target.value,
        filter: initialState.query.filter,
        sort: initialState.query.sort,
      })
    );
  };

  const handleSearch = ({ type, key }) => {
    if (type === "mousedown" || type === "click" || key === "Enter") {
      dispatch(
        processProductQueries(
          {
            query: state.query,
            dispatch,
          },
          () => {
            navigate("/products");
          }
        )
      );
    }
  };

  const BrandLogo = () => (
    <NavBarLogo araia-label="to home" to="/">
      <img src={logo} alt="foliaging" />
    </NavBarLogo>
  );

  const SiteActions = () => (
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
  );

  return (
    <Fragment>
      <AppBar position={isSmallDevice ? "sticky" : "static"}>
        <Toolbar
          component="nav"
          sx={{
            pt: { xs: 1, md: 2 },
            width: "100%",
            maxWidth: "100%",
            backgroundColor: trigger ? alpha(siteColors.feldgrau, 0.95) : "",
          }}>
          <Box sx={{ position: "relative", flexGrow: { xs: 1, md: "unset" } }}>
            {BrandLogo()}
          </Box>
          <FlexBox
            sx={{
              display: { xs: "none", sm: "flex" },
              mx: { xs: 4, md: 8 },
              flexGrow: 1,
            }}>
            <TextField
              fullWidth
              sx={{ mt: "-15px" }}
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
          <FlexBox sx={{ width: "auto", justifyContent: "flex-end", ml: 1 }}>
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
                handleChange={handleChange}
                handleSearch={handleSearch}
              />
            </Box>
            {SiteActions()}
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
          <FlexBox
            sx={{ justifyContent: trigger ? "space-between" : "center" }}>
            {trigger ? BrandLogo() : <Fragment />}
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
            {trigger ? SiteActions() : <Fragment />}
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
