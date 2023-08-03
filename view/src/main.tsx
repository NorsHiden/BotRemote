import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./navBar/navBar";
import { Menu } from "./menu/menu";
import { MusicController } from "./musicController/musicController";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="container">
      <div className="crop-container">
        <NavBar />
        <div className="wrapper">
          <Menu />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MusicController />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  </React.StrictMode>
);
