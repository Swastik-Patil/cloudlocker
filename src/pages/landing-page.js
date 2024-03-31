import React from "react";
import { PageLayout } from "../components/page-layout";
import { HeroBanner } from "../components/hero-banner";
import { useAuth0 } from "@auth0/auth0-react";

export const LandingPage = () => {
  const { user } = useAuth0();

  if (user) {
    window.location.href = "/home";
  }

  return (
    <PageLayout>
      <HeroBanner />
    </PageLayout>
  );
};
