import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/slices/userSlice";
import { getSingleJob } from "../store/slices/singleJobSlice";
import { getEmployerById } from "../store/slices/singleEmployerSlice";
import { createJobApplication, clearJobApplicationState } from "../store/slices/jobApplicationSlice";
import { Form, Input, Button, Card, Row, Col, notification } from "antd";
import Swal from "sweetalert2";
import styles from "./styles/JobApply.module.css";

const JobApply = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { job, status: jobStatus } = useSelector((state) => state.singleJobSlice);
  const { applicationStatus, applicationError } = useSelector((state) => state.jobApplication);
  const { employer, status: employerStatus, error: employerError } = useSelector((state) => state.singleEmployerSlice);
  const { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(getSingleJob(jobId));
  }, [dispatch, jobId]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (job?.job?.employerId) {
      dispatch(getEmployerById(job.job.employerId));
    }
  }, [dispatch, job]);
  console.log("Current User:", user);
  const onFinish = (values) => {
    dispatch(createJobApplication({ ...values, jobId, employerId: employer?.id, jobSeekerId: user.id })); //TODO => This will be replaced with the actual job seeker ID from the auth state
  };

  useEffect(() => {
    if (applicationStatus === "succeeded") {
      Swal.fire({
        title: "Application Submitted",
        text: "Your job application has been submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        dispatch(clearJobApplicationState());
        navigate("/browse");
      });
    } else if (applicationStatus === "failed") {
      Swal.fire({
        title: "Application Failed",
        text: applicationError || "An error occurred while submitting your application.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  }, [applicationStatus, applicationError, dispatch, navigate]);
  console.log("Employer:", employer);
  console.log(applicationStatus);
  return (
    <div className={styles.container}>
      <Row gutter={24} style={{ height: "100vh" }}>
        {/* Left Side: Job Details */}
        <Col span={12}>
          <Card
            title="Job Details"
            loading={jobStatus === "loading"}
            className={styles.jobDetails}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {job?.job ? (
              <>
                <h2>{job.job.title}</h2>
                
                {/* Employer Data Below Title */}
                <div className={styles.employerInfo}>
                  <div className={styles.employerImage}>
                    {employer?.profileImageUrl ? (
                      <img
                        src={employer.profileImageUrl}
                        alt="Employer Profile"
                        className={styles.employerProfileImg}
                      />
                    ) : (
                      <div className={styles.employerProfileImgPlaceholder}>
                        {employer?.name?.[0]}
                      </div>
                    )}
                  </div>
                  <div className={styles.employerDetails}>
                    <h3>{employer?.companyName}</h3>
                    <p>{employer?.industry}</p>
                    <p>{employer?.description}</p>
                  </div>
                </div>
  
                <p style={{ fontStyle: "italic", color: "#999" }}>
                  {job.job.isRemote ? "Remote" : "On-site"} |{" "}
                  {job.job.eType === 0 ? "Full-Time" : "Part-Time"}
                </p>
                <p>
                  <strong>Description:</strong> {job.job.description}
                </p>
                <p>
                  <strong>Location:</strong> {job.job.location}
                </p>
                <p>
                  <strong>Salary:</strong> {job.job.salary ? `$${job.job.salary}` : "Not disclosed"}
                </p>
                <p>
                  <strong>Post Date:</strong> {new Date(job.job.postedDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Expiration Date:</strong> {new Date(job.job.expirationDate).toLocaleDateString()}
                </p>
              </>
            ) : (
              <p>Loading job details...</p>
            )}
          </Card>
        </Col>
  
        {/* Right Side: Job Application Form */}
        <Col span={12}>
          <Card title="Apply for this Job" className={styles.applicationForm}>
            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ coverLetter: "" }}
            >
              <Form.Item
                label="Cover Letter"
                name="coverLetter"
                rules={[{ required: true, message: "Please enter a cover letter" }]}
              >
                <Input.TextArea rows={4} placeholder="Write your cover letter here" />
              </Form.Item>
  
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={applicationStatus === "loading"}
                >
                  Submit Application
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default JobApply;
