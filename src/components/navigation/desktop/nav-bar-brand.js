import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/icons/Designer.png";

export const NavBarBrand = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <img className="nav-bar__logo" src={Logo} alt="logo" />
      </NavLink>
    </div>
  );
};
