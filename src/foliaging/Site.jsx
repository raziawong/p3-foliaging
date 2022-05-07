import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import {
  SiteContainer,
  ViewContainer,
  ContentContainer,
} from "./styles/components";
import { HeaderWave, NavBar } from "./components";
import { Home, Products, Login, Register } from "./views";

export default function Site() {
  return (
    <Fragment>
      <SiteContainer>
        <ViewContainer>
          <HeaderWave />
          <NavBar />
          <ContentContainer>
            <Routes>
              <Route index path="/" element={<Home />} />
            </Routes>
            <Routes>
              <Route index path="/products" element={<Products />} />
            </Routes>
            <Routes>
              <Route index path="/register" element={<Login />} />
            </Routes>
            <Routes>
              <Route index path="/login" element={<Register />} />
            </Routes>
          </ContentContainer>
        </ViewContainer>
      </SiteContainer>
    </Fragment>
  );
}
