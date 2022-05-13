import React from "react";
import fluidImage from "../../assets/images/fluid_palm.svg";
import { HeaderBanner, ProductsListing } from "../components";
import { ContentBox } from "../styles/components";

export default function Products() {
  return (
    <ContentBox sx={{ mt: 2, mb: 4 }}>
      <HeaderBanner header="Products" imgSrc={fluidImage} />
      <ProductsListing />
    </ContentBox>
  );
}
