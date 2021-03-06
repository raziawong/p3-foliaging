import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import {
  processProfileUpdate,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import { FlexBox } from "../styled/components";
import { allowToProtectedRoute, profileValidator } from "../../utils";

export default function ProfileForm({ logout, close }) {
  const state = useSiteStateContext();
  const dispatch = useSiteDispatchContext();

  const [profileFields, setProfileFields] = useState({
    first_name: state.user.first_name || "",
    last_name: state.user.last_name || "",
    contact_number: state.user.contact_number || "",
  });

  const [validationMsgs, setValidationMsgs] = useState({
    first_name: "",
    last_name: "",
    contact_number: "",
  });

  const handleChange = ({ target }) => {
    setProfileFields({ ...profileFields, [target.name]: target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const validations = profileValidator(profileFields);
    if (Object.keys(validations).length) {
      setValidationMsgs(validations);
    } else {
      allowToProtectedRoute((token) =>
        token
          ? processProfileUpdate({
              dispatch,
              token,
              profile: profileFields,
            })
          : logout()
      );
      close();
    }
  };

  return (
    <FlexBox component="form" sx={{ px: 4, flexDirection: "column" }}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="first_name"
        label="First Name"
        color="primary"
        value={profileFields.first_name}
        onChange={handleChange}
        error={!!validationMsgs.first_name || false}
        helperText={validationMsgs.first_name}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="last_name"
        label="Last Name"
        color="primary"
        value={profileFields.last_name}
        onChange={handleChange}
        error={!!validationMsgs.last_name || false}
        helperText={validationMsgs.last_name}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="contact_number"
        label="Contact Number"
        color="primary"
        value={profileFields.contact_number}
        onChange={handleChange}
        error={!!validationMsgs.contact_number || false}
        helperText={validationMsgs.contact_number}
      />
      <FlexBox sx={{ pt: 4, justifyContent: "flex-end" }}>
        <Button
          sx={{ mr: 1 }}
          variant="outlined"
          color="secondary"
          size="small"
          onClick={handleSubmit}>
          Update
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
