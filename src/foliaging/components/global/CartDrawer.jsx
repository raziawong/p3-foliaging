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
  stateKey,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import CartItems from "../styled/CartItems";
import { ContentBox, FlexBox, NavCartDrawer } from "../styled/components";
import { allowToProtectedRoute } from "../../utils";
import { LeafLoader } from "..";

export default function CartDrawer({ toDisplay, drawOpen, setDrawOpen }) {
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
      <NavCartDrawer
        sx={{ display: toDisplay ? "initial" : "none" }}
        anchor="right"
        open={drawOpen}
        onClose={handleClose}>
        <FlexBox
          sx={{ flexDirection: "column", width: { xs: "90vw", md: "70vw" } }}>
          <FlexBox
            sx={{
              alignSelf: "flex-start",
              justifyContent: "space-between",
              borderBottom: "1px solid",
            }}>
            <IconButton
              sx={{ alignSelf: "flex-start" }}
              color="secondary"
              aria-label="close cart"
              onClick={handleClose}>
              <Icon className="ri-close-line" />
            </IconButton>
            <Typography sx={{ p: 2 }} variant="h4" component="h4">
              Cart
            </Typography>
          </FlexBox>
          <FlexBox sx={{ flexDirection: "column", mt: 2, gap: 1 }}>
            <FlexBox
              sx={{
                px: 2,
                justifyContent: "space-between",
              }}>
              <Typography variant="h6" component="h6">
                {getTotal()}
              </Typography>
              <Button variant="outlined" onClick={handleCheckout}>
                Checkout
              </Button>
            </FlexBox>
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
            {state[stateKey.CART_LOADING] ? <LeafLoader /> : <CartItems />}
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
