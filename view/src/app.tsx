import { Menu } from "./menu/menu";
import { NavBar } from "./navBar/navBar";
import { Route, Routes } from "react-router-dom";
import { MusicController } from "./musicController/musicController";
import { useEffect, useState } from "react";
import axios from "axios";
import { Guild } from "discord.js";

export const App = () => {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [currentGuild, setCurrentGuild] = useState<Guild>({} as Guild);
  useEffect(() => {
    axios
      .get("/api/guilds")
      .then((res) => {
        setGuilds(res.data);
        const guildId = window.location.pathname.split("/")[1];
        const guild = res.data.find((guild) => guild.id === guildId);
        setCurrentGuild(guild);
      })
      .catch((error) => {
        if (error.response.status === 401) window.location.href = "/login";
      });
  }, []);

  return (
    <div className="container">
      <div className="crop-container">
        <NavBar />
        <div className="wrapper">
          <Menu guilds={guilds} currentGuild={currentGuild} />
          {currentGuild ? (
            <Routes>
              <Route
                path="/:id"
                element={<MusicController currentGuild={currentGuild} />}
              />
            </Routes>
          ) : (
            <div className="no-guild">No guild has been selected</div>
          )}
        </div>
      </div>
    </div>
  );
};
