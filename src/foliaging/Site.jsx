import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { ViewContainer, ContentContainer } from "./styles/components";
import { HeaderWave, NavBar } from "./components";
import { Home, Products, Login, Register } from "./views";

export default function Site() {
  return (
    <Fragment>
      <ViewContainer>
        <HeaderWave />
        <NavBar />
        <ContentContainer>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="/products" element={<Products />} />
            <Route index path="/login" element={<Login />} />
            <Route index path="/register" element={<Register />} />
          </Routes>
        </ContentContainer>
      </ViewContainer>
    </Fragment>
  );
}
