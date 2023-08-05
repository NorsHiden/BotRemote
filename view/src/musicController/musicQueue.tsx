import * as icons from "iconsax-react";

const MusicQueueSong = () => {
  return (
    <div className="queue-song">
      <div className="queue-num">1</div>
      <div className="queue-song-image"></div>
      <div className="queue-song-text">
        <div className="queue-song-title">Music Title</div>
        <div className="queue-song-author">Music Author</div>
      </div>
      <div className="queue-song-view">
        <icons.Eye size="16" color="#636363" />
        <p>123 456 789</p>
      </div>
      <div className="queue-song-duration">
        <icons.Clock size="16" color="#636363" />
        <p>00:00</p>
      </div>
    </div>
  );
};

export const MusicQueue = () => {
  return (
    <div className="music-queue">
      <MusicQueueSong />
      <MusicQueueSong />
      <MusicQueueSong />
      <MusicQueueSong />
      <MusicQueueSong />
    </div>
  );
};
