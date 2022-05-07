import { alpha, styled } from "@mui/material/styles";
import { Link, NavLink } from "react-router-dom";
import { Backdrop, Box, Drawer } from "@mui/material";

const SiteContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100vh",
  width: "100vw",
  boxSizing: "border-box",
}));

const ViewContainer = styled(Box)(({ theme }) => ({
  top: 0,
  left: 0,
  position: "absolute",
  width: "100vw",
  boxSizing: "border-box",
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  margin: theme.spacing(2),
  boxSizing: "border-box",
}));

const LoaderBackdrop = styled(Backdrop, {
  shouldForwardProp: (prop) => prop !== "width" || prop !== "height",
})(({ width, height, theme }) => ({
  top: 0,
  left: 0,
  width: width || "100vw",
  height: height || "100vh",
  overflow: "hidden",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const NavBarLogo = styled(Link)(({ theme }) => ({
  ...theme.typography.button,
  cursor: "pointer",
  padding: "0.2rem",
  "& img": {
    maxHeight: "7vh",
    [theme.breakpoints.down("md")]: {
      maxHeight: "4vh",
    },
  },
  "& p": {
    ...theme.typography.subtitle2,
    position: "absolute",
    marginTop: "2.5vh",
    color: theme.palette.grey[800],
    visibility: "hidden",
  },
}));

const NavBarLink = styled(NavLink)(({ theme }) => ({
  // color: colors.primary,
  textDecoration: "none",
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.h6.fontSize,
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: theme.spacing(1),
  "&:hover": {
    // color: colors.tertiary,
    // borderBottom: `1px solid ${colors.tertiary}`,
  },
  "&.active": {
    // color: colors.tertiary,
    // backgroundColor: alpha(colors.primary, 0.1),
    padding: "4px",
    borderRadius: "4px",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0 0 0 0",
    padding: "0.5rem",
    justifyContent: "flex-start",
  },
}));

const NavBarDrawer = styled(Drawer)(({ theme }) => ({
  flexGrow: 1,
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
  "& .MuiDrawer-paper": {
    // backgroundColor: colors.secBg,
  },
}));

const HeroBanner = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgImg",
})(({ theme, bgImg }) => ({
  minHeight: 600,
  // background: `${alpha(
  //   colors.priBg,
  //   0.4
  // )} url(${bgImg}) no-repeat space right`,
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  margin: "0 0",
  borderRadius: "4px",
  boxShadow:
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  [theme.breakpoints.down("md")]: {
    minHeight: 450,
    backgroundPosition: "center",
  },
}));

const HeroOverlay = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  // backgroundColor: alpha(colors.priBg, 0.5),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  flexDirection: "column",
}));

export {
  SiteContainer,
  ViewContainer,
  ContentContainer,
  LoaderBackdrop,
  NavBarDrawer,
  NavBarLogo,
  NavBarLink,
  HeroBanner,
  HeroOverlay,
};
