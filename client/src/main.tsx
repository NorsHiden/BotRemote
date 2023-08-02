import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./LoginPage";
import "./styles.css";
import { SelectGuild } from "./SelectGuild";
import { SelectChannel } from "./SelectChannel";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const QueueList = ({ queue }) => {
  return (
    <div className="queue">
      {queue.length > 0 ? (
        queue.map((song) => (
          <div className="queue-song-playing" key={song.id}>
            <div className="queue-song-title">{song.title}</div>
          </div>
        ))
      ) : (
        <div className="empty-queue">Empty Queue</div>
      )}

      {/* <div className="queue-song">
        <div className="queue-song-title">Song Title</div>
      </div>
      <div className="queue-song-playing">
        <div className="queue-song-title">Song Title</div>
      </div> */}
    </div>
  );
};

const AddToQueue = () => {
  const inputRef = useRef(null);
  const [queue, setQueue] = useState([]);
  const [playing, setPlaying] = useState(null);

  const addtoQueueCall = () => {
    axios
      .post("/api/voice-channel/add", {
        guildId: window.location.pathname.slice(1),
        url: inputRef.current?.value,
      })
      .then((res) => {
        setQueue(res.data.song);
        inputRef.current.value = "";
      })
      .catch((err) => {});
  };

  useEffect(() => {
    axios
      .post("/api/voice-channel/playlist", {
        guildId: window.location.pathname.slice(1),
      })
      .then((res) => {
        setQueue(res.data.playlist);
        console.log(res.data);
      });
  }, []);

  return (
    <div>
      <div className="flex-gap">
        <input ref={inputRef} type="text" />
        <button className="music-add-btn" onClick={addtoQueueCall}>
          Add To Queue
        </button>
      </div>
      <QueueList queue={queue} />
    </div>
  );
};

const SongInfo = () => {
  return (
    <div className="song-info">
      <div className="song-picture"></div>
      <div>
        <div className="song-title">Song Title</div>
        <div className="song-author">Song Author</div>
      </div>
    </div>
  );
};

const PlayerController = () => {
  return (
    <div className="controller-player">
      <SongInfo />
      <div>
        <button className="button-pattern">Previous</button>
        <button className="button-pattern">Play</button>
        <button className="button-pattern">Stop</button>
        <button className="button-pattern">Next</button>
      </div>
    </div>
  );
};

const MusicPlayer = () => {
  return (
    <div className="center">
      <div className="queue-player">
        <PlayerController />
        <AddToQueue />
      </div>
    </div>
  );
};

const ControlMusic = () => {
  const guildId = window.location.pathname.slice(1);
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/guild/${guildId}/voice-channels`)
      .then((res) => {
        setChannels(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) window.location.href = "/login";
        else console.log(err);
      });
  }, []);
  return (
    <div className="center">
      <div className="music-container">
        <h1 className="title">Music Control</h1>
        <div className="music-control">
          <SelectChannel channels={channels} />
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectGuild />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:guildId" element={<ControlMusic />} />
      </Routes>
    </BrowserRouter>
  </>
);
