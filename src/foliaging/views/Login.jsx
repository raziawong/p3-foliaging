import React, { useState } from "react";
import { useSiteDispatchContext, fetchAuthTokens } from "../states";
import fluidImage from "../../assets/images/fluid1.svg";
import {
  Box,
  Button,
  Card,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { ContentBox, FlexBox, FrostedFlexBox } from "../styles/components";
import { loginValidator } from "../utils";
import siteColors from "../styles/colors";

export default function Login() {
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
      dispatch(fetchAuthTokens({ dispatch, body: { ...loginFields } }));
    }
  };

  return (
    <FlexBox sx={{ mt: 4 }}>
      <Box
        sx={{ width: "90%" }}
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)"
        gridTemplateRow="repeat(4, 1fr)">
        <Box gridArea="1 / 1 / 5 / 4" sx={{ zIndex: 1 }}>
          <Card>
            <CardMedia component="img" image={fluidImage} height="600" />
          </Card>
        </Box>
        <Box gridArea="2 / 1 / 3 / 6" sx={{ zIndex: 3 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ pl: 4, color: siteColors.charcoal }}>
            Sign In
          </Typography>
        </Box>
        <Box gridArea="2 / 2 / 4 / 6" sx={{ zIndex: 2 }}>
          <FrostedFlexBox sx={{ py: 4, flexDirection: "column" }}>
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
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSubmit}>
                  Sign In
                </Button>
              </FlexBox>
            </ContentBox>
            <Typography variant="subtitle1" sx={{ zIndex: 4 }}>
              Don't have an account yet?
              <Button
                href="/register"
                color="secondary"
                sx={{ textTransform: "none" }}>
                <Typography variant="subtitle1">Sign up now</Typography>
              </Button>
            </Typography>
          </FrostedFlexBox>
        </Box>
      </Box>
    </FlexBox>
  );
}
