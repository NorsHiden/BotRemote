import axios from "axios";
import * as icons from "iconsax-react";
import { useEffect, useState } from "react";
import { Guild } from "../types";

interface Channel {
  id: string;
  name: string;
}

interface ChannelItemProps {
  channel: Channel;
  sets: {
    setSelectedChannel: (channel: Channel) => void;
    setIsOpen: (isOpen: boolean) => void;
  };
}

const ChannelItem = ({ channel, sets }: ChannelItemProps) => {
  const onTriggered = () => {
    sets.setSelectedChannel(channel);
    sets.setIsOpen(false);
  };

  return (
    <button className="channel-item" onClick={onTriggered}>
      <div className="channel-item-icon">
        <icons.VolumeHigh size="16" color="#636363" />
      </div>
      <div>{channel.name}</div>
    </button>
  );
};

export const ChannelsSelect = ({ currentGuild }: { currentGuild: Guild }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel>(
    {} as Channel
  );
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isJoined, setIsJoined] = useState(false);

  const dropDownHandler = () => {
    setIsOpen(!isOpen);
  };

  const joinOrLeave = () => {
    if (!selectedChannel) return;
    if (isJoined) {
      axios
        .post(`/api/voices/${currentGuild.id}/${selectedChannel.id}/leave`)
        .then(() => {
          setIsJoined(false);
        });
    } else {
      axios
        .post(`/api/voices/${currentGuild.id}/${selectedChannel.id}/join`)
        .then(() => {
          setIsJoined(true);
        });
    }
  };

  useEffect(() => {
    if (!selectedChannel || !currentGuild.id) return;
    axios.get(`/api/voices/${currentGuild.id}/current-voice`).then((res) => {
      if (!res.data.channelId) return setIsJoined(false);
      setIsJoined(res.data.channelId === selectedChannel.id);
    });
  }, [selectedChannel, currentGuild]);

  useEffect(() => {
    if (!currentGuild.id) return;
    axios.get(`/api/guilds/${currentGuild.id}/voices`).then((res) => {
      setChannels(res.data);
    });
  }, [currentGuild]);
  return (
    <div className="channels">
      <div className="channel-select">
        <button className="channel-button" onClick={dropDownHandler}>
          <icons.VolumeHigh
            size="32"
            color="#636363"
            className="channel-icon"
          />
          <div className="channel-name">
            {selectedChannel.name
              ? selectedChannel.name
              : "Select a channel..."}
          </div>
          <icons.ArrowDown2
            size="20"
            color="#636363"
            className="channel-dropdown-icon"
          />
        </button>
        {isOpen ? (
          <div className="channel-dropdown">
            {channels.map((channel) => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                sets={{ setSelectedChannel, setIsOpen }}
              />
            ))}
          </div>
        ) : null}
      </div>
      <button
        className={isJoined ? "channel-leave" : "channel-join"}
        onClick={joinOrLeave}
      >
        {isJoined ? (
          <icons.Logout size="32" color="#2f2f2f" variant="Bold" />
        ) : (
          <icons.Login size="32" color="#636363" />
        )}
      </button>
    </div>
  );
};
