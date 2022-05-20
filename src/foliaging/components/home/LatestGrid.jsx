import { Button, Icon, Typography } from "@mui/material";
import headImg from "../../../assets/images/home_latest.jpg";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSiteStateContext } from "../../states";
import siteColors from "../../styles/colors";
import {
  ContentBox,
  FlexBox,
  FrostedFlexBox,
  SplashOverlay,
} from "../styled/components";

export default function LatestGrid() {
  const { latestPlants } = useSiteStateContext();

  return latestPlants && latestPlants.length ? (
    <ContentBox
      sx={{
        my: { xs: 5, md: 8 },
        px: { xs: 1, md: 5 },
        display: "grid",
        gridTemplateColumns: { md: "repeat(7, 1fr)" },
        gridTemplateRows: { md: "repeat(9, 1fr)" },
        gridColumnGap: { md: "5px" },
        gridRowGap: "5px",
      }}>
      <FlexBox
        sx={{
          p: 2,
          minHeight: { xs: 100, lg: 150 },
          gridArea: { md: "1 / 1 / 5 / 4" },
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
      {latestPlants.length > 0 ? (
        <FlexBox
          sx={{
            gridArea: { md: "5 / 5 / 10 / 8" },
            minHeight: { xs: 230, lg: 350 },
            zIndex: 3,
            backgroundSize: "cover",
            background: `url(${latestPlants[0].images[0]}) no-repeat center`,
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
                  {latestPlants[0].title}
                </Typography>
                <Typography variant="subtitle2" component="h6">
                  ${latestPlants[0].price.toFixed(2)}
                </Typography>
              </ContentBox>
              <Button
                component={Link}
                size="small"
                to={"/product/" + latestPlants[0].id}
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
      {latestPlants.length > 1 ? (
        <FlexBox
          sx={{
            gridArea: { md: "5 / 1 / 10 / 5" },
            zIndex: 3,
            minHeight: { xs: 230, lg: 350 },
            backgroundSize: "contain",
            background: `url(${latestPlants[1].images[0]}) no-repeat center`,
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
                  {latestPlants[1].title}
                </Typography>
                <Typography variant="subtitle2" component="h6">
                  ${latestPlants[1].price.toFixed(2)}
                </Typography>
              </ContentBox>
              <Button
                component={Link}
                size="small"
                to={"/product/" + latestPlants[1].id}
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
      {latestPlants.length > 2 ? (
        <FlexBox
          sx={{
            gridArea: { md: "1 / 4 / 5 / 8" },
            zIndex: 3,
            minHeight: { xs: 230, lg: 350 },
            backgroundSize: "contain",
            background: `url(${latestPlants[2].images[0]}) no-repeat center`,
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
                  {latestPlants[2].title}
                </Typography>
                <Typography variant="subtitle2" component="h6">
                  ${latestPlants[2].price.toFixed(2)}
                </Typography>
              </ContentBox>
              <Button
                component={Link}
                size="small"
                to={"/product/" + latestPlants[2].id}
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
