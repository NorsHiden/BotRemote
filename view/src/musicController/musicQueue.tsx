import * as icons from "iconsax-react";

const MusicQueueSong = ({ song }: { song: any }) => {
  return (
    <div className="queue-song">
      <div className="queue-num">1</div>
      <div className="queue-song-image"></div>
      <div className="queue-song-text">
        <div className="queue-song-title">song.title</div>
        <div className="queue-song-author">song.author</div>
      </div>
      <div className="queue-song-view">
        <icons.Eye size="16" color="#636363" />
        <p>song.views</p>
      </div>
      <div className="queue-song-duration">
        <icons.Clock size="16" color="#636363" />
        <p>song.duration</p>
      </div>
    </div>
  );
};

export const MusicQueue = ({ queue }: { queue: any[] }) => {
  return (
    <div className="music-queue">
      {queue.map((song: any) => (
        <MusicQueueSong song={song} />
      ))}
    </div>
  );
};
