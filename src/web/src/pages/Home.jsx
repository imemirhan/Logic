import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployers } from "../store/slices/employerSlice";
import { getJobSeekers } from "../store/slices/jobSeekerSlice";

function Home() {
  const dispatch = useDispatch();

  // Get employer and job seeker data from Redux store
  const { employers, employerStatus, employerError } = useSelector((state) => state.employers);
  const { jobSeekers, jobSeekerStatus, jobSeekerError } = useSelector((state) => state.jobSeekers);

  // Fetch data when component mounts
  useEffect(() => {
    dispatch(getEmployers());
    dispatch(getJobSeekers());
  }, {dispatch});

  // Log state values
  console.log("Job Seekers State:", jobSeekers);

  if (employerStatus === "loading" || jobSeekerStatus === "loading") {
    return <p>Loading...</p>;
  }

  if (employerStatus === "failed" || jobSeekerStatus === "failed") {
    return <p>Error: {employerError || jobSeekerError}</p>;
  }

  return (
    <div>
      <h1>Available Employers</h1>
      <ul>
        {employers && employers.length > 0 ? (
          employers.map((employer) => (
            <li key={employer.id}>
              {employer.name}
            </li>
          ))
        ) : (
          <p>No Employers Found</p>
        )}
      </ul>

      <h1>Job Seekers</h1>
      <ul>
        {jobSeekers && jobSeekers.length > 0 ? (
          jobSeekers.map((jobSeeker) => (
            <li key={jobSeeker.id}>
              {jobSeeker.name}
            </li>
          ))
        ) : (
          <p>No Job Seekers Found</p>
        )}
      </ul>
    </div>
  );
}

export default Home;
