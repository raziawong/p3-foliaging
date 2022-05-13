import React, { Fragment } from "react";
import {
  Badge,
  Box,
  Icon,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSiteStateContext } from "../../states";
import CartItems from "../styled/CartItems";
import { FlexBox, NavCartDrawer } from "../styled/components";

export default function CartDrawer({ drawOpen, setDrawOpen }) {
  const state = useSiteStateContext();

  const handleClick = () => {
    setDrawOpen(true);
  };

  const handleClose = () => {
    setDrawOpen(false);
  };

  return (
    <Fragment>
      <NavCartDrawer anchor="right" open={drawOpen} onClose={handleClose}>
        <FlexBox
          sx={{ flexDirection: "column", width: { xs: "90vw", md: "70vw" } }}>
          <Box sx={{ py: { xs: 2, md: 4 } }}>
            <Typography variant="h4" component="h4">
              Cart
            </Typography>
          </Box>
          <Box sx={{ px: { xs: 2, md: 4 } }}>
            <CartItems />
          </Box>
        </FlexBox>
      </NavCartDrawer>
      <Tooltip title="Cart">
        <IconButton color="primary" aria-label="to cart" onClick={handleClick}>
          <Badge badgeContent={state.cart?.length} color="secondary">
            {state.cart?.length ? (
              <Icon className="ri-shopping-cart-2-fill" />
            ) : (
              <Icon className="ri-shopping-cart-2-line" />
            )}
          </Badge>
        </IconButton>
      </Tooltip>
    </Fragment>
  );
}
