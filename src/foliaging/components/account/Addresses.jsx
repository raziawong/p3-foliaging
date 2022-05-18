import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon, IconButton, Modal, Typography } from "@mui/material";
import {
  processAddressDelete,
  processLogout,
  stateKey,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import {
  ProfileAddressFlexBox,
  FlexBox,
  ContentBox,
} from "../styled/components";
import LeafLoader from "../global/LeafLoader";
import { allowToProtectedRoute, formatAddress } from "../../utils";
import AddressForm from "../forms/AddressForm";
import siteColors from "../../styles/colors";

export default function Addresses() {
  const state = useSiteStateContext();
  const dispatch = useSiteDispatchContext();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    processLogout({ dispatch });
    navigate("/login");
  };

  const handleAddClick = () => {
    setModalType("add");
    setAddressState(initState);
  };

  const handleEditClick = (id) => {
    const address = user.addresses.filter((item) => item.id === id);

    setModalType("edit");
    if (address.length) {
      const { type, ...data } = address[0];
      setAddressState(data);
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

  const handleDeleteSubmit = (evt) => {
    evt.preventDefault();
    allowToProtectedRoute((token) =>
      token && addressState.id
        ? processAddressDelete({
            dispatch,
            token,
            aid: addressState.id,
          })
        : handleLogout()
    );
    setModalType("");
    setAddressState(initState);
  };

  return state[stateKey.USER_LOADING] && state[stateKey.DATA_LOADING] ? (
    <LeafLoader />
  ) : (
    <Fragment>
      <FlexBox
        sx={{ minWidth: { xs: "100%", md: "80vw" }, flexDirection: "column" }}>
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
            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
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
                <FlexBox sx={{ minHeight: "20vh", flexDirection: "column" }}>
                  <Typography variant="subtitle1">
                    This action is irreversible, do you still want to proceed
                    with deleting <i>{addressState.label}</i>?
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
