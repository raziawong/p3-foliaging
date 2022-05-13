import React, { Fragment } from "react";
import {
  Card,
  CardMedia,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  processCartDelete,
  processCartUpdate,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../states";
import { FlexBox, FrostedContentBox, LeafLoader } from "../components";
import { getLocalTokens } from "../utils";

export default function UserCart() {
  const dispatch = useSiteDispatchContext();
  const state = useSiteStateContext();

  const handleChange = (cid, pid, quantity) => {
    const tokens = getLocalTokens();
    quantity = Number(quantity);

    processCartUpdate({
      dispatch,
      token: tokens.accessToken,
      cartItem: { cid, pid, quantity },
    });
  };

  const handleRemove = (cid, pid) => {
    const tokens = getLocalTokens();

    processCartDelete({
      dispatch,
      token: tokens.accessToken,
      cid,
      pid,
    });
  };

  return (
    <Fragment>
      {state.isLoading ? (
        <LeafLoader />
      ) : (
        <FlexBox sx={{ my: 4, flexDirection: "column", gap: 2 }}>
          {state.cart.length ? (
            state.cart.map((item) => (
              <FrostedContentBox key={item.id}>
                <FlexBox sx={{ p: 2 }}>
                  <Card sx={{ maxWidth: "20%" }}>
                    <CardMedia component="img" image={item.images[0]} />
                  </Card>
                  <FlexBox
                    sx={{ ml: 4, flexDirection: { xs: "column", md: "row" } }}>
                    <FlexBox
                      sx={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}>
                      <Typography>{item.product.title}</Typography>
                      <Typography>${item.product.price.toFixed(2)}</Typography>
                    </FlexBox>
                    <FlexBox
                      sx={{
                        mt: { xs: 2, md: 0 },
                        justifyContent: { xs: "flex-start", md: "flex-end" },
                        maxWidth: { xs: "100%", md: "35%" },
                      }}>
                      <TextField
                        type="number"
                        size="small"
                        label="Quantity"
                        name="quantity"
                        value={item.quantity}
                        onChange={(evt) =>
                          handleChange(
                            item.customer_id,
                            item.product_id,
                            evt.target.value
                          )
                        }
                      />
                      <IconButton
                        color="secondary"
                        onClick={(evt) =>
                          handleRemove(item.customer_id, item.product_id)
                        }>
                        <Icon className="ri-delete-bin-2-line" />
                      </IconButton>
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
              </FrostedContentBox>
            ))
          ) : (
            <Typography variant="h6">No items in cart</Typography>
          )}
        </FlexBox>
      )}
    </Fragment>
  );
}
