import React from "react";
import { Button, Icon, IconButton, Modal, Typography } from "@mui/material";
import { processAddressDelete, useSiteDispatchContext } from "../../states";
import { FlexBox, ContentBox } from "../styled/components";
import { allowToProtectedRoute } from "../../utils";
import { AddressForm } from "../../components";
import siteColors from "../../styles/colors";

export default function AddressModal({
  modalType,
  handleLogout,
  handleClose,
  fieldsState,
}) {
  const dispatch = useSiteDispatchContext();

  const handleDeleteSubmit = (evt) => {
    evt.preventDefault();
    allowToProtectedRoute((token) =>
      token && fieldsState.id
        ? processAddressDelete({
            dispatch,
            token,
            aid: fieldsState.id,
          })
        : handleLogout()
    );
    handleClose();
  };

  return (
    <Modal
      open={!!modalType}
      onClose={handleClose}
      aria-labelledby="address book update"
      aria-describedby="add or edit address in address book">
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
            onClick={handleClose}>
            <Icon className="ri-close-line" />
          </IconButton>
          <ContentBox sx={{ pl: 4, pb: 4 }}>
            <Typography variant="h4" component="h4">
              Manage Address
            </Typography>
          </ContentBox>
          <ContentBox sx={{ p: 2 }}>
            {modalType === "delete" ? (
              <FlexBox sx={{ minHeight: "20vh", flexDirection: "column" }}>
                <Typography variant="subtitle1">
                  This action is irreversible, do you still want to proceed with
                  deleting <i>{fieldsState.label}</i>?
                </Typography>
                <FlexBox sx={{ py: 4, justifySelf: "flex-end" }}>
                  <Button
                    sx={{ mr: 1 }}
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={handleDeleteSubmit}>
                    Confirm
                  </Button>
                  <Button
                    variant="outlined"
                    color="tertiary"
                    size="small"
                    onClick={handleClose}>
                    Cancel
                  </Button>
                </FlexBox>
              </FlexBox>
            ) : (
              <AddressForm
                handleClose={handleClose}
                fieldsState={fieldsState}
              />
            )}
          </ContentBox>
        </FlexBox>
      </FlexBox>
    </Modal>
  );
}
