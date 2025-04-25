import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Browse from "./pages/Browse"; // Assuming Browse is same as Home
import About from "./pages/About";  // New About page
import Contact from "./pages/Contact";  // New Contact page
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound"; // 404 page
import JobDetails from "./pages/JobDetails"; // Assuming this is the job details page

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/browse" element={<Browse />} /> {/* Assuming Browse is same as Home */}
        <Route path="/browse/:id" element={<JobDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> {/* 404 Route */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
