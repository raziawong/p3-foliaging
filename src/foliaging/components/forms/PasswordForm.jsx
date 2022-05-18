import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import {
  processLogout,
  processPasswordUpdate,
  useSiteDispatchContext,
} from "../../states";
import { FlexBox } from "../styled/components";
import { newPasswordValidator, allowToProtectedRoute } from "../../utils";

export default function PasswordForm({ handleClose }) {
  const dispatch = useSiteDispatchContext();
  const navigate = useNavigate();

  const [passwordFields, setPasswordFields] = useState({
    password: "",
    confirm_password: "",
  });

  const [validationMsgs, setValidationMsgs] = useState({
    password: "",
    confirm_password: "",
  });

  const handleLogout = () => {
    processLogout({ dispatch });
    navigate("/login");
  };

  const handleChange = ({ target }) => {
    setPasswordFields({ ...passwordFields, [target.name]: target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const validations = newPasswordValidator(passwordFields);
    if (Object.keys(validations).length) {
      setValidationMsgs(validations);
    } else {
      allowToProtectedRoute((token) =>
        token
          ? processPasswordUpdate({
              dispatch,
              token,
              passwords: passwordFields,
            })
          : handleLogout()
      );
      handleClose();
    }
  };

  return (
    <FlexBox component="form" sx={{ px: 4, flexDirection: "column" }}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        color="primary"
        value={passwordFields.password}
        onChange={handleChange}
        error={!!validationMsgs.password || false}
        helperText={validationMsgs.password}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirm_password"
        label="Confirm Password"
        type="password"
        color="primary"
        autoComplete="new-password"
        value={passwordFields.confirm_password}
        onChange={handleChange}
        error={!!validationMsgs.confirm_password || false}
        helperText={validationMsgs.confirm_password}
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
          onClick={handleClose}>
          Cancel
        </Button>
      </FlexBox>
    </FlexBox>
  );
}
