import * as icons from "iconsax-react";
import { MusicQueue } from "./musicQueue";
import { Queue } from "../types";
import { useEffect, useState } from "react";
import axios from "axios";
import { Guild } from "discord.js";

const MusicSection = ({ currentGuild }: { currentGuild: Guild }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  const PlaySong = () => {
    if (!currentGuild.id) return;
    axios.post(`/api/voices/${currentGuild.id}/play`).then(() => {
      setIsPlaying(true);
    });
  };

  const PauseSong = () => {
    if (!currentGuild.id) return;
    axios.post(`/api/voices/${currentGuild.id}/pause`).then(() => {
      setIsPlaying(false);
    });
  };

  useEffect(() => {
    if (!currentGuild.id) return;
    axios.get(`/api/voices/${currentGuild.id}/isPlaying`).then((res) => {
      setIsPlaying(res.data);
    });
  }, []);

  return (
    <div className="music-section">
      <div className="music-info">
        <div className="music-image"></div>
        <div className="music-text">
          <div className="music-title">Music Title</div>
          <div className="music-author">Music Author</div>
          <div className="music-3rd">123 456 789 views</div>
          <div className="music-3rd">00:00</div>
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
        {isPlaying ? (
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
          variant={isLooping ? "Bold" : "Linear"}
        />
      </div>
    </div>
  );
};

export const MusicPlayer = ({
  currentGuild,
  queue,
  removeSong,
}: {
  currentGuild: Guild;
  queue: Queue[];
  removeSong: Function;
}) => {
  return (
    <div className="music-player">
      <MusicSection currentGuild={currentGuild} />
      <MusicQueue queue={queue} removeSong={removeSong} />
    </div>
  );
};
