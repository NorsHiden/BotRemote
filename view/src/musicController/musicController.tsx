import "./music_controller.css";
import { ChannelsSelect } from "./channelSelect";
import { Search } from "./Search";
import { MusicPlayer } from "./musicPlayer";

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
