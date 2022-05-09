import { alpha, styled } from "@mui/material/styles";
import { Link, NavLink } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
import siteColors from "./colors";

export const SiteContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  boxSizing: "border-box",
}));

export const ViewContainer = styled(Box)(({ theme }) => ({
  top: 0,
  left: 0,
  position: "absolute",
  width: "100vw",
  maxWidth: "100%",
  boxSizing: "border-box",
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2),
  boxSizing: "border-box",
  width: "100%",
  maxWidth: "100%",
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  position: "relative",
  boxSizing: "border-box",
  width: "100%",
  maxWidth: "100%",
}));

export const NavBarLogo = styled(Link)(({ theme }) => ({
  ...theme.typography.button,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
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

export const NavBarLink = styled(NavLink)(({ theme }) => ({
  color: siteColors.primary,
  textDecoration: "none",
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.h6.fontSize,
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: theme.spacing(1),
  "&:hover": {
    color: siteColors.tertiary,
    borderBottom: `1px solid ${siteColors.tertiary}`,
  },
  "&.active": {
    color: siteColors.tertiary,
    backgroundColor: alpha(siteColors.primary, 0.1),
    padding: "4px",
    borderRadius: "4px",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0 0 0 0",
    padding: "0.5rem",
    justifyContent: "flex-start",
  },
}));

export const NavBarDrawer = styled(Drawer)(({ theme }) => ({
  flexGrow: 1,
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
  "& .MuiDrawer-paper": {
    // backgroundColor: colors.secBg,
  },
}));
