import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login_Page/Login.jsx";
import Dashboard from "./components/Home_Page/Dashboard.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* When path is "/", show the Login component and is the first thing loaded when its started*/}
        <Route path="/" element={<Login />} />

        {/* When path is "/dashboard", show the Dashboard component and is shown after a successful login*/}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
