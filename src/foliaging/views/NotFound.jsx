import React from "react";
import { useParams } from "react-router-dom";
import { ContentFeature } from "../components";
import fluidImg from "../../assets/images/fluid_monstera.svg";

export default function NotFound() {
  const params = useParams();

  return (
    <ContentFeature
      header="Not Found"
      message="The content you’re looking for doesn’t exist. Either it was removed, or you mistyped the link."
      imgSrc={fluidImg}
    />
  );
}
