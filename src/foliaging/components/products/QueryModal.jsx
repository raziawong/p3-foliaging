import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Sort from "./Sort";
import Filter from "./Filter";
import siteColors from "../../styles/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function QueryModal({ open, setOpen, type }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      sx={{
        display: {
          xs: "block",
          md: "none",
          backgroundColor: siteColors.charcoal,
        },
      }}
      TransitionComponent={Transition}
      fullScreen={useMediaQuery(useTheme().breakpoints.down("md"))}
      open={open}
      onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Search, Sort and Filter
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          color="secondary"
          aria-label="close filter popup"
          onClick={handleClose}>
          <Icon className="ri-close-line" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Sort />
        <Filter type={type} />
      </DialogContent>
    </Dialog>
  );
}
