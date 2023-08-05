import * as icons from "iconsax-react";
import { MusicQueue } from "./musicQueue";

const MusicSection = () => {
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
        />
        <icons.Previous
          className="music-section-control-icon"
          size="32"
          color="#FFFFFF"
          variant="Bold"
        />
        <icons.PlayCircle
          className="music-section-control-icon"
          size="32"
          color="#FFFFFF"
          variant="Bold"
        />
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
        />
      </div>
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
