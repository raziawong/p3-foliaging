import { alpha, styled } from "@mui/material/styles";
import { Link, NavLink } from "react-router-dom";
import { Box, Drawer, IconButton } from "@mui/material";
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

export const FrostedDomeBox = styled(ContentBox, {
  shouldForwardProp: (prop) => prop !== "shadowColor" || prop !== "shadowAlpha",
})(({ shadowColor, shadowAlpha, theme }) => ({
  width: "100%",
  background: "inherit",
  borderRadius: "48% 48% 0 0",
  boxShadow: `1px 1px 2px 0 ${alpha(shadowColor || siteColors.lavendar, 0.9)}`,
  "&:before": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    content: `''`,
    borderRadius: "48% 48% 0 0",
    boxShadow: `inset 0 0 0 2000px ${alpha(
      shadowColor || siteColors.lavendar,
      shadowAlpha || 0.1
    )}`,
    backdropFilter: "blur(10px)",
    background: "inherit",
  },
  "&:hover": {
    cursor: "pointer",
    boxShadow: `2px 2px 4px 0 ${alpha(
      shadowColor || siteColors.lavendar,
      0.9
    )}`,
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

export const HeroBanner = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgImg",
})(({ theme, bgImg }) => ({
  minHeight: 560,
  background: `url(${bgImg}) no-repeat space right`,
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  margin: "0 0",
  boxShadow:
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  [theme.breakpoints.down("md")]: {
    minHeight: 450,
    backgroundPosition: "center",
  },
}));

export const SplashOverlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})(({ theme, bgColor }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: alpha(bgColor || siteColors.light, 0.5),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  flexDirection: "column",
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

export const ProductFlexBox = styled(FlexBox)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  padding: `0 ${theme.spacing(1)}`,
  gap: theme.spacing(1),
  marginTop: theme.spacing(-4.2),
  justifyContent: "flex-end",
  minHeight: "75px",
}));

export const ProductIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(siteColors.charcoal, 0.9),
  color: siteColors.champagne,
  fontSize: "1.4rem",
  padding: theme.spacing(0.5),
  "&:hover": {
    backgroundColor: alpha(siteColors.charcoal, 0.8),
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
  justifyContent: "space-between",
  gap: theme.spacing(1),
  padding: `${theme.spacing(3)} ${theme.spacing(8)}`,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    padding: `${theme.spacing(3)} ${theme.spacing(2)}`,
  },
}));

export const OrderGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
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

export const OrderGridItem = styled(Box)(({ theme }) => ({
  border: `1px solid ${siteColors.primaryText}`,
  padding: `${theme.spacing(2)}}`,
}));

export const OrderItemFlexBox = styled(FlexBox)(({ theme }) => ({
  minHeight: "20vh",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: theme.spacing(3),
  padding: `${theme.spacing(3)} ${theme.spacing(2)}`,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr",
    minHeight: "10vh",
  },
}));
