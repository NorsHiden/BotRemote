import axios from "axios";
import { useState } from "react";
import Select from "react-select";

const joinOrLeaveChannel = (isJoined, setIsJoined, selectedChannel) => {
  const guildId = window.location.pathname.slice(1);
  if (isJoined === "Join") {
    axios
      .post(`/api/voice-channel/join`, {
        guildId: guildId,
        channelId: selectedChannel,
      })
      .then((res) => {
        if (res.data.statusCode == 200) setIsJoined("Leave");
      });
  } else {
    axios
      .post(`/api/voice-channel/leave`, {
        guildId: guildId,
      })
      .then((res) => {
        if (res.data.statusCode == 200) setIsJoined("Join");
      });
  }
};

const checkIsJoined = (e, setIsJoined, setSelectedChannel) => {
  const guildId = window.location.pathname.slice(1);
  axios
    .post(`/api/voice-channel/current-channel`, {
      guildId: guildId,
    })
    .then((res) => {
      if (res.data.channelId == e.value) setIsJoined("Leave");
      else setIsJoined("Join");
      setSelectedChannel(e.value);
    })
    .catch((err) => {
      if (err.response.status === 401) window.location.href = "/login";
      else console.log(err);
    });
};

export const SelectChannel = ({ channels }) => {
  const [isJoined, setIsJoined] = useState("Join");
  const [selectedChannel, setSelectedChannel] = useState(null);
  return (
    <div className="selectchannel">
      <h5 className="selectchannel-title">select Channel</h5>
      <Select
        className="selectchannel-select"
        options={channels.map((channel) => ({
          value: channel.id,
          label: channel.name,
        }))}
        onChange={(e) => checkIsJoined(e, setIsJoined, setSelectedChannel)}
      />
      <button
        className="selectchannel-btn"
        onClick={() =>
          joinOrLeaveChannel(isJoined, setIsJoined, selectedChannel)
        }
      >
        {isJoined}
      </button>
    </div>
  );
};
