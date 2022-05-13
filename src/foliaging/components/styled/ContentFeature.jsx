import React, { Fragment } from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { FlexBox, FrostedContentBox } from "./components";
import siteColors from "../../styles/colors";

export default function ContentFeature({
  color = siteColors.background,
  header = "",
  subheader = "",
  message = "",
  imgSrc,
}) {
  return (
    <FlexBox sx={{ my: 4 }}>
      <Box
        sx={{ width: "98%" }}
        display="grid"
        gridTemplateColumns="repeat(6, 1fr)"
        gridTemplateRow="repeat(4, 1fr)">
        <FrostedContentBox
          gridArea="2 / 1 / 4 / 5"
          sx={{ zIndex: 2 }}
          shadowColor={color}
          shadowAlpha={0.5}
        />
        <FlexBox
          gridArea="2 / 1 / 4 / 5"
          sx={{
            flexDirection: "column",
            py: 2,
            textAlign: "center",
            gap: 4,
            zIndex: 3,
          }}>
          {header ? (
            <Typography variant="h3" component="h1">
              {header}
            </Typography>
          ) : (
            <Fragment />
          )}
          {subheader ? (
            <Typography variant="h5" component="h2">
              {subheader}
            </Typography>
          ) : (
            <Fragment />
          )}
          <Typography variant="subtitle1">{message}</Typography>
        </FlexBox>
        <Box gridArea="1 / 2 / 5 / 7" sx={{ zIndex: 1 }}>
          <Card>
            <CardMedia component="img" image={imgSrc} sx={{ height: 400 }} />
          </Card>
        </Box>
      </Box>
    </FlexBox>
  );
}
