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

export const MusicPlayer = () => {
  return (
    <div className="music-player">
      <MusicSection />
      <div className="music-queue">MusicQueue</div>
    </div>
  );
};
