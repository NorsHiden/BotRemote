import "./music_controller.css";
import { ChannelsSelect } from "./channelSelect";
import { Search } from "./Search";
import { MusicPlayer } from "./musicPlayer";
import { Guild } from "discord.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Queue } from "../types";

export const MusicController = ({ currentGuild }: { currentGuild: Guild }) => {
  const [queue, setQueue] = useState<Queue[]>([]);

  useEffect(() => {
    if (!currentGuild) return;
    axios.get(`/api/voices/${currentGuild.id}/queue`).then((res) => {
      setQueue(res.data);
    });
  }, [currentGuild]);

  const updateQueue = () => {
    axios.get(`/api/voices/${currentGuild.id}/queue`).then((res) => {
      setQueue(res.data);
    });
  };

  const removeSong = (song: Queue) => {
    axios
      .delete(`/api/voices/${currentGuild.id}/queue?id=${song.id}`)
      .then((res) => {
        console.log(res.data);
        updateQueue();
      });
  };

  return (
    <div className="music-controller">
      <div className="player-search">
        <MusicPlayer queue={queue} removeSong={removeSong} />
        <div className="channels-search">
          <ChannelsSelect currentGuild={currentGuild} />
          <Search
            currentGuild={currentGuild}
            queue={queue}
            updateQueue={updateQueue}
          />
        </div>
      </div>
    </div>
  );
};
