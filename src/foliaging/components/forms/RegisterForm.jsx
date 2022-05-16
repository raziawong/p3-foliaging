import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { ContentBox, FlexBox, FrostedFlexBox } from "../../components";
import { messages, processData, registerValidator } from "../../utils";
import { useSiteDispatchContext, setError, setSuccess } from "../../states";

const registerUser = async (data) => {
  let results = { success: false, message: "" };
  try {
    const resp = await processData.register(data);
    if (resp?.data?.user) {
      results.success = true;
      results.message = messages.registerSuccess(resp.data.user);
    }
  } catch (err) {
    console.log(err);
    if (err.response?.status === 402) {
      results.message = messages.registerDenied;
    } else {
      results.message = messages.registerFailed;
    }
  } finally {
    return results;
  }
};

export default function RegisterForm() {
  const dispatch = useSiteDispatchContext();

  const [registerFields, setRegisterFields] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [validationMsgs, setValidationMsgs] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = ({ target }) => {
    setRegisterFields({ ...registerFields, [target.name]: target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const messages = registerValidator(registerFields);
    if (Object.keys(messages).length) {
      setValidationMsgs(messages);
    } else {
      const results = await registerUser(registerFields);
      if (results.success) {
        dispatch(setSuccess(results.message));
      } else {
        dispatch(setError(results.message));
      }
    }
  };

  return (
    <FrostedFlexBox sx={{ py: 4, flexDirection: "column" }}>
      <ContentBox component="form" sx={{ py: 4, px: { xs: 2, md: 6, lg: 8 } }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Username"
          name="username"
          autoComplete="username"
          color="primary"
          value={registerFields.username}
          onChange={handleChange}
          error={!!validationMsgs.username || false}
          helperText={validationMsgs.username}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          name="email"
          autoComplete="email"
          color="primary"
          value={registerFields.email}
          onChange={handleChange}
          error={!!validationMsgs.email || false}
          helperText={validationMsgs.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          color="primary"
          value={registerFields.password}
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
          value={registerFields.confirm_password}
          onChange={handleChange}
          error={!!validationMsgs.confirm_password || false}
          helperText={validationMsgs.confirm_password}
        />
        <FlexBox sx={{ pt: 6, justifyContent: "flex-end" }}>
          <Button variant="outlined" color="primary" onClick={handleSubmit}>
            Register Now
          </Button>
        </FlexBox>
      </ContentBox>
    </FrostedFlexBox>
  );
}
