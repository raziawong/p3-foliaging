import { Button, Icon, Typography } from "@mui/material";
import headImg from "../../../assets/images/home_latest.jpg";
import React, { Fragment, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, stateKey } from "../../states";
import siteColors from "../../styles/colors";
import { sortOptions } from "../../utils";
import {
  ContentBox,
  FlexBox,
  FrostedFlexBox,
  SplashOverlay,
} from "../styled/components";

export default function LatestGrid() {
  const [latest, setLatest] = useState([]);

  useLayoutEffect(() => {
    (async () => {
      const resp = await fetchProducts({
        type: stateKey.PLANTS,
        query: {
          sort: sortOptions.latest,
        },
      });
      if (resp.data?.plants) {
        setLatest(resp.data.plants);
      }
    })();
  }, []);

  return latest && latest.length ? (
    <ContentBox
      sx={{
        my: { xs: 5, md: 8 },
        px: { xs: 1, md: 5 },
        display: { md: "grid" },
        gridTemplateColumns: { md: "repeat(7, 1fr)" },
        gridTemplateRows: { md: "repeat(9, 1fr)" },
        gridColumnGap: { md: "5px" },
        gridRowGap: { md: "5px" },
      }}>
      <FlexBox
        sx={{
          p: 2,
          minHeight: { xs: 100, lg: 150 },
          gridArea: { md: "2 / 1 / 4 / 4" },
          zIndex: 5,
          backgroundSize: "cover",
          background: `url(${headImg}) no-repeat center`,
        }}>
        <SplashOverlay sx={{ p: 5 }} bgColor={siteColors.charcoal}>
          <FrostedFlexBox
            sx={{
              p: 2,
              justifyContent: "flex-end",
              flexDirection: "column",
            }}>
            <ContentBox>
              <Typography variant="h3" component="h2">
                Our Latest Plants
              </Typography>
            </ContentBox>
          </FrostedFlexBox>
        </SplashOverlay>
      </FlexBox>
      {latest.length > 0 ? (
        <FlexBox
          sx={{
            gridArea: { md: "5 / 5 / 10 / 8" },
            zIndex: 3,
            backgroundSize: "cover",
            background: `url(${latest[0].images[0]}) no-repeat center`,
          }}>
          <SplashOverlay
            sx={{ p: 5, justifyContent: "flex-end" }}
            bgColor={siteColors.charcoal}>
            <FrostedFlexBox
              sx={{
                p: 2,
                flexDirection: "column",
              }}>
              <ContentBox>
                <Typography variant="subtitle1" component="h5">
                  {latest[0].title}
                </Typography>
                <Typography variant="subtitle2" component="h6">
                  ${latest[0].price.toFixed(2)}
                </Typography>
              </ContentBox>
              <Button
                component={Link}
                size="small"
                to={"/product/" + latest[0].id}
                sx={{
                  p: 0,
                  alignSelf: "flex-end",
                  color: siteColors.primaryText,
                  "&:hover": { animation: "bounce 1s ease-in-out infinite" },
                }}>
                Find out more <Icon className="ri-arrow-right-s-line" />
              </Button>
            </FrostedFlexBox>
          </SplashOverlay>
        </FlexBox>
      ) : (
        <Fragment />
      )}
      {latest.length > 1 ? (
        <FlexBox
          sx={{
            gridArea: { md: "5 / 1 / 10 / 5" },
            zIndex: 3,
            minHeight: { xs: 230, lg: 350 },
            backgroundSize: "contain",
            background: `url(${latest[1].images[0]}) no-repeat center`,
          }}>
          <SplashOverlay
            sx={{ p: 5, justifyContent: "flex-end" }}
            bgColor={siteColors.charcoal}>
            <FrostedFlexBox
              sx={{
                p: 2,
                flexDirection: "column",
              }}>
              <ContentBox>
                <Typography variant="subtitle1" component="h5">
                  {latest[1].title}
                </Typography>
                <Typography variant="subtitle2" component="h6">
                  ${latest[1].price.toFixed(2)}
                </Typography>
              </ContentBox>
              <Button
                component={Link}
                size="small"
                to={"/product/" + latest[1].id}
                sx={{
                  p: 0,
                  alignSelf: "flex-end",
                  color: siteColors.primaryText,
                  "&:hover": { animation: "bounce 1s ease-in-out infinite" },
                }}>
                Find out more <Icon className="ri-arrow-right-s-line" />
              </Button>
            </FrostedFlexBox>
          </SplashOverlay>
        </FlexBox>
      ) : (
        <Fragment />
      )}
      {latest.length > 2 ? (
        <FlexBox
          sx={{
            gridArea: { md: "1 / 4 / 5 / 8" },
            zIndex: 3,
            minHeight: { xs: 230, lg: 350 },
            backgroundSize: "contain",
            background: `url(${latest[2].images[0]}) no-repeat center`,
          }}>
          <SplashOverlay
            sx={{ p: 5, justifyContent: "flex-end" }}
            bgColor={siteColors.charcoal}>
            <FrostedFlexBox
              sx={{
                p: 2,
                flexDirection: "column",
              }}>
              <ContentBox>
                <Typography variant="subtitle1" component="h5">
                  {latest[2].title}
                </Typography>
                <Typography variant="subtitle2" component="h6">
                  ${latest[2].price.toFixed(2)}
                </Typography>
              </ContentBox>
              <Button
                component={Link}
                size="small"
                to={"/product/" + latest[2].id}
                sx={{
                  p: 0,
                  alignSelf: "flex-end",
                  color: siteColors.primaryText,
                  "&:hover": { animation: "bounce 1s ease-in-out infinite" },
                }}>
                Find out more <Icon className="ri-arrow-right-s-line" />
              </Button>
            </FrostedFlexBox>
          </SplashOverlay>
        </FlexBox>
      ) : (
        <Fragment />
      )}
    </ContentBox>
  ) : (
    <Fragment />
  );
}
