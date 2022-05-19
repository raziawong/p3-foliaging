import React, { useState } from "react";
import fluidImage from "../../assets/images/fluid3.svg";
import SwipeableViews from "react-swipeable-views";
import { Tabs, Tab, useTheme, Typography } from "@mui/material";
import {
  FlexBox,
  FrostedContentBox,
  Profile,
  Addresses,
  Orders,
  TabPanel,
} from "../components";
import siteColors from "../styles/colors";

export default function Account() {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (evt, index) => {
    setTabIndex(index);
  };

  const handleChangeIndex = (index) => {
    setTabIndex(index);
  };

  return (
    <FlexBox
      sx={{
        my: 4,
        p: 1,
        background: `${siteColors.light} url(${fluidImage}) no-repeat center`,
        backgroundSize: "cover",
      }}>
      <FrostedContentBox
        shadowAlpha={0.85}
        shadowColor={siteColors.charcoal}
        sx={{
          py: 2,
          width: "96%",
          minHeight: "70vh",
          overflowWrap: "break-word",
        }}>
        <FlexBox>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            textColor="secondary"
            indicatorColor="secondary">
            <Tab
              label={
                <Typography
                  component="h3"
                  variant="h6"
                  sx={{ textTransform: "capitalize", fontWeight: 500 }}>
                  Profile
                </Typography>
              }
            />
            <Tab
              label={
                <Typography
                  component="h3"
                  variant="h6"
                  sx={{ textTransform: "capitalize", fontWeight: 500 }}>
                  Address Book
                </Typography>
              }
            />
            <Tab
              label={
                <Typography
                  component="h3"
                  variant="h6"
                  sx={{ textTransform: "capitalize", fontWeight: 500 }}>
                  Orders
                </Typography>
              }
            />
          </Tabs>
        </FlexBox>
        <FlexBox sx={{ mt: 4 }}>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={tabIndex}
            onChangeIndex={handleChangeIndex}>
            <TabPanel value={tabIndex} index={0} dir={theme.direction}>
              <Profile />
            </TabPanel>
            <TabPanel value={tabIndex} index={1} dir={theme.direction}>
              <Addresses />
            </TabPanel>
            <TabPanel value={tabIndex} index={2} dir={theme.direction}>
              <Orders />
            </TabPanel>
          </SwipeableViews>
        </FlexBox>
      </FrostedContentBox>
    </FlexBox>
  );
}
