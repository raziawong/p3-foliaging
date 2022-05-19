import React, { Fragment } from "react";
import Carousel from "react-material-ui-carousel";
import { CardMedia } from "@mui/material";

export default function ImageCarousel({ images, height }) {
  return (
    <Fragment>
      {images && images.length ? (
        images.length > 1 ? (
          <Carousel navButtonsAlwaysVisible interval={6000}>
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
