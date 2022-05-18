import { alpha, styled } from "@mui/material/styles";
import { Link, NavLink } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
import siteColors from "../../styles/colors";

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

export const FrostedContentBox = styled(ContentBox, {
  shouldForwardProp: (prop) => prop !== "shadowColor" || prop !== "shadowAlpha",
})(({ shadowColor, shadowAlpha, theme }) => ({
  width: "100%",
  background: "inherit",
  boxShadow: "0 0 1.5rem 0 rgba(0, 0, 0, .1)",
  "&:before": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    content: `''`,
    boxShadow: `inset 0 0 0 2000px ${alpha(
      shadowColor || siteColors.dark,
      shadowAlpha || 0.1
    )}`,
    backdropFilter: "blur(10px)",
    background: "inherit",
  },
}));

export const FlexBox = styled(ContentBox)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const FrostedFlexBox = styled(FlexBox, {
  shouldForwardProp: (prop) => prop !== "shadowColor" || prop !== "shadowAlpha",
})(({ shadowColor, shadowAlpha, theme }) => ({
  width: "100%",
  background: "inherit",
  boxShadow: "0 0 1.5rem 0 rgba(0, 0, 0, .1)",
  "&:before": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    content: `''`,
    boxShadow: `inset 0 0 0 2000px ${alpha(
      shadowColor || siteColors.dark,
      shadowAlpha || 0.1
    )}`,
    backdropFilter: "blur(10px)",
    background: "inherit",
  },
}));

export const NavBarLogo = styled(Link)(({ theme }) => ({
  ...theme.typography.button,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  padding: "0.2rem",
  "& img": {
    maxHeight: "6vh",
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
  color: theme.palette.tertiary.light,
  textDecoration: "none",
  fontWeight: 500,
  textTransform: "uppercase",
  marginLeft: theme.spacing(1),
  "&:hover": {
    borderBottom: `1px solid ${theme.palette.tertiary.main}`,
  },
  "&.active": {
    color: theme.palette.primary.main,
    padding: "4px",
    borderRadius: "4px",
    "&:hover": {
      borderBottom: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    margin: "0 0 0 0",
    padding: "0.5rem",
  },
}));

export const NavBarDrawer = styled(Drawer)(({ theme }) => ({
  flexGrow: 1,
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
  "& .MuiDrawer-paper": {
    backgroundColor: alpha(siteColors.feldgrau, 0.9),
  },
}));

export const NavCartDrawer = styled(Drawer)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  "& .MuiDrawer-paper": {
    backgroundColor: alpha(siteColors.feldgrau, 0.9),
  },
}));

export const ProfileGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "1fr",
  gridColumnGap: "0px",
  gridRowGap: "0px",
  minWidth: "80vw",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr",
    minWidth: "80%",
  },
}));

export const ProfileItemFlexBox = styled(FlexBox)(({ theme }) => ({
  minHeight: "38vh",
  border: `1px solid ${siteColors.primaryText}`,
  flexDirection: "column",
  justifyContent: "space-between",
  gap: theme.spacing(3),
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr",
  },
}));

export const ProfileAddressFlexBox = styled(FlexBox)(({ theme }) => ({
  minHeight: "12vh",
  border: `1px solid ${siteColors.primaryText}`,
  flexDirection: "row",
  justifyContent: "space-evenly",
  gap: theme.spacing(1),
  padding: `${theme.spacing(3)} ${theme.spacing(2)}`,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));
