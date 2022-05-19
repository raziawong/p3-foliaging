import React, { Fragment } from "react";
import Carousel from "react-material-ui-carousel";
import { alpha, CardMedia, useTheme } from "@mui/material";
import siteColors from "../../styles/colors";

export default function ImageCarousel({ images, height }) {
  const theme = useTheme();

  return (
    <Fragment>
      {images && images.length ? (
        images.length > 1 ? (
          <Carousel
            fullHeightHover={false}
            indicatorIconButtonProps={{
              style: {
                padding: theme.spacing(1),
                color: siteColors.honeydew,
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                backgroundColor: alpha(siteColors.mustard, 0.3),
              },
            }}
            navButtonsProps={{
              style: {
                backgroundColor: siteColors.background,
                borderRadius: 0,
              },
            }}
            navButtonsWrapperProps={{
              style: {
                bottom: "-30px",
                top: "unset",
              },
            }}
            navButtonsAlwaysVisible
            interval={6000}>
            {images.map((img, i) => (
              <Fragment key={i}>
                <CardMedia
                  component="img"
                  image={img}
                  sx={{
                    objectFit: "contain",
                    width: "100%",
                    height: height || "600",
                  }}
                />
              </Fragment>
            ))}
          </Carousel>
        ) : images.length === 1 ? (
          <CardMedia
            component="img"
            image={images[0]}
            sx={{
              objectFit: "contain",
              width: "100%",
              backdropFilter: "drop-shadow(2px 4px 6px black)",
              height: height || "600",
            }}
          />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </Fragment>
  );
}
