import "./music_controller.css";
import { ChannelsSelect } from "./channelSelect";
import { Search } from "./Search";
import { MusicPlayer } from "./musicPlayer";
import { Guild } from "discord.js";
import { useEffect, useState } from "react";
import axios from "axios";

export const MusicController = ({ currentGuild }: { currentGuild: Guild }) => {
  const [queue, setQueue] = useState<any>([]);

  useEffect(() => {
    if (!currentGuild) return;
    axios.get(`/api/voices/${currentGuild.id}/queue`).then((res) => {
      setQueue(res.data);
    });
  }, [currentGuild]);
  return (
    <div className="music-controller">
      <div className="player-search">
        <MusicPlayer queue={queue} />
        <div className="channels-search">
          <ChannelsSelect currentGuild={currentGuild} />
          <Search currentGuild={currentGuild} />
        </div>
      </div>
    </div>
  );
};
