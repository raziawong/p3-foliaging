import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import {
  setError,
  setSuccess,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import { FlexBox } from "../styled/components";
import {
  messages,
  getLocalTokens,
  processData,
  newPasswordValidator,
} from "../../utils";
import LeafLoader from "../global/LeafLoader";

export default function Settings() {
  const state = useSiteStateContext();
  const dispatch = useSiteDispatchContext();

  const { isLoading, user } = state;

  const [passwordFields, setPasswordFields] = useState({
    password: "",
    confirm_password: "",
  });

  const [validationMsgs, setValidationMsgs] = useState({
    password: "",
    confirm_password: "",
  });

  const handleChange = ({ target }) => {
    setPasswordFields({ ...passwordFields, [target.name]: target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const validations = newPasswordValidator(passwordFields);
    if (Object.keys(validations).length) {
      setValidationMsgs(validations);
    } else {
      try {
        const tokens = getLocalTokens();
        const results = await processData.passwordUpdate(
          passwordFields,
          tokens.accessToken
        );
        if (results.data?.user) {
          dispatch(setSuccess(messages.passswordUpdateSuccess));
        }
      } catch (err) {
        dispatch(setError(messages.userUpdateError));
      }
    }
  };

  return (
    <Fragment>
      {isLoading ? (
        <LeafLoader />
      ) : (
        <Fragment>
          <FlexBox sx={{ flexDirection: "column" }}>
            <FlexBox>
              <Grid container spacing={{ xs: 1, md: 3 }}>
                <Grid item xs={12} sm={4} md={6}>
                  <Typography sx={{ textAlign: { xs: "center", sm: "right" } }}>
                    Username:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                  <Typography sx={{ textAlign: { xs: "center", sm: "left" } }}>
                    {user.username}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <Typography sx={{ textAlign: { xs: "center", sm: "right" } }}>
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                  <Typography sx={{ textAlign: { xs: "center", sm: "left" } }}>
                    {user.email}
                  </Typography>
                </Grid>
              </Grid>
            </FlexBox>
            <FlexBox component="form" sx={{ flexDirection: "column", mt: 5 }}>
              <Typography variant="h6" component="h4">
                Change Password
              </Typography>
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
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={handleSubmit}>
                  Update
                </Button>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </Fragment>
      )}
    </Fragment>
  );
}
