import React, { Fragment } from "react";
import {
  Badge,
  Box,
  Button,
  Icon,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  processCheckout,
  processLogout,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import CartItems from "../styled/CartItems";
import { FlexBox, NavCartDrawer } from "../styled/components";
import { allowToProtectedRoute } from "../../utils";

export default function CartDrawer({ drawOpen, setDrawOpen }) {
  const state = useSiteStateContext();
  const dispatch = useSiteDispatchContext();

  const getTotal = () => {
    let total = 0;
    total = state.cart?.reduce(
      (prev, item) => prev + item.product.price * item.quantity,
      total
    );

    return total ? `Total: $${total.toFixed(2)}` : "";
  };

  const handleCheckout = () => {
    // TODO validate user contact and address

    allowToProtectedRoute((token) =>
      token
        ? processCheckout({
            dispatch,
            token,
            details: {
              cid: state.user.id,
              shipping_id: state.user.addresses[0].id,
            },
          })
        : processLogout({ dispatch })
    );
  };

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
          <IconButton
            sx={{ alignSelf: "flex-start" }}
            color="secondary"
            aria-label="close cart"
            onClick={handleClose}>
            <Icon className="ri-close-line" />
          </IconButton>
          <FlexBox
            sx={{
              px: 2,
              py: { xs: 2, md: 4 },
              justifyContent: "space-between",
              borderBottom: "1px solid",
            }}>
            <Typography variant="h4" component="h4">
              Cart
            </Typography>
            <Typography variant="subtitle1">{getTotal()}</Typography>
            <Button variant="outlined" onClick={handleCheckout}>
              Checkout
            </Button>
          </FlexBox>
          <FlexBox sx={{ flexDirection: "column", mt: 2, gap: 1 }}>
            {state.isCheckingOut ? (
              <Box sx={{ py: 1, width: "90%" }}>
                <LinearProgress color="secondary" />
                <Typography>
                  Please hold on while we redirect you to our payment platform
                </Typography>
              </Box>
            ) : (
              <Fragment />
            )}
            <CartItems />
          </FlexBox>
        </FlexBox>
      </NavCartDrawer>
      <Tooltip title="Cart">
        <IconButton
          color="primary"
          aria-label="view cart"
          onClick={handleClick}>
          <Badge badgeContent={state.cart?.length} color="secondary">
            <Icon
              className={
                state.cart?.length
                  ? "ri-shopping-cart-2-fill"
                  : "ri-shopping-cart-2-line"
              }
            />
          </Badge>
        </IconButton>
      </Tooltip>
    </Fragment>
  );
}
