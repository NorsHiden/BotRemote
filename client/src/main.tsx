import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  return (
    <div className="center">
      <h1 className="title">Login</h1>
      <a href="/api/oauth" className="btn">
        Continue with Discord
      </a>
    </div>
  );
};

const Options = ({ guilds }: { guilds: any[] }) => {
  return guilds.map((guild) => {
    return (
      <option key={guild.id} value={guild.id}>
        {guild.name}
      </option>
    );
  });
};

const GuildSelector = () => {
  const [guilds, setGuilds] = useState([]);

  const handleSelectChange = (e: any) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    axios
      .get("/api/user/common-guilds")
      .then((res) => {
        setGuilds(res.data);
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  return (
    <div className="guild_selector">
      <div className="guild_name">Guilds</div>
      <select name="guilds" onChange={handleSelectChange} className="selector">
        <Options guilds={guilds} />
      </select>
    </div>
  );
};

const Home = () => {
  return (
    <div className="center">
      <div className="container">
        <GuildSelector />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </>
);
