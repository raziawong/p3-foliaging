import React from "react";
import { useNavigate } from "react-router-dom";
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
  processLogout,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import { FlexBox, FrostedContentBox } from "../index";
import { allowToProtectedRoute } from "../../utils";
import siteColors from "../../styles/colors";

export default function CartItems() {
  const dispatch = useSiteDispatchContext();
  const state = useSiteStateContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    processLogout({ dispatch });
    navigate("/login");
  };

  const handleChange = (cid, pid, quantity) => {
    quantity = Number(quantity);
    allowToProtectedRoute((token) =>
      token
        ? processCartUpdate({
            dispatch,
            token,
            cartItem: { cid, pid, quantity },
          })
        : handleLogout()
    );
  };

  const handleRemove = (cid, pid) => {
    allowToProtectedRoute((token) =>
      token ? processCartDelete({ dispatch, token, cid, pid }) : handleLogout()
    );
  };

  return state.cart.length ? (
    state.cart.map((item) => (
      <FrostedContentBox shadowColor={siteColors.champagne} key={item.id}>
        <FlexBox sx={{ p: 2 }}>
          <Card sx={{ maxWidth: "20%" }}>
            <CardMedia component="img" image={item.images[0]} />
          </Card>
          <FlexBox sx={{ ml: 3, flexDirection: { xs: "column", md: "row" } }}>
            <FlexBox sx={{ flexDirection: "column", alignItems: "flex-start" }}>
              <Typography variant="subtitle2">{item.product.title}</Typography>
              <Typography variant="caption">
                ${item.product.price.toFixed(2)}
              </Typography>
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
    <Typography component="h6" variant="h6">
      No items in cart
    </Typography>
  );
}
