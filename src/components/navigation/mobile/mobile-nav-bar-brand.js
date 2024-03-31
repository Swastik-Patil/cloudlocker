import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/icons/Designer.png";

export const MobileNavBarBrand = ({ handleClick }) => {
  return (
    <div onClick={handleClick} className="mobile-nav-bar__brand">
      <NavLink to="/">
        <img className="mobile-nav-bar__logo" src={Logo} alt="App logo" />
      </NavLink>
    </div>
  );
};
