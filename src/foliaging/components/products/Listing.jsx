import React from "react";
import {
  alpha,
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
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import { ContentBox, FlexBox, FrostedDomeBox } from "../styled/components";
import siteColors from "../../styles/colors";
import { allowToProtectedRoute } from "../../utils";

export default function Listing({ type }) {
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
            cartItem: { pid },
          })
        : handleGuest()
    );
  };

  return (
    <ContentBox>
      <Grid
        container
        sx={{ ml: { xs: 0, md: 2 }, px: 1, py: 2, width: "100%" }}
        spacing={2}>
        {state.hasOwnProperty(type) &&
          state[type].map((item) => (
            <Grid
              item
              key={item.id}
              xs={12}
              sm={6}
              md={4}
              sx={{ filter: item.stock ? "none" : "brightness(0.7)" }}>
              <FrostedDomeBox>
                <FlexBox>
                  <CardMedia
                    component="img"
                    alt={item.title}
                    sx={{ minHeight: "40vh", borderRadius: "48% 48% 0 0" }}
                    image={item.images[0]}
                  />
                </FlexBox>
                <FlexBox
                  sx={{
                    px: 1,
                    py: 0,
                    gap: 1,
                    mt: -4.2,
                    justifyContent: "flex-end",
                    minHeight: "75px",
                  }}>
                  <Chip
                    sx={{
                      backgroundColor: alpha(siteColors.charcoal, 0.9),
                    }}
                    label={
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 500 }}
                        color={siteColors.lavendar}>
                        {"$" + item.price.toFixed(2)}
                      </Typography>
                    }
                  />
                  {item.stock ? (
                    <Tooltip title="Add to cart">
                      <IconButton
                        sx={{
                          backgroundColor: alpha(siteColors.charcoal, 0.9),
                          color: siteColors.champagne,
                          fontSize: "1.4rem",
                          padding: 0.5,
                          "&:hover": {
                            backgroundColor: alpha(siteColors.charcoal, 0.8),
                          },
                        }}
                        aria-label="add to cart"
                        size="small"
                        onClick={(evt) => handleAddToCart(item.id)}>
                        <Icon className="ri-shopping-cart-2-line" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Chip
                      sx={{ backgroundColor: siteColors.charcoal }}
                      label={
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 500 }}
                          color={siteColors.tertiary}>
                          Out of Stock
                        </Typography>
                      }
                    />
                  )}
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
              </FrostedDomeBox>
            </Grid>
          ))}
      </Grid>
    </ContentBox>
  );
}
