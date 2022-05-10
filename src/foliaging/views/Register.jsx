import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { ContentBox, FlexBox, FrostedFlexBox } from "../styles/components";
import { registerValidator } from "../utils/validate";
import { useSiteContext } from "../states/SiteContext";
import { processData } from "../utils/data";
import { messages } from "../utils/helpers";
import { setError, setSuccess } from "../states/siteReducer";

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

export default function Register() {
  const [, dispatch] = useSiteContext();

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
    <FlexBox sx={{ my: 4 }}>
      <FrostedFlexBox
        sx={{
          py: 4,
          flexDirection: "column",
          width: { xs: "90%", sm: "70%", lg: "50%" },
        }}>
        <Typography variant="h3" component="h1" sx={{ flexGrow: 1 }}>
          Create An Account
        </Typography>
        <ContentBox
          component="form"
          sx={{ py: 4, px: { xs: 2, md: 6, lg: 8 } }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
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
            autoFocus
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
    </FlexBox>
  );
}
