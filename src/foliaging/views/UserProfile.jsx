import React, { useState } from "react";
import { useSiteContext } from "../states";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { Box, Tabs, Tab, useTheme } from "@mui/material";
import { FlexBox, FrostedContentBox } from "../styles/components";
import { Addresses, Contact, UserSettings } from "../components";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function UserProfile() {
  const theme = useTheme();
  const [state] = useSiteContext();
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (evt, index) => {
    setTabIndex(index);
  };

  const handleChangeIndex = (index) => {
    setTabIndex(index);
  };

  return (
    <FlexBox sx={{ my: 4 }}>
      <FrostedContentBox sx={{ py: 4, width: "90%" }}>
        <FlexBox>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            textColor="secondary"
            indicatorColor="secondary">
            <Tab label="Settings" />
            <Tab label="Contact" />
            <Tab label="Addresses" />
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
