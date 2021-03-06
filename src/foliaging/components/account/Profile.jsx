import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon, Typography } from "@mui/material";
import {
  processLogout,
  stateKey,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import {
  ContentBox,
  ProfileItemFlexBox,
  ProfileGrid,
} from "../styled/components";
import { PasswordForm } from "../../components";
import LeafLoader from "../global/LeafLoader";
import ProfileForm from "../forms/ProfileForm";

export default function Profile() {
  const state = useSiteStateContext();
  const dispatch = useSiteDispatchContext();
  const navigate = useNavigate();
  const { user } = state;

  const [passwordView, setPasswordView] = useState(false);
  const [profileView, setProfileView] = useState(false);

  const handleLogout = () => {
    processLogout({ dispatch });
    navigate("/login");
  };

  const handleChangePasswordClick = (evt) => {
    setPasswordView(true);
  };

  const handleUpdateProfileClick = (evt) => {
    setProfileView(true);
  };

  const handleCancel = (evt) => {
    setPasswordView(false);
    setProfileView(false);
  };

  useEffect(() => {
    handleCancel();
  }, [state.user]);

  return state[stateKey.USER_LOADING] ? (
    <LeafLoader />
  ) : (
    <Fragment>
      <ProfileGrid>
        <ProfileItemFlexBox>
          {passwordView ? (
            <PasswordForm handleClose={handleCancel} />
          ) : (
            <Fragment>
              <Typography sx={{ fontWeight: 600 }}>
                Username:
                <Typography component="span" sx={{ pl: 1 }}>
                  {user.username}
                </Typography>
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>
                Email:
                <Typography component="span" sx={{ pl: 1 }}>
                  {user.email}
                </Typography>
              </Typography>
              <ContentBox sx={{ textAlign: "right", px: 4 }}>
                <Button color="tertiary" onClick={handleChangePasswordClick}>
                  Change Password
                  <Icon className="ri-arrow-right-s-line" />
                </Button>
              </ContentBox>
            </Fragment>
          )}
        </ProfileItemFlexBox>
        <ProfileItemFlexBox>
          {profileView ? (
            <ProfileForm logout={handleLogout} close={handleCancel} />
          ) : (
            <Fragment>
              <Typography sx={{ fontWeight: 600 }}>
                First Name:
                <Typography component="span" sx={{ pl: 1 }}>
                  {user.first_name || <em>unset</em>}
                </Typography>
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>
                Last Name:
                <Typography component="span" sx={{ pl: 1 }}>
                  {user.last_name || <em>unset</em>}
                </Typography>
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>
                Contact Number:
                <Typography component="span" sx={{ pl: 1 }}>
                  {user.contact_number || <em>unset</em>}
                </Typography>
              </Typography>
              <ContentBox
                sx={{ alignSelf: "flex-end", textAlign: "right", px: 4 }}>
                <Button color="tertiary" onClick={handleUpdateProfileClick}>
                  Update Profile <Icon className="ri-arrow-right-s-line" />
                </Button>
              </ContentBox>
            </Fragment>
          )}
        </ProfileItemFlexBox>
      </ProfileGrid>
    </Fragment>
  );
}
