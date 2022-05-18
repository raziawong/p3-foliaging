import React, { Fragment, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Icon,
  InputLabel,
  LinearProgress,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  processCheckout,
  processProfileUpdate,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import { AddressModal, FlexBox } from "../../components";
import {
  allowToProtectedRoute,
  checkoutValidator,
  formatAddress,
  optionDisplay,
} from "../../utils";

export default function CheckoutForm({ logout, close, total }) {
  const state = useSiteStateContext();
  const dispatch = useSiteDispatchContext();

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

  const [checkoutFields, setCheckoutFields] = useState({
    first_name: state.user.first_name || "",
    last_name: state.user.last_name || "",
    contact_number: state.user.contact_number || "",
    shipping_id: "",
    billing_id: "",
  });

  const [validationMsgs, setValidationMsgs] = useState({
    first_name: "",
    last_name: "",
    contact_number: "",
    shipping_id: "",
    billing_id: "",
  });

  const billingOptions = () =>
    user.addresses.filter(
      (address) => address.type.type.toLowerCase() === "billing"
    );

  const getFormattedAddress = (id) => {
    const addr = user.addresses.filter((address) => address.id === id);

    if (addr && addr.length) {
      return formatAddress(addr[0]);
    }

    return "";
  };

  const handleAddClick = () => {
    setModalType("add");
    setAddressState(initState);
  };

  const handleAddClose = () => {
    setModalType("");
    setAddressState(initState);
  };

  const handleChange = ({ target }) => {
    setCheckoutFields({ ...checkoutFields, [target.name]: target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const validations = checkoutValidator(checkoutFields);
    if (Object.keys(validations).length) {
      setValidationMsgs(validations);
    } else {
      allowToProtectedRoute((token) =>
        token
          ? processCheckout({
              dispatch,
              token,
              details: {
                cid: state.user.id,
                ...checkoutFields,
              },
            })
          : logout({ dispatch })
      );
      close();
    }
  };

  return (
    <Fragment>
      <FlexBox component="form" sx={{ px: 4, flexDirection: "column" }}>
        {state.isCheckingOut ? (
          <Box sx={{ py: 2, width: "90%" }}>
            <LinearProgress color="secondary" />
            <Typography>
              Please hold on while we redirect you to our payment platform
            </Typography>
          </Box>
        ) : (
          <Fragment />
        )}
        <FlexBox sx={{ pb: 4, justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h5" component="h5">
              {total()}
            </Typography>
          </Box>
          <Box>
            <Button color="secondary" onClick={handleAddClick}>
              Add New Address
              <Icon className="ri-arrow-right-s-line" />
            </Button>
          </Box>
        </FlexBox>
        <FlexBox
          sx={{
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}>
          <FlexBox
            sx={{
              minHeight: "40vh",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: 5,
            }}>
            <TextField
              required
              fullWidth
              name="first_name"
              label="First Name"
              color="primary"
              value={checkoutFields.first_name}
              onChange={handleChange}
              error={!!validationMsgs.first_name || false}
              helperText={validationMsgs.first_name}
            />
            <TextField
              required
              fullWidth
              name="last_name"
              label="Last Name"
              color="primary"
              value={checkoutFields.last_name}
              onChange={handleChange}
              error={!!validationMsgs.last_name || false}
              helperText={validationMsgs.last_name}
            />
            <TextField
              required
              fullWidth
              name="contact_number"
              label="Contact Number"
              color="primary"
              value={checkoutFields.contact_number}
              onChange={handleChange}
              error={!!validationMsgs.contact_number || false}
              helperText={validationMsgs.contact_number}
            />
          </FlexBox>
          <FlexBox
            sx={{
              minHeight: "40vh",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: 5,
            }}>
            <FormControl
              sx={{ width: "100%" }}
              error={!!validationMsgs.billing_id || false}>
              <InputLabel shrink id="billing-addr-label">
                Billing Address
              </InputLabel>
              <Select
                fullWidth
                displayEmpty
                notched
                required
                label="Billing Address"
                arial-label="billing address"
                labelId="billing-addr-label"
                name="billing_id"
                value={checkoutFields.billing_id}
                onChange={handleChange}
                error={!!validationMsgs.billing_id || false}>
                {optionDisplay.address(billingOptions())}
              </Select>
              {validationMsgs.billing_id ? (
                <FormHelperText>{validationMsgs.billing_id}</FormHelperText>
              ) : (
                <Fragment />
              )}
            </FormControl>
            {checkoutFields.billing_id ? (
              <Box sx={{ px: 2 }}>
                <Typography>
                  {getFormattedAddress(checkoutFields.billing_id)}
                </Typography>
              </Box>
            ) : (
              <Fragment />
            )}
            <FormControl
              sx={{ width: "100%" }}
              error={!!validationMsgs.shipping_id || false}>
              <InputLabel shrink id="shipping-addr-label">
                Shipping Address
              </InputLabel>
              <Select
                fullWidth
                displayEmpty
                notched
                required
                label="Shipping Address"
                arial-label="shipping address"
                labelId="shipping-addr-label"
                name="shipping_id"
                value={checkoutFields.shipping_id}
                onChange={handleChange}>
                {optionDisplay.address(user.addresses)}
              </Select>
              {validationMsgs.shipping_id ? (
                <FormHelperText>{validationMsgs.shipping_id}</FormHelperText>
              ) : (
                <Fragment />
              )}
            </FormControl>
            {checkoutFields.billing_id ? (
              <Box sx={{ px: 2 }}>
                <Typography>
                  {getFormattedAddress(checkoutFields.shipping_id)}
                </Typography>
              </Box>
            ) : (
              <Fragment />
            )}
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{ pt: 4, justifyContent: "flex-end" }}>
          <Button
            sx={{ mr: 1 }}
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleSubmit}>
            Proceed to Payment
          </Button>
          <Button
            variant="outlined"
            color="tertiary"
            size="small"
            onClick={close}>
            Cancel
          </Button>
        </FlexBox>
      </FlexBox>

      <AddressModal
        modalType={modalType}
        logout={logout}
        close={handleAddClose}
        fieldsState={addressState}
      />
    </Fragment>
  );
}
