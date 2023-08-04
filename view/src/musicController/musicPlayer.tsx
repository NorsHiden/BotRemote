import * as icons from "iconsax-react";

const MusicSection = () => {
  return (
    <div className="music-section">
      <div className="music-info">
        <div className="music-image"></div>
        <div className="music-text">
          <div className="music-title">Music Title</div>
          <div className="music-author">Music Author</div>
          <div className="music-3rd">Music views</div>
          <div className="music-3rd">00:00</div>
        </div>
      </div>
      <div className="music-section-control">
        <icons.Shuffle size="32" color="#FFFFFF" />
        <icons.Previous size="32" color="#FFFFFF" variant="Bold" />
        <icons.PlayCircle size="32" color="#FFFFFF" variant="Bold" />
        <icons.Next size="32" color="#FFFFFF" variant="Bold" />
        <icons.RepeateMusic size="32" color="#FFFFFF" />
      </div>
    </div>
  );
};

const MusicQueueSong = () => {
  return (
    <div className="queue-song">
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

const MusicQueue = () => {
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

export const MusicPlayer = () => {
  return (
    <div className="music-player">
      <MusicSection />
      <MusicQueue />
    </div>
  );
};
