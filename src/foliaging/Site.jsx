import React, { Fragment } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  ViewContainer,
  ContentContainer,
  HeaderWave,
  NavBar,
  SnackbarAlert,
} from "./components";
import { stateKey, useSiteStateContext } from "./states";
import { getLocalTokens } from "./utils";
import {
  Home,
  Products,
  Login,
  Register,
  Account,
  Checkout,
  NotFound,
  ProductDetails,
} from "./views";

const PrivateRoute = ({ children }) => {
  const state = useSiteStateContext();
  const tokens = getLocalTokens();
  const location = useLocation();

  if (!state.user || !tokens.accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

const NonPrivateRoute = ({ children }) => {
  const state = useSiteStateContext();
  const tokens = getLocalTokens();
  const location = useLocation();

  if (state.user && tokens.accessToken) {
    return <Navigate to="/profile" replace state={{ from: location }} />;
  }

  return children;
};

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
            <Route path="product/:id" element={<ProductDetails />} />
            <Route
              exact
              path="/login"
              element={
                <NonPrivateRoute>
                  <Login />
                </NonPrivateRoute>
              }
            />
            <Route
              exact
              path="/register"
              element={
                <NonPrivateRoute>
                  <Register />
                </NonPrivateRoute>
              }
            />
            <Route
              exact
              path="/profile"
              element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/checkout/success"
              element={
                <PrivateRoute>
                  <Checkout results="success" />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/checkout/cancel"
              element={
                <PrivateRoute>
                  <Checkout results="cancel" />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ContentContainer>
        <SnackbarAlert />
      </ViewContainer>
    </Fragment>
  );
}
