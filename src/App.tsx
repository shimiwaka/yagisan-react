import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import MyPage from "./components/MyPage";
import Box from "./components/Box";
import Confirm from "./components/Confirm";
import Logout from "./components/Logout";
import Question from "./components/Question";

function App() {
  return (
    <div className="App">
      <div className="Header">
        <Link to="/">ゆうびんやぎさん</Link>
      </div>
      <hr />
      <div className="Menu">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/box/:username" element={<Box />} />
          <Route path="/confirm/:token" element={<Confirm />} />
          <Route path="/question/:token" element={<Question />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
      <hr />
      <div className="Small">
        このサービスはβ版です / 作者 : 末路ちゃん(<a href="https://twitter.com/nemucure">@nemucure</a>) 
      </div>
    </div>
  );
}

export default App;
