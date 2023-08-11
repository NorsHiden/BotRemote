import * as icons from "iconsax-react";
import { Queue } from "../types";
import axios from "axios";

const MusicQueueSong = ({ currentGuild, song, songId }) => {
  const removeSong = (songId: number) => {
    axios.delete(`/api/voices/${currentGuild.id}/queue?index=${songId}`);
  };
  let songState = null;
  if (song.state === "PLAYING")
    songState = <icons.Sound className="queue-num" size="28" color="#636363" />;
  else if (song.state === "PAUSED")
    songState = (
      <icons.Pause
        className="queue-num"
        size="20"
        color="#636363"
        variant="Bold"
      />
    );
  else songState = <div className="queue-num">{songId + 1}</div>;

  return (
    <div
      className={
        song.state === "PLAYING" || song.state === "PAUSED"
          ? "queue-selected-song"
          : "queue-song"
      }
    >
      {songState}
      <img className="queue-song-image" src={song.thumbnail}></img>
      <div className="queue-song-text">
        <div className="queue-song-title">{song.title}</div>
        <div className="queue-song-author">{song.author}</div>
      </div>
      <div className="queue-song-duration">
        <icons.Clock size="16" color="#636363" />
        <p>{song.duration}</p>
      </div>
      <button
        className="queue-song-remove"
        onClick={() => {
          removeSong(songId);
        }}
      >
        <icons.Trash size="20" color="#636363" />
      </button>
    </div>
  );
};

export const MusicQueue = ({ currentGuild, queue }) => {
  return (
    <div className="music-queue">
      {queue.map((song: Queue, index: number) => (
        <MusicQueueSong
          key={index}
          currentGuild={currentGuild}
          song={song}
          songId={index}
        />
      ))}
    </div>
  );
};
