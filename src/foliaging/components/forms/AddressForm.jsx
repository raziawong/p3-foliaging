import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import {
  processAddressAdd,
  processAddressUpdate,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import { FlexBox } from "../styled/components";
import {
  addressValidator,
  allowToProtectedRoute,
  optionDisplay,
} from "../../utils";

export default function AddressForm({ logout, close, fieldsState }) {
  const state = useSiteStateContext();
  const dispatch = useSiteDispatchContext();

  const [addressFields, setAddressFields] = useState({ ...fieldsState });

  const [validationMsgs, setValidationMsgs] = useState({
    address_type_id: "",
    label: "",
    line_1: "",
    line_2: "",
    floor_number: "",
    unit_number: "",
    postal_code: "",
  });

  const handleChange = ({ target }) => {
    setAddressFields({ ...addressFields, [target.name]: target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const validations = addressValidator(addressFields);
    if (Object.keys(validations).length) {
      setValidationMsgs(validations);
    } else {
      const { id, ...address } = addressFields;
      allowToProtectedRoute((token) =>
        token
          ? id
            ? processAddressUpdate({
                dispatch,
                token,
                aid: id,
                address,
              })
            : processAddressAdd({
                dispatch,
                token,
                address,
              })
          : logout()
      );

      close();
    }
  };

  return (
    <FlexBox component="form" sx={{ px: 4, flexDirection: "column" }}>
      <FlexBox sx={{ gap: 1 }}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel shrink id="address-type-label">
            Type
          </InputLabel>
          <Select
            fullWidth
            displayEmpty
            notched
            label="Type"
            arial-label="type"
            labelId="address-type-label"
            name="address_type_id"
            value={addressFields.address_type_id}
            onChange={handleChange}>
            {optionDisplay.single(state.options.address.types)}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          name="label"
          label="Address Label"
          color="primary"
          value={addressFields.label}
          onChange={handleChange}
          error={!!validationMsgs.label || false}
          helperText={validationMsgs.label}
        />
      </FlexBox>
      <TextField
        margin="normal"
        required
        fullWidth
        name="line_1"
        label="Address Line 1"
        color="primary"
        value={addressFields.line_1}
        onChange={handleChange}
        error={!!validationMsgs.line_1 || false}
        helperText={validationMsgs.line_1}
      />
      <TextField
        margin="normal"
        fullWidth
        name="line_2"
        label="Address Line 2"
        color="primary"
        value={addressFields.line_2}
        onChange={handleChange}
        error={!!validationMsgs.line_2 || false}
        helperText={validationMsgs.line_2}
      />
      <FlexBox sx={{ gap: 1, flexDirection: { xs: "column", md: "row" } }}>
        <FlexBox sx={{ gap: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            name="floor_number"
            label="Floor"
            color="primary"
            value={addressFields.floor_number}
            onChange={handleChange}
            error={!!validationMsgs.floor_number || false}
            helperText={validationMsgs.floor_number}
          />
          <span> - </span>
          <TextField
            margin="normal"
            fullWidth
            name="unit_number"
            label="Unit"
            color="primary"
            value={addressFields.unit_number}
            onChange={handleChange}
            error={!!validationMsgs.unit_number || false}
            helperText={validationMsgs.unit_number}
          />
        </FlexBox>
        <TextField
          margin="normal"
          required
          fullWidth
          name="postal_code"
          label="Postal Code"
          color="primary"
          value={addressFields.postal_code}
          onChange={handleChange}
          error={!!validationMsgs.postal_code || false}
          helperText={validationMsgs.postal_code}
        />
      </FlexBox>
      <FlexBox sx={{ pt: 4, justifyContent: "flex-end" }}>
        <Button
          sx={{ mr: 1 }}
          variant="outlined"
          color="secondary"
          size="small"
          onClick={handleSubmit}>
          {fieldsState.id ? "Update" : "Add"}
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
  );
}
