import "./navbar.css";
import * as icons from "iconsax-react";

export const NavBar = () => {
  return (
    <div className="navbar">
      <icons.TriangleLogo size="32" color="#FFFFFF" className="navbar-logo" />
      <div className="navbar-menu">
        <a className="navbar-menu-item" href="#">
          <icons.Home size="32" color="#FFFFFF" variant="Outline" />
        </a>
        <a className="navbar-menu-item" href="#">
          <icons.MusicDashboard size="32" color="#FFFFFF" variant="Bold" />
        </a>
      </div>
    </div>
  );
};
