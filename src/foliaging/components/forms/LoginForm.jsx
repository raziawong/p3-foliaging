import React, { useState } from "react";
import { fetchAuthTokens, useSiteDispatchContext } from "../../states";
import { Button, TextField, Typography } from "@mui/material";
import { ContentBox, FlexBox, FrostedFlexBox } from "../../components";
import { loginValidator } from "../../utils";

export default function LoginForm() {
  const dispatch = useSiteDispatchContext();

  const [loginFields, setLoginFields] = useState({
    login: "",
    password: "",
  });

  const [validationMsgs, setValidationMsgs] = useState({
    login: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    setLoginFields({ ...loginFields, [target.name]: target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const messages = loginValidator(loginFields);
    if (Object.keys(messages).length) {
      setValidationMsgs(messages);
    } else {
      fetchAuthTokens({ dispatch, body: { ...loginFields } });
    }
  };

  return (
    <FrostedFlexBox sx={{ py: 4, flexDirection: "column" }}>
      <ContentBox component="form" sx={{ py: 4, px: { xs: 2, md: 6, lg: 8 } }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email / Username"
          name="login"
          autoComplete="login"
          autoFocus
          color="primary"
          value={loginFields.login}
          onChange={handleChange}
          error={!!validationMsgs.login || false}
          helperText={validationMsgs.login}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          color="primary"
          value={loginFields.password}
          onChange={handleChange}
          error={!!validationMsgs.password || false}
          helperText={validationMsgs.password}
        />
        <FlexBox sx={{ pt: 6, justifyContent: "flex-end" }}>
          <Button variant="outlined" color="primary" onClick={handleSubmit}>
            Sign In
          </Button>
        </FlexBox>
      </ContentBox>
      <Typography variant="subtitle1" sx={{ textAlign: "center", zIndex: 4 }}>
        Don't have an account yet?
        <Button
          href="/register"
          color="secondary"
          sx={{ textTransform: "none" }}>
          <Typography variant="subtitle1">Sign up now</Typography>
        </Button>
      </Typography>
    </FrostedFlexBox>
  );
}
