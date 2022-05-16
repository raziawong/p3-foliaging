import React, { Fragment, useEffect } from "react";
import fluidImage1 from "../../assets/images/fluid_monstera.svg";
import fluidImage2 from "../../assets/images/fluid_outline.svg";
import fluidImage3 from "../../assets/images/fluid_palm.svg";
import {
  ContentBox,
  FlexBox,
  HeaderBanner,
  LeafLoader,
  ProductsFilter,
  ProductsListing,
  ProductsSort,
} from "../components";
import { stateKey, useSiteStateContext } from "../states";

function sticky(ele) {
  if (ele) {
    window.addEventListener("scroll", function () {
      const translate = this.scrollY - ele.clientHeight / 2;
      if (translate > -1) {
        ele.style.transform = "translateY(" + translate + "px)";
      } else {
        ele.style.transform = "translateY(0)";
      }
    });
  }
}

const imgList = [fluidImage1, fluidImage2, fluidImage3];
const randImg = imgList[Math.floor(Math.random() * 3)];

export default function Products({ type }) {
  const state = useSiteStateContext();
  const isLoading = state[stateKey.DATA_LOADING];

  const headerText =
    type && type === stateKey.PRODUCTS
      ? "All Products"
      : type[0].toUpperCase() + type.slice(1);

  useEffect(() => {
    if (!isLoading) {
      sticky(document.getElementById("sticky-sidebar"));
    }
  }, [isLoading]);

  return (
    <ContentBox sx={{ mt: 2, mb: 4 }}>
      <HeaderBanner header={headerText || "Products"} imgSrc={randImg} />
      <FlexBox sx={{ mt: 5, alignItems: "flex-start" }}>
        {isLoading ? (
          <LeafLoader />
        ) : (
          <Fragment>
            <ContentBox sx={{ width: "30%" }}>
              <ContentBox
                id="sticky-sidebar"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}>
                <ProductsSort />
                <ProductsFilter type={type} />
              </ContentBox>
            </ContentBox>
            <ContentBox sx={{ width: "70%" }}>
              <ProductsListing type={type} />
            </ContentBox>
          </Fragment>
        )}
      </FlexBox>
    </ContentBox>
  );
}
