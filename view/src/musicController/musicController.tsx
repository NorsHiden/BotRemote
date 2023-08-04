import "./music_controller.css";
import { ChannelsSelect } from "./channelSelect";
import { Search } from "./Search";

const MusicPlayer = () => {
  return <div className="music-player">musicPlayer</div>;
};

export const MusicController = () => {
  return (
    <div className="music-controller">
      <div className="player-search">
        <MusicPlayer />
        <div className="channels-search">
          <ChannelsSelect />
          <Search />
        </div>
      </div>
    </div>
  );
};
