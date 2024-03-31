import React from "react";
import Logo from "../assets/icons/Designer.png";
import { useAuth0 } from "@auth0/auth0-react";

export const HeroBanner = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };
  return (
    <div className="hero-banner hero-banner--pink-indigo">
      <div className="hero-banner__logo">
        <img className="hero-banner__image" src={Logo} alt="logo" />
      </div>
      <h1 className="hero-banner__headline">
        Hello, Welcome to Cloud Locker !
      </h1>
      <p className="hero-banner__description">
        A secure place to store all your files and data.
      </p>
      <button
        id="code-sample-link"
        className="button button--secondary"
        onClick={handleSignUp}
      >
        Get Started →
      </button>
    </div>
  );
};
