import React, { Fragment, useState } from "react";
import {
  Badge,
  Button,
  Icon,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { stateKey, useSiteStateContext } from "../../states";
import CartItems from "../styled/CartItems";
import { FlexBox, NavCartDrawer } from "../styled/components";
import { CheckoutModal, LeafLoader } from "..";

export default function CartDrawer({ toDisplay, drawOpen, setDrawOpen }) {
  const state = useSiteStateContext();

  const getTotal = () => {
    let total = 0;
    total = state.cart?.reduce(
      (prev, item) => prev + item.product.price * item.quantity,
      total
    );

    return total ? `Total: $${total.toFixed(2)}` : "";
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleCheckout = () => {
    setModalOpen(true);
  };

  const handleClick = () => {
    setDrawOpen(true);
  };

  const handleClose = () => {
    setDrawOpen(false);
  };

  const handleCheckoutClose = () => {
    setModalOpen(false);
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
                py: 1,
                justifyContent: "space-between",
              }}>
              <Typography variant="h6" component="h6">
                {getTotal()}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleCheckout}
                disabled={state.cart && !state.cart.length}>
                Checkout
              </Button>
            </FlexBox>
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

      <CheckoutModal
        open={modalOpen}
        close={handleCheckoutClose}
        total={getTotal}
      />
    </Fragment>
  );
}
