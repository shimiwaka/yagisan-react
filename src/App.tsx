import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import MyPage from "./components/MyPage";
import Box from "./components/Box";

function App() {
  return (
    <div className="App">
      <div className="Header">ゆうびんやぎさん</div>
      <hr />
      <div className="Menu">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/box/:username" element={<Box />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
      <hr />
      作者:末路ちゃん このサービスはβ版です
    </div>
  );
}

export default App;
