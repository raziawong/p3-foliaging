import React, { useState } from "react";
import fluidImage from "../../assets/images/fluid2.svg";
import { Button, Card, CardMedia, TextField, Typography } from "@mui/material";
import { ContentBox, FlexBox, FrostedFlexBox } from "../components";
import { messages, processData, registerValidator } from "../utils";
import { useSiteDispatchContext } from "../states/SiteContext";
import { setError, setSuccess } from "../states/siteReducer";
import { Box } from "@mui/system";
import siteColors from "../styles/colors";

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
    <FlexBox sx={{ my: 4 }}>
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
            Create An Account
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
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSubmit}>
                  Register Now
                </Button>
              </FlexBox>
            </ContentBox>
          </FrostedFlexBox>
        </Box>
      </Box>
    </FlexBox>
  );
}
