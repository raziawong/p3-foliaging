import React from "react";
import { ContentFeature } from "../components";
import fluidImg from "../../assets/images/fluid_monstera.svg";

export default function Checkout({ results }) {
  return (
    <ContentFeature
      header={results === "success" ? "Thank you" : "Sorry"}
      subheader={
        results === "success"
          ? "Payment processed successfully"
          : "Payment have been cancelled"
      }
      message={
        results === "success"
          ? "We will be working to send the lucky plants to their new home as per the chosen shipping method!"
          : ""
      }
      imgSrc={fluidImg}
    />
  );
}
