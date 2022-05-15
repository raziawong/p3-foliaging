import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import fluidImage from "../../assets/images/fluid_palm.svg";
import {
  ContentBox,
  FlexBox,
  HeaderBanner,
  LeafLoader,
  ProductsListing,
} from "../components";
import { stateKey, useSiteStateContext } from "../states";

export default function Products() {
  const state = useSiteStateContext();

  return (
    <ContentBox sx={{ mt: 2, mb: 4 }}>
      <HeaderBanner header="Products" imgSrc={fluidImage} />
      <FlexBox sx={{ mt: 5 }}>
        {state[stateKey.DATA_LOADING] ? (
          <LeafLoader />
        ) : (
          <Fragment>
            <FlexBox sx={{ width: "30%" }}>
              <Typography>Search</Typography>
            </FlexBox>
            <ProductsListing />
          </Fragment>
        )}
      </FlexBox>
    </ContentBox>
  );
}
