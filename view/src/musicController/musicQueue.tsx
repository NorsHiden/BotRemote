import * as icons from "iconsax-react";
import { Queue } from "../types";

const MusicQueueSong = ({
  song,
  songId,
  removeSong,
}: {
  song: Queue;
  songId: number;
  removeSong: Function;
}) => {
  return (
    <div className="queue-song">
      <div className="queue-num">{songId}</div>
      <img className="queue-song-image" src={song.thumbnail}></img>
      <div className="queue-song-text">
        <div className="queue-song-title">{song.title}</div>
        <div className="queue-song-author">{song.author}</div>
      </div>
      <div className="queue-song-duration">
        <icons.Clock size="16" color="#636363" />
        <p>{song.duration}</p>
      </div>
      <button className="queue-song-remove" onClick={() => removeSong(song)}>
        <icons.Trash size="20" color="#636363" />
      </button>
    </div>
  );
};

export const MusicQueue = ({
  queue,
  removeSong,
}: {
  queue: Queue[];
  removeSong: Function;
}) => {
  return (
    <div className="music-queue">
      {queue.map((song: Queue, index: number) => (
        <MusicQueueSong
          key={index}
          song={song}
          songId={index}
          removeSong={removeSong}
        />
      ))}
    </div>
  );
};
