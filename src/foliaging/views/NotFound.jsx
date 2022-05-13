import React from "react";
import { ContentFeature } from "../components";
import fluidImg from "../../assets/images/fluid_monstera.svg";

export default function NotFound() {
  return (
    <ContentFeature
      header="Not Found"
      message="The content you’re looking for doesn’t exist. Either it was removed, or you mistyped the link."
      imgSrc={fluidImg}
    />
  );
}
