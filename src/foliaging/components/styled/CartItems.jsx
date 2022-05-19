import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  FormHelperText,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  processCartDelete,
  processCartUpdate,
  processLogout,
  updateCartItem,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import { FlexBox, FrostedContentBox } from "../index";
import { allowToProtectedRoute } from "../../utils";
import siteColors from "../../styles/colors";
import { ContentBox } from "./components";

export default function CartItems() {
  const dispatch = useSiteDispatchContext();
  const state = useSiteStateContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    processLogout({ dispatch });
    navigate("/login");
  };

  const [deleteTrack, setDeleteTrack] = useState([]);

  const handleChange = (item, quantity) => {
    quantity = Number(quantity);

    dispatch(updateCartItem({ ...item, quantity }));

    if (quantity !== 0) {
      allowToProtectedRoute((token) =>
        token
          ? processCartUpdate({
              dispatch,
              token,
              cartItem: { pid: item.id, quantity },
            })
          : handleLogout()
      );

      let copy = [...deleteTrack];
      const index = copy.indexOf(item.id);
      if (index > -1) {
        copy.splice(index, 1);
        setDeleteTrack(copy);
      }
    } else {
      setDeleteTrack([...deleteTrack, item.id]);
    }
  };

  const handleRemove = (pid) => {
    allowToProtectedRoute((token) =>
      token ? processCartDelete({ dispatch, token, pid }) : handleLogout()
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
              <Typography variant="subtitle1">{item.product.title}</Typography>
              <Typography variant="subtitle1">
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
                size="small"
                label="Quantity"
                type="number"
                name="quantity"
                value={item.quantity}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(evt) => handleChange(item, evt.target.value)}
                error={!item.isEnough}
                helperText={!item.isEnough ? "Max Quantity Reached" : ""}
              />
              <IconButton
                color="secondary"
                onClick={(evt) => handleRemove(item.product_id)}>
                <Icon className="ri-delete-bin-2-line" />
              </IconButton>
            </FlexBox>
          </FlexBox>
        </FlexBox>
        {deleteTrack.indexOf(item.id) > -1 ? (
          <ContentBox sx={{ p: 1, textAlign: "right" }}>
            <FormHelperText error>
              Do you wish to remove cart item? You may click on the bin to
              delete the item.
            </FormHelperText>
          </ContentBox>
        ) : (
          ""
        )}
      </FrostedContentBox>
    ))
  ) : (
    <Typography component="h6" variant="h6">
      No items in cart
    </Typography>
  );
}
