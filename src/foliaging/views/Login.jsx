import React from "react";
import fluidImage from "../../assets/images/fluid1.svg";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { FlexBox, LoginForm } from "../components";
import siteColors from "../styles/colors";

export default function Login() {
  return (
    <FlexBox sx={{ mt: 4 }}>
      <Box
        sx={{ width: "90%" }}
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)"
        gridTemplateRow="repeat(4, 1fr)">
        <Box gridArea="1 / 1 / 5 / 4" sx={{ zIndex: 1 }}>
          <Card>
            <CardMedia component="img" image={fluidImage} height="600" />
          </Card>
        </Box>
        <Box gridArea="2 / 1 / 3 / 6" sx={{ zIndex: 3 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              pl: 4,
              color: siteColors.secondaryText,
              textShadow: `-5px -2px 3px ${siteColors.charcoal}`,
            }}>
            Sign In
          </Typography>
        </Box>
        <Box gridArea="2 / 2 / 4 / 6" sx={{ zIndex: 2 }}>
          <LoginForm />
        </Box>
      </Box>
    </FlexBox>
  );
}
