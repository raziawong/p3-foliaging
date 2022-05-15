import React from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { FlexBox, FrostedContentBox } from "./components";
import siteColors from "../../styles/colors";

export default function HeaderBanner({ header, imgSrc }) {
  return (
    <FlexBox>
      <Box
        sx={{ width: "98%" }}
        display="grid"
        gridTemplateColumns="repeat(6, 1fr)"
        gridTemplateRow="repeat(3, 1fr)">
        <FrostedContentBox
          gridArea="2 / 1 / 3 / 6"
          sx={{ zIndex: 2 }}
          shadowAlpha={0.4}
        />
        <FlexBox gridArea="2 / 2 / 3 / 5" sx={{ py: 2, zIndex: 3 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              textShadow: `5px 5px 5px ${siteColors.charcoal}`,
            }}>
            {header}
          </Typography>
        </FlexBox>
        <Box gridArea="1 / 2 / 4 / 7" sx={{ zIndex: 1 }}>
          <Card>
            <CardMedia
              component="img"
              image={imgSrc}
              sx={{ height: { xs: 150, sm: 180, md: 200 } }}
            />
          </Card>
        </Box>
      </Box>
    </FlexBox>
  );
}
