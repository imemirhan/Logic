import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleJob } from "../store/slices/singleJobSlice";
import { createJobApplication, clearJobApplicationState } from "../store/slices/jobApplicationSlice";
import { Form, Input, Button, Card, Row, Col, notification } from "antd";
import Swal from "sweetalert2";
import styles from "./styles/JobApply.module.css";

const JobApply = () => {
  const { jobId } = useParams(); // Access jobId from URL params
  const dispatch = useDispatch();

  const { job, status: jobStatus } = useSelector((state) => state.singleJobSlice);
  const { applicationStatus, applicationError } = useSelector((state) => state.jobApplication);
  const { employer, status: employerStatus, error: employerError } = useSelector((state) => state.singleEmployerSlice);

  useEffect(() => {
    dispatch(getSingleJob(jobId));
  }, [dispatch, jobId]);

  useEffect(() => {
    if (job?.job?.employerId) {
      dispatch(getEmployerById(job.job.employerId));
    }
  }, [dispatch, job]); // Only trigger when job data changes

  // Handle form submission (creating a job application)
  const onFinish = (values) => {
    dispatch(createJobApplication({ ...values, jobId }));
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
      });
    } else if (applicationStatus === "failed") {
      Swal.fire({
        title: "Application Failed",
        text: applicationError || "An error occurred while submitting your application.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  }, [applicationStatus, applicationError, dispatch]);

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
                    <p><strong>Industry:</strong> {employer?.industry}</p>
                    <p><strong>Description:</strong> {employer?.description}</p>
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
              initialValues={{ name: "", email: "", coverLetter: "" }}
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please enter your full name" }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>
  
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
  
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
