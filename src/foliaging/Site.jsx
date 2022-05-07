import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/global/NavBar";
import { SiteContainer, ViewContainer } from "./styles/components";
import Home from "./views/Home";
import Products from "./views/Products";

export default function Site() {
  return (
    <Fragment>
      <SiteContainer>
        <ViewContainer>
          <NavBar></NavBar>
          <Routes>
            <Route index path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route index path="/products" element={<Products />} />
          </Routes>
        </ViewContainer>
      </SiteContainer>
    </Fragment>
  );
}
