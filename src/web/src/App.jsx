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
import AppliedJobs from "./pages/AppliedJobs";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateJob from "./pages/CreateJob";
import JobPostings from "./pages/JobPostings";
import JobApplicants from "./pages/JobApplicants";
import Notifications from "./pages/Notifications";
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
            user?.role === 1 ? <EmployerProfile />
            : user?.role === 0 ? <JobSeekerProfile />
            : <NotFound />
          }
        />
        <Route
          path="/profile/applications"
          element={
            user?.role === 0 ? <AppliedJobs /> : <NotFound />
          }
        />
        <Route
          path="/notifications"
          element={
            user?.role === 0 ? <ProtectedRoute><Notifications /></ProtectedRoute> : <NotFound />
          }
        />
        <Route
          path="/createjob"
          element={
            user?.role === 1 ? <CreateJob /> : <NotFound />
          }
        />
        <Route
          path="/mypostings"
          element={
            user?.role === 1 ? <JobPostings /> : <NotFound />
          }
          />
        <Route
          path="/mypostings/:jobId"
          element={
            user?.role === 1 ? <JobApplicants /> : <NotFound />
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
