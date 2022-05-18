import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon, Typography } from "@mui/material";
import {
  processLogout,
  stateKey,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import { ProfileAddressFlexBox, FlexBox } from "../styled/components";
import LeafLoader from "../global/LeafLoader";
import { formatAddress } from "../../utils";
import { AddressModal } from "../../components";

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
      <AddressModal
        modalType={modalType}
        handleLogout={handleLogout}
        handleClose={handleClose}
        fieldsState={addressState}
      />
    </Fragment>
  );
}
