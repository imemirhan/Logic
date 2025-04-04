import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} /> 
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
