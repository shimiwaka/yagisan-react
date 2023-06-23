import React from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Register from './components/Register'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <div className="Header">
        ゆうびんやぎさん
      </div>
      <hr />
      <div className="Menu">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
