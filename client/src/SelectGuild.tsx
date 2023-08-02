import axios from "axios";
import { useEffect, useState } from "react";

const Guild = ({ guildId, guildName, guildIcon }) => {
  const safeIcon =
    "https://images-eds-ssl.xboxlive.com/image?url=Q_rwcVSTCIytJ0KOzcjWTYl.n38D8jlKWXJx7NRJmQKBAEDCgtTAQ0JS02UoaiwRCHTTX1RAopljdoYpOaNfVf5nBNvbwGfyR5n4DAs0DsOwxSO9puiT_GgKqinHT8HsW8VYeiiuU1IG3jY69EhnsQ--&format=source";
  return (
    <a className="guild" href={`/${guildId}`}>
      <img
        className="guild-icon"
        src={guildIcon ? guildIcon : safeIcon}
        alt={guildName}
      />
      <h1 className="guild-name">{guildName}</h1>
    </a>
  );
};

export const SelectGuild = () => {
  const [guilds, setGuilds] = useState([]);
  useEffect(() => {
    axios
      .get("/api/user/common-guilds")
      .then((res) => {
        setGuilds(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) window.location.href = "/login";
        else console.log(err);
      });
  }, []);

  return (
    <div className="center">
      <div>
        <h1 className="title">Select Guild</h1>
        <div className="guild-container">
          {guilds.map((guild) => (
            <Guild
              key={guild.id}
              guildId={guild.id}
              guildName={
                guild.name.length > 15
                  ? guild.name.slice(0, 15) + "..."
                  : guild.name
              }
              guildIcon={
                guild.icon
                  ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`
                  : ""
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
