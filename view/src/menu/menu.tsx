import { useState } from "react";
import "./menu.css";
import * as icons from "iconsax-react";

const GuildDropdown = () => {
  return (
    <div className="guild-dropdown">
      <div className="guild-dropdown-item">
        <div className="guild-dropdown-item-image"></div>
        <div className="guild-dropdown-item-name">Guild 1</div>
      </div>
      <div className="guild-dropdown-item">
        <div className="guild-dropdown-item-image"></div>
        <div className="guild-dropdown-item-name">Guild 2</div>
      </div>
      <div className="guild-dropdown-item">
        <div className="guild-dropdown-item-image"></div>
        <div className="guild-dropdown-item-name">Guild 3</div>
      </div>
    </div>
  );
};

const GuildSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="guild-select" onClick={dropDownHandler}>
        <div className="guild-picture"></div>
        <div className="guild-name">Select a guild...</div>
        <icons.ArrowDown2
          size="20"
          color="#636363"
          className="guild-dropdown-icon"
        />
      </button>
      {isOpen ? <GuildDropdown /> : null}
    </>
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
