import React from "react";
import { Typography } from "@mui/material";
import { ProductsListing } from "../components";
import { ContentBox } from "../styles/components";
export default function Products() {
  return (
    <ContentBox sx={{ my: 4 }}>
      <Typography variant="h2" component="h1">
        Products
      </Typography>
      <ProductsListing />
    </ContentBox>
  );
}
