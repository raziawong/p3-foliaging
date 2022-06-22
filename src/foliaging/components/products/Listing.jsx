import React from "react";
import { alpha, Chip, Grid, Icon, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  processCartAdd,
  processLogout,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import {
  ContentBox,
  FlexBox,
  FrostedDomeBox,
  ProductFlexBox,
  ProductIconButton,
} from "../styled/components";
import siteColors from "../../styles/colors";
import { allowToProtectedRoute } from "../../utils";

export default function Listing({ type }) {
  const state = useSiteStateContext();
  const dispatch = useSiteDispatchContext();
  const navigate = useNavigate();

  const handleGuest = () => {
    processLogout({ dispatch });
    navigate("/login");
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

  const handleProductClick = ({ id }) => {
    navigate(`/product/${id}`);
  };

  return (
    <ContentBox>
      <FlexBox
        sx={{
          justifyContent: { xs: "center", md: "flex-start" },
          ml: { xs: 0, md: 2 },
          px: 1,
          py: 2,
          width: "100%",
        }}>
        {!state[type].length ? (
          <Typography component="h6" variant="h6">
            No results found
          </Typography>
        ) : (
          <Typography component="h6" variant="subtitle1">
            Displaying {state[type].length} results
          </Typography>
        )}
      </FlexBox>
      <Grid
        container
        sx={{ ml: { xs: 0, md: 2 }, px: 1, py: 2, width: "100%" }}
        spacing={{ xs: 0, md: 2 }}>
        {state.hasOwnProperty(type) &&
          state[type].map((item) => (
            <Grid
              item
              key={item.id}
              xs={12}
              sm={6}
              lg={4}
              sx={{
                py: 3,
                px: 1,
                zIndex: 1,
                filter: item.stock ? "none" : "brightness(0.7)",
              }}>
              <FrostedDomeBox>
                <FlexBox
                  onClick={() => handleProductClick(item)}
                  sx={{
                    minHeight: "40vh",
                    borderRadius: "48% 48% 0 0",
                    background: `url(${item.images[0]}) no-repeat center`,
                    backgroundSize: "cover",
                  }}
                />
                <ProductFlexBox>
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
                      <ProductIconButton
                        aria-label="add to cart"
                        size="small"
                        onClick={(evt) => handleAddToCart(item.id)}>
                        <Icon className="ri-shopping-cart-2-line" />
                      </ProductIconButton>
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
                </ProductFlexBox>
                <FlexBox
                  sx={{ pb: 1 }}
                  onClick={() => handleProductClick(item)}>
                  <Typography sx={{ textAlign: "center" }} variant="subtitle2">
                    {item.title}
                  </Typography>
                </FlexBox>
              </FrostedDomeBox>
            </Grid>
          ))}
      </Grid>
    </ContentBox>
  );
}
