import React from "react";
import fluidImage from "../../assets/images/fluid_palm.svg";
import { alpha, Box, Card, CardMedia, Typography } from "@mui/material";
import { HeaderBanner, ProductsListing } from "../components";
import { ContentBox, FlexBox, FrostedContentBox } from "../styles/components";
import siteColors from "../styles/colors";

export default function Products() {
  return (
    <ContentBox sx={{ mt: 2, mb: 4 }}>
      <HeaderBanner header="Products" imgSrc={fluidImage} />
      <ProductsListing />
    </ContentBox>
  );
}
