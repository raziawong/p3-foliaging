import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import {
  SiteContainer,
  ViewContainer,
  ContentContainer,
} from "./styles/components";
import HeaderWave from "./components/global/HeaderWave";
import NavBar from "./components/global/NavBar";
import Home from "./views/Home";
import Products from "./views/Products";

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
          </ContentContainer>
        </ViewContainer>
      </SiteContainer>
    </Fragment>
  );
}
