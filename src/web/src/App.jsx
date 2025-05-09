import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JobSeekerProfile from "./pages/JobSeekerProfile";
import EmployerProfile from "./pages/EmployerProfile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Browse from "./pages/Browse";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import JobDetails from "./pages/JobDetails";
import JobApply from "./pages/JobApply";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state) => state.userSlice.user);
  const isLoggedIn = user !== null;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            user?.role === 1 ? <EmployerProfile /> : <JobSeekerProfile />
          }
        />
        <Route 
        path="/signup"
        element={<Signup />} />
        <Route 
        path="/login" 
        element={<Login />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/:id" element={<JobDetails />} />
        <Route
          path="/browse/:jobId/apply"
          element={
            <ProtectedRoute>
              <JobApply />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
