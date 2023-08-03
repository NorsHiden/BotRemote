import "./menu.css";
import * as icons from "iconsax-react";

const GuildSection = () => {
  return (
    <div className="guild-select">
      <div className="guild-picture"></div>
      <div className="guild-name">Select a guild...</div>
      <icons.ArrowDown2
        size="20"
        color="#636363"
        className="guild-dropdown-icon"
      />
    </div>
  );
};

export const Menu = () => {
  return (
    <div className="menu">
      <GuildSection />
      <div className="menu-section">
        <div className="user-profile">
          <div className="user-picture"></div>
        </div>
      </div>
    </div>
  );
};
