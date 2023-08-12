import * as icons from "iconsax-react";
import { MusicQueue } from "./musicQueue";
import { Queue } from "../types";
import { useEffect, useState } from "react";
import axios from "axios";
import { Guild } from "../types";

interface MusicPlayerProps {
  currentGuild: Guild;
  currentPlaying: Queue;
  isLoopingState: {
    isLooping: boolean;
    setIsLooping: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const MusicSection = ({
  currentGuild,
  currentPlaying,
  isLoopingState,
}: MusicPlayerProps) => {
  const PlaySong = () => {
    if (!currentGuild.id) return;
    axios.post(`/api/voices/${currentGuild.id}/play`);
  };

  const PauseSong = () => {
    if (!currentGuild.id) return;
    axios.post(`/api/voices/${currentGuild.id}/pause`);
  };

  const NextSong = () => {
    if (!currentGuild.id) return;
    axios.post(`/api/voices/${currentGuild.id}/skip`);
  };

  const PreviousSong = () => {
    if (!currentGuild.id) return;
    axios.post(`/api/voices/${currentGuild.id}/previous`);
  };

  const ShuffleSongs = () => {
    if (!currentGuild.id) return;
    axios.post(`/api/voices/${currentGuild.id}/shuffle`);
  };

  const LoopSongs = () => {
    if (!currentGuild.id) return;
    axios.post(`/api/voices/${currentGuild.id}/loop`);
  };

  return (
    <div className="music-section">
      <div className="music-info">
        {currentPlaying.thumbnail ? (
          <img className="music-image" src={currentPlaying.thumbnail}></img>
        ) : (
          <div className="music-image"></div>
        )}
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
          onClick={() => ShuffleSongs()}
        />
        <icons.Previous
          className="music-section-control-icon"
          size="32"
          color="#FFFFFF"
          variant="Bold"
          onClick={() => PreviousSong()}
        />
        {currentPlaying.state == "PLAYING" ? (
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
          onClick={() => NextSong()}
        />
        <icons.RepeateMusic
          className="music-section-control-icon"
          size="32"
          color="#FFFFFF"
          variant={isLoopingState.isLooping ? "Bold" : "Linear"}
          onClick={() => LoopSongs()}
        />
      </div>
    </div>
  );
};

interface MusicQueueProps {
  currentGuild: Guild;
  queueState: {
    queue: Queue[];
    setQueue: React.Dispatch<React.SetStateAction<Queue[]>>;
  };
}

export const MusicPlayer = ({ currentGuild, queueState }: MusicQueueProps) => {
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
