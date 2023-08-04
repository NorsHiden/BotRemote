import * as icons from "iconsax-react";

export const ChannelsSelect = () => {
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
