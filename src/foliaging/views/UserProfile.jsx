import React, { useState } from "react";
import fluidImage from "../../assets/images/fluid3.svg";
import { useSiteStateContext } from "../states";
import SwipeableViews from "react-swipeable-views";
import { Tabs, Tab, useTheme, Typography } from "@mui/material";
import {
  FlexBox,
  FrostedContentBox,
  Addresses,
  Contact,
  UserSettings,
  TabPanel,
} from "../components";
import siteColors from "../styles/colors";

export default function UserProfile() {
  const theme = useTheme();
  const state = useSiteStateContext();
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
        background: `${siteColors.charcoal} url(${fluidImage}) no-repeat center`,
        backgroundSize: "cover",
      }}>
      <FrostedContentBox
        shadowAlpha={0.4}
        shadowColor={siteColors.background}
        sx={{
          py: 2,
          width: "97%",
          minHeight: "80vh",
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
                  sx={{ textTransform: "capitalize", fontWeight: "semibold" }}>
                  Settings
                </Typography>
              }
            />
            <Tab
              label={
                <Typography
                  component="h3"
                  variant="h6"
                  sx={{ textTransform: "capitalize", fontWeight: "semibold" }}>
                  Contact
                </Typography>
              }
            />
            <Tab
              label={
                <Typography
                  component="h3"
                  variant="h6"
                  sx={{ textTransform: "capitalize", fontWeight: "semibold" }}>
                  Addresses
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
              <UserSettings />
            </TabPanel>
            <TabPanel value={tabIndex} index={1} dir={theme.direction}>
              <Contact globalState={state} />
            </TabPanel>
            <TabPanel value={tabIndex} index={2} dir={theme.direction}>
              <Addresses globalState={state} />
            </TabPanel>
          </SwipeableViews>
        </FlexBox>
      </FrostedContentBox>
    </FlexBox>
  );
}
