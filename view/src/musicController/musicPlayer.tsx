import * as icons from "iconsax-react";
import { MusicQueue } from "./musicQueue";
import { Queue } from "../types";
import { useEffect, useState } from "react";
import axios from "axios";
import { Guild } from "discord.js";

const MusicSection = ({ currentGuild, currentPlaying, isLoopingState }) => {
  const PlaySong = () => {
    if (!currentGuild.id) return;
    axios.post(`/api/voices/${currentGuild.id}/play`);
  };

  const PauseSong = () => {
    if (!currentGuild.id) return;
    axios.post(`/api/voices/${currentGuild.id}/pause`);
  };

  return (
    <div className="music-section">
      <div className="music-info">
        <img className="music-image" src={currentPlaying.thumbnail}></img>
        <div className="music-text">
          <div className="music-title">
            {currentPlaying.title ? currentPlaying.title : "Untitled"}
          </div>
          <div className="music-author">
            {currentPlaying.artist ? currentPlaying.artist : "Untitled"}
          </div>
          <div className="music-3rd">0 view</div>
          <div className="music-3rd">
            {currentPlaying.duration ? currentPlaying.duration : "00:00"}
          </div>
        </div>
      </div>
      <div className="music-section-control">
        <icons.Shuffle
          className="music-section-control-icon"
          size="32"
          color="#FFFFFF"
          onClick={() => console.log("shuffle")}
        />
        <icons.Previous
          className="music-section-control-icon"
          size="32"
          color="#FFFFFF"
          variant="Bold"
        />
        {currentPlaying.state == "Playing" ? (
          <icons.PauseCircle
            className="music-section-control-icon"
            size="32"
            color="#FFFFFF"
            variant="Bold"
            onClick={() => PauseSong()}
          />
        ) : (
          <icons.PlayCircle
            className="music-section-control-icon"
            size="32"
            color="#FFFFFF"
            variant="Bold"
            onClick={() => PlaySong()}
          />
        )}

        <icons.Next
          className="music-section-control-icon"
          size="32"
          color="#FFFFFF"
          variant="Bold"
        />
        <icons.RepeateMusic
          className="music-section-control-icon"
          size="32"
          color="#FFFFFF"
          variant={isLoopingState.isLooping ? "Bold" : "Linear"}
        />
      </div>
    </div>
  );
};

export const MusicPlayer = ({ currentGuild, queueState }) => {
  const [currentPlaying, setCurrentPlaying] = useState<Queue>({} as Queue);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  useEffect(() => {
    if (!currentGuild.id) return;
    const updates = new EventSource(`/api/voices/${currentGuild.id}/updates`, {
      withCredentials: true,
    });
    updates.onmessage = (event) => {
      const update = event.data ? JSON.parse(event.data) : "null";
      if (update === "null") return;
      queueState.setQueue(update.queue ? update.queue : []);
      setCurrentPlaying(update.currentPlaying);
      setIsLooping(update.isLooping);
    };
  }, [currentGuild]);

  return (
    <div className="music-player">
      <MusicSection
        currentGuild={currentGuild}
        currentPlaying={currentPlaying}
        isLoopingState={{ isLooping, setIsLooping }}
      />
      <MusicQueue currentGuild={currentGuild} queue={queueState.queue} />
    </div>
  );
};
