import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { ViewContainer, ContentContainer } from "./styles/components";
import { HeaderWave, NavBar, SnackbarAlert } from "./components";
import {
  Home,
  Products,
  Login,
  Register,
  UserProfile,
  UserCart,
} from "./views";

export default function Site() {
  return (
    <Fragment>
      <ViewContainer>
        <HeaderWave />
        <NavBar />
        <ContentContainer>
          <Routes>
            <Route index exact path="/" element={<Home />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<UserProfile />} />
            <Route exact path="/cart" element={<UserCart />} />
          </Routes>
        </ContentContainer>
        <SnackbarAlert />
      </ViewContainer>
    </Fragment>
  );
}
