import { Fab, Icon, useMediaQuery, useTheme } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
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
  QueryModal,
} from "../components";
import { stateKey, useSiteStateContext } from "../states";
import siteColors from "../styles/colors";

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
  const isSmallDevice = useMediaQuery(useTheme().breakpoints.down("md"));

  const [modalOpen, setModalOpen] = useState(false);

  const headerText =
    type && type === stateKey.PRODUCTS
      ? "All Products"
      : type[0].toUpperCase() + type.slice(1);

  useEffect(() => {
    if (!isLoading) {
      sticky(document.getElementById("sticky-sidebar"));
    }
  }, [isLoading]);

  const handleFabClick = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <ContentBox sx={{ mt: 2, mb: 4 }}>
      <HeaderBanner header={headerText || "Products"} imgSrc={randImg} />
      <FlexBox sx={{ mt: 5, px: { xs: 2, md: 3 }, alignItems: "flex-start" }}>
        {isLoading ? (
          <LeafLoader />
        ) : (
          <Fragment>
            <ContentBox sx={{ width: { xs: "5%", md: "30%" } }}>
              <ContentBox
                id="sticky-sidebar"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}>
                {isSmallDevice ? (
                  <Fragment>
                    <Fab
                      size="small"
                      aria-label="search actions"
                      sx={{ backgroundColor: siteColors.charcoal }}
                      onClick={handleFabClick}>
                      <Icon
                        className="ri-filter-2-line"
                        sx={{ color: siteColors.lavendar }}
                      />
                    </Fab>
                    <QueryModal
                      open={modalOpen}
                      setOpen={setModalOpen}
                      type={type}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <ProductsSort />
                    <ProductsFilter type={type} />
                  </Fragment>
                )}
              </ContentBox>
            </ContentBox>
            <ContentBox sx={{ width: { xs: "95%", md: "70%" } }}>
              <ProductsListing type={type} />
            </ContentBox>
          </Fragment>
        )}
      </FlexBox>
    </ContentBox>
  );
}
