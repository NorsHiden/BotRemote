import "./music_controller.css";
import * as icons from "iconsax-react";

const ChannelsSelect = () => {
  return (
    <div className="channels">
      <div className="channel-select">
        <icons.VolumeHigh size="32" color="#636363" className="channel-icon" />
        <div className="channel-name">Select a channel...</div>
        <icons.ArrowDown2
          size="20"
          color="#636363"
          className="channel-dropdown-icon"
        />
      </div>
      <div className="channel-join">
        <icons.Login size="32" color="#636363" />
      </div>
    </div>
  );
};

export const MusicController = () => {
  return (
    <div className="music-controller">
      <div className="player-search">
        <div className="music-player">musicPlayer</div>
        <div className="channels-search">
          <ChannelsSelect />
          <div className="search">search</div>
        </div>
      </div>
    </div>
  );
};
