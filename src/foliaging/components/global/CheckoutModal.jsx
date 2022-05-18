import React from "react";
import { Icon, IconButton, Modal, Typography } from "@mui/material";
import { FlexBox, ContentBox } from "../styled/components";
import { CheckoutForm } from "../../components";
import siteColors from "../../styles/colors";

export default function CheckoutModal({ open, close, total }) {
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="checkout details"
      aria-describedby="fill in contact and address information for checkout">
      <FlexBox sx={{ height: "100vh", width: "100vw" }}>
        <FlexBox
          sx={{
            p: 1,
            m: 1,
            width: { xs: "100%", md: "65%" },
            backgroundColor: siteColors.charcoal,
            flexDirection: "column",
          }}>
          <IconButton
            sx={{ alignSelf: "flex-end" }}
            color="tertiary"
            aria-label="close address modal"
            onClick={close}>
            <Icon className="ri-close-line" />
          </IconButton>
          <ContentBox sx={{ pl: 4, pb: 4 }}>
            <Typography variant="h4" component="h4">
              Checkout Details
            </Typography>
          </ContentBox>
          <ContentBox sx={{ p: 2 }}>
            <CheckoutForm close={close} total={total} />
          </ContentBox>
        </FlexBox>
      </FlexBox>
    </Modal>
  );
}
