import React, { Fragment, useState } from "react";
import DayJS from "react-dayjs";
import { Box, Button, Typography } from "@mui/material";
import { stateKey, useSiteStateContext } from "../../states";
import {
  FlexBox,
  OrderGrid,
  OrderGridItem,
  OrderItemFlexBox,
} from "../styled/components";
import LeafLoader from "../global/LeafLoader";
import { formatAddress } from "../../utils";
import siteColors from "../../styles/colors";

export default function Orders() {
  const state = useSiteStateContext();

  const { user } = state;

  return state[stateKey.USER_LOADING] ? (
    <LeafLoader />
  ) : user.orders?.length ? (
    user.orders.map((order) => (
      <Fragment key={order.id}>
        <FlexBox
          sx={{
            py: 1,
            justifyContent: "flex-start",
          }}>
          <Typography>{order.status.status}</Typography>
        </FlexBox>
        <OrderGrid>
          <OrderGridItem>
            <Box sx={{ borderBottom: `1px solid ${siteColors.primaryText}` }}>
              <Typography variant="h6">Order</Typography>
            </Box>
            <OrderItemFlexBox>
              <Typography>
                <DayJS format="DD MMM YYYY">{order.ordered_date}</DayJS>
              </Typography>
              {order.items.map((i) => (
                <Typography key={i.id}>
                  {i.product?.title} x {i.quantity}
                </Typography>
              ))}
            </OrderItemFlexBox>
          </OrderGridItem>
          <OrderGridItem>
            <Box sx={{ borderBottom: `1px solid ${siteColors.primaryText}` }}>
              <Typography variant="h6">Payment</Typography>
            </Box>
            <OrderItemFlexBox>
              <Typography>
                {order.payments.map((p) => (
                  <Button
                    key={p.id}
                    size="small"
                    color="tertiary"
                    target="_blank"
                    href={p.receipt_url}>
                    via Stripe
                  </Button>
                ))}
              </Typography>
            </OrderItemFlexBox>
          </OrderGridItem>
          <OrderGridItem>
            <Box sx={{ borderBottom: `1px solid ${siteColors.primaryText}` }}>
              <Typography variant="h6">Shipping</Typography>
            </Box>
            <OrderItemFlexBox>
              <Typography>{formatAddress(order.shipping_address)}</Typography>
              <Typography variant="caption">
                {order.delivery_tracking}
              </Typography>
            </OrderItemFlexBox>
          </OrderGridItem>
        </OrderGrid>
      </Fragment>
    ))
  ) : (
    <Typography component="h6" variant="h6">
      No orders
    </Typography>
  );
}
