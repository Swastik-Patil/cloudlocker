import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { AuthenticationGuard } from "./components/authentication-guard";
import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProfilePage } from "./pages/profile-page";
import { LandingPage } from "./pages/landing-page";

export const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {isAuthenticated && (
        <>
          <Route
            path="/home"
            element={<AuthenticationGuard component={HomePage} />}
          />
          <Route
            path="/profile"
            element={<AuthenticationGuard component={ProfilePage} />}
          />
        </>
      )}

      <Route path="/callback*" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
