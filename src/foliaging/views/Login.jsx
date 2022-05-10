import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { ContentBox, FlexBox, FrostedFlexBox } from "../styles/components";
import { loginValidator } from "../utils/validate";
import { useSiteContext } from "../states/SiteContext";
import { fetchAuthTokens } from "../states/siteReducer";

export default function Login() {
  const [, dispatch] = useSiteContext();

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
    const messages = loginValidator(loginFields);
    if (Object.keys(messages).length) {
      setValidationMsgs(messages);
    } else {
      dispatch(fetchAuthTokens({ dispatch, body: { ...loginFields } }));
    }
  };

  return (
    <FlexBox>
      <FrostedFlexBox
        sx={{
          py: 4,
          flexDirection: "column",
          width: { xs: "90%", sm: "70%", lg: "50%" },
        }}>
        <Typography variant="h3" component="h1" sx={{ flexGrow: 1 }}>
          Sign In
        </Typography>
        <ContentBox
          component="form"
          sx={{ py: 4, px: { xs: 2, md: 6, lg: 8 } }}>
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
        <Typography variant="subtitle1">
          Don't have an account yet?
          <Button
            href="/register"
            color="secondary"
            sx={{ textTransform: "none" }}>
            <Typography variant="subtitle1">Sign up now</Typography>
          </Button>
        </Typography>
      </FrostedFlexBox>
    </FlexBox>
  );
}
