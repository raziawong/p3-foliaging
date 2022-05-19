import React from "react";
import { Link } from "react-router-dom";
import bgImg from "../../../assets/images/home_banner.jpg";
import { Box, Button, Icon, Typography } from "@mui/material";
import {
  ContentBox,
  FlexBox,
  FrostedContentBox,
  HeroBanner,
  SplashOverlay,
} from "../../components";
import siteColors from "../../styles/colors";

export default function Banner() {
  return (
    <HeroBanner bgImg={bgImg}>
      <SplashOverlay>
        <ContentBox
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
          }}>
          <FrostedContentBox
            sx={{
              m: 2,
              p: 5,
              gridArea: { xs: "2 / 1 / 4 / 4", md: "2 / 1 / 4 / 2" },
            }}
          />
          <Box
            sx={{
              m: 2,
              p: 5,
              zIndex: 1,
              gridArea: { xs: "2 / 1 / 4 / 4", md: "2 / 1 / 4 / 2" },
            }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{ color: siteColors.charcoal }}>
              Free Shipping For Orders Over $150
            </Typography>
            <FlexBox
              sx={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
              <Button
                component={Link}
                to="/products"
                sx={{
                  color: siteColors.feldgrau,
                  "&:hover": { animation: "bounce 1s ease-in-out infinite" },
                }}>
                Shop Now <Icon className="ri-arrow-right-s-line" />
              </Button>
            </FlexBox>
          </Box>
        </ContentBox>
      </SplashOverlay>
    </HeroBanner>
  );
}
