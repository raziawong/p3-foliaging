import React, { Fragment, useState } from "react";
import { Button, Icon, IconButton, Modal, Typography } from "@mui/material";
import { stateKey, useSiteStateContext } from "../../states";
import {
  ProfileAddressFlexBox,
  FlexBox,
  ContentBox,
} from "../styled/components";
import LeafLoader from "../global/LeafLoader";
import { formatAddress } from "../../utils";
import AddressForm from "../forms/AddressForm";
import siteColors from "../../styles/colors";

export default function Addresses() {
  const state = useSiteStateContext();
  const { user } = state;

  const initState = {
    address_type_id: 1,
    label: "",
    line_1: "",
    line_2: "",
    floor_number: "",
    unit_number: "",
    postal_code: "",
  };

  const [modalType, setModalType] = useState("");
  const [addressState, setAddressState] = useState(initState);

  const handleAddClick = () => {
    setModalType("add");
    setAddressState(initState);
  };

  const handleEditClick = (id) => {
    const address = user.addresses.filter((item) => item.id === id);

    setModalType("edit");
    if (address.length) {
      setAddressState(address[0]);
    }
  };

  const handleDeleteClick = (id) => {
    const address = user.addresses.filter((item) => item.id === id);

    setModalType("delete");
    if (address.length) {
      setAddressState(address[0]);
    }
  };

  const handleClose = () => {
    setModalType("");
    setAddressState(initState);
  };

  return state[stateKey.USER_LOADING] ? (
    <LeafLoader />
  ) : (
    <Fragment>
      <FlexBox sx={{ minWidth: "80vw", flexDirection: "column" }}>
        <Button
          onClick={handleAddClick}
          color="primary"
          sx={{ alignSelf: "flex-end" }}>
          Add New <Icon className="ri-arrow-right-s-line" />
        </Button>
        {user.addresses.map((address) => (
          <ProfileAddressFlexBox key={address.id}>
            <Typography
              sx={{ display: "block", flexBasis: "20%" }}
              variant="h6">
              {address.label}
              <Typography
                sx={{ display: "block", flexBasis: "20%" }}
                variant="caption">
                {address.type.type}
              </Typography>
            </Typography>
            <Typography variant="subtitle1">
              {formatAddress(address)}
            </Typography>
            <FlexBox sx={{ justifySelf: "flex-end", width: "max-content" }}>
              <Button
                onClick={(evt) => handleEditClick(address.id)}
                color="secondary">
                Update <Icon className="ri-arrow-right-s-line" />
              </Button>
              <Button
                onClick={(evt) => handleDeleteClick(address.id)}
                color="tertiary">
                Delete <Icon className="ri-arrow-right-s-line" />
              </Button>
            </FlexBox>
          </ProfileAddressFlexBox>
        ))}
      </FlexBox>
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
                <Button>Confirm</Button>
              ) : (
                <AddressForm
                  handleCancel={handleClose}
                  fieldsState={addressState}
                />
              )}
            </ContentBox>
          </FlexBox>
        </FlexBox>
      </Modal>
    </Fragment>
  );
}
