import React from "react";
import {
  Box,
  Card,
  CardMedia,
  Chip,
  Grid,
  Icon,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  processCartAdd,
  processLogout,
  stateKey,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import { ContentBox, FlexBox } from "../styled/components";
import LeafLoader from "../global/LeafLoader";
import siteColors from "../../styles/colors";
import { allowToProtectedRoute } from "../../utils";

export default function Listing() {
  const state = useSiteStateContext();
  const dispatch = useSiteDispatchContext();

  const handleGuest = () => {
    processLogout({ dispatch });
  };

  const handleAddToCart = (pid) => {
    allowToProtectedRoute((token) =>
      token
        ? processCartAdd({
            dispatch,
            token,
            cartItem: { pid, cid: state.user.id },
          })
        : handleGuest()
    );
  };

  return state[stateKey.DATA_LOADING] ? (
    <LeafLoader />
  ) : (
    <ContentBox>
      <Grid container sx={{ px: 6, py: 2 }} spacing={2}>
        {state.products.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Box
              sx={{
                borderRadius: "48% 48% 0 0",
                boxShadow: `1px 1px 2px 0 ${siteColors.lavendar}`,
              }}>
              <Card sx={{ borderRadius: "48% 48% 0 0" }}>
                <CardMedia
                  component="img"
                  alt={item.title}
                  sx={{ height: "25%" }}
                  image={item.images[0]}
                />
              </Card>
              <FlexBox
                sx={{
                  pt: 1,
                  pb: 2,
                  mt: -4.2,
                  justifyContent: "space-around",
                }}>
                <Chip
                  sx={{ backgroundColor: siteColors.lavendar }}
                  label={
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 500 }}
                      color={siteColors.charcoal}>
                      {"$" + item.price.toFixed(2)}
                    </Typography>
                  }
                />
                <Tooltip title="Add to cart">
                  <IconButton
                    sx={{
                      backgroundColor: siteColors.mustard,
                      color: siteColors.champagne,
                    }}
                    aria-label="add to cart"
                    onClick={(evt) => handleAddToCart(item.id)}>
                    <Icon className="ri-shopping-cart-2-line" />
                  </IconButton>
                </Tooltip>
              </FlexBox>
              <FlexBox sx={{ pb: 1 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
              </FlexBox>
              <Typography>
                {item.plant_id && item.plant.description
                  ? item.plant.description
                  : item.planter_id && item.planter.description
                  ? item.planter.description
                  : item.supplies && item.supplies.description
                  ? item.supplies.description
                  : ""}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </ContentBox>
  );
}
