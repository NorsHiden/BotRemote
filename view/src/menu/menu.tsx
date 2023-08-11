import { useEffect, useState } from "react";
import "./menu.css";
import * as icons from "iconsax-react";
import { Guild, User } from "discord.js";
import axios from "axios";

const GuildItem = ({ id, img, name }) => {
  return (
    <a className="guild-dropdown-item" href={id}>
      <img className="guild-dropdown-item-image" src={img}></img>
      <div className="guild-dropdown-item-name">{name}</div>
    </a>
  );
};

const GuildDropdown = ({ guilds }) => {
  return (
    <div className="guild-dropdown">
      {guilds.map((guild) => (
        <GuildItem
          key={guild.id}
          id={guild.id}
          img={guild.iconURL}
          name={guild.name}
        />
      ))}
    </div>
  );
};

const GuildSection = ({
  guilds,
  currentGuild,
}: {
  guilds: Guild[];
  currentGuild: Guild;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropDownHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button className="guild-select" onClick={dropDownHandler}>
        {currentGuild ? (
          <img className="guild-picture" src={currentGuild.iconURL}></img>
        ) : (
          <div className="guild-picture"></div>
        )}
        <div className="guild-name">
          {currentGuild ? currentGuild.name : "Select a guild..."}
        </div>
        <icons.ArrowDown2
          size="20"
          color="#636363"
          className="guild-dropdown-icon"
        />
      </button>
      {isOpen ? <GuildDropdown guilds={guilds} /> : null}
    </>
  );
};

export const Menu = ({ guilds, currentGuild }) => {
  const [profile, setProfile] = useState<User>({} as User);

  useEffect(() => {
    axios
      .get("/api/user/@me")
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
      })
      .catch((error) => {
        if (error.response.status === 401) window.location.href = "/login";
      });
  }, [currentGuild]);

  return (
    <div className="menu">
      <GuildSection guilds={guilds} currentGuild={currentGuild} />
      <div className="menu-section">
        <div className="user-profile">
          <a className="logout-btn" href="/api/oauth/logout">
            Logout
          </a>
          {profile.username ? (
            <img
              className="user-picture"
              src={`https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}`}
            ></img>
          ) : (
            <div className="user-picture"></div>
          )}
        </div>
      </div>
    </div>
  );
};
