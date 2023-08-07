import "./music_controller.css";
import { ChannelsSelect } from "./channelSelect";
import { Search } from "./Search";
import { MusicPlayer } from "./musicPlayer";
import { Guild } from "discord.js";
import { useState } from "react";
import { Queue } from "../types";

export const MusicController = ({ currentGuild }: { currentGuild: Guild }) => {
  const [queue, setQueue] = useState<Queue[]>([]);

  return (
    <div className="music-controller">
      <div className="player-search">
        <MusicPlayer
          currentGuild={currentGuild}
          queueState={{ queue, setQueue }}
        />
        <div className="channels-search">
          <ChannelsSelect currentGuild={currentGuild} />
          <Search currentGuild={currentGuild} queue={queue} />
        </div>
      </div>
    </div>
  );
};
