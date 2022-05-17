import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import {
  ViewContainer,
  ContentContainer,
  HeaderWave,
  NavBar,
  SnackbarAlert,
} from "./components";
import { stateKey } from "./states";
import {
  Home,
  Products,
  Login,
  Register,
  Account,
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
            <Route
              exact
              path="/products"
              element={<Products type={stateKey.PRODUCTS} />}
            />
            <Route
              exact
              path="/plants"
              element={<Products type={stateKey.PLANTS} />}
            />
            <Route
              exact
              path="/planters"
              element={<Products type={stateKey.PLANTERS} />}
            />
            <Route
              exact
              path="/supplies"
              element={<Products type={stateKey.SUPPLIES} />}
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Account />} />
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
