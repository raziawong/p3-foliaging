import React from "react";
import { ContentBox, LandingBanner, LatestGrid } from "../components";

export default function Home() {
  return (
    <ContentBox sx={{ my: 4 }}>
      <LandingBanner />
      <LatestGrid />
    </ContentBox>
  );
}
