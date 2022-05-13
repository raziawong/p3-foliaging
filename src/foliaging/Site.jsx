import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import {
  ViewContainer,
  ContentContainer,
  HeaderWave,
  NavBar,
  SnackbarAlert,
} from "./components";
import {
  Home,
  Products,
  Login,
  Register,
  UserProfile,
  Checkout,
  NotFound,
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
            <Route
              exact
              path="/checkout/success"
              element={<Checkout results="success" />}
            />
            <Route
              exact
              path="/checkout/cancel"
              element={<Checkout results="cancel" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ContentContainer>
        <SnackbarAlert />
      </ViewContainer>
    </Fragment>
  );
}
