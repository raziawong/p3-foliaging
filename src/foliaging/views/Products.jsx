import { Typography } from "@mui/material";
import React from "react";
import fluidImage from "../../assets/images/fluid_palm.svg";
import {
  ContentBox,
  FlexBox,
  HeaderBanner,
  ProductsListing,
} from "../components";

export default function Products() {
  return (
    <ContentBox sx={{ mt: 2, mb: 4 }}>
      <HeaderBanner header="Products" imgSrc={fluidImage} />
      <FlexBox sx={{ mt: 5 }}>
        <FlexBox sx={{ maxWidth: "30%" }}>
          <Typography>Search</Typography>
        </FlexBox>
        <ProductsListing />
      </FlexBox>
    </ContentBox>
  );
}
