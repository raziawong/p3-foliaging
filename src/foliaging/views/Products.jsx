import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import fluidImage1 from "../../assets/images/fluid_monstera.svg";
import fluidImage2 from "../../assets/images/fluid_outline.svg";
import fluidImage3 from "../../assets/images/fluid_palm.svg";
import {
  ContentBox,
  FlexBox,
  HeaderBanner,
  LeafLoader,
  ProductsListing,
} from "../components";
import { stateKey, useSiteStateContext } from "../states";

export default function Products({ type }) {
  const state = useSiteStateContext();
  const headerText =
    type && type === stateKey.PRODUCTS
      ? "All Products"
      : type[0].toUpperCase() + type.slice(1);
  const imgList = [fluidImage1, fluidImage2, fluidImage3];
  const randImg = imgList[Math.floor(Math.random() * 3)];

  return (
    <ContentBox sx={{ mt: 2, mb: 4 }}>
      <HeaderBanner header={headerText || "Products"} imgSrc={randImg} />
      <FlexBox sx={{ mt: 5 }}>
        {state[stateKey.DATA_LOADING] ? (
          <LeafLoader />
        ) : (
          <Fragment>
            <FlexBox sx={{ width: "30%" }}>
              <Typography>Search</Typography>
            </FlexBox>
            <ProductsListing type={type} />
          </Fragment>
        )}
      </FlexBox>
    </ContentBox>
  );
}
