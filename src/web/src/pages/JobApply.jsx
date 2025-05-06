import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleJob } from "../store/slices/singleJobSlice";
import { getEmployerById } from "../store/slices/singleEmployerSlice";
import { createJobApplication, clearJobApplicationState } from "../store/slices/jobApplicationSlice";
import { Form, Input, Button, Card, Row, Col, Typography, Avatar, Divider } from "antd";
import Swal from "sweetalert2";
import styles from "./styles/JobApply.module.css";

const { Title, Paragraph, Text } = Typography;

const JobApply = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { job, status: jobStatus } = useSelector((state) => state.singleJobSlice);
  const { applicationStatus, applicationError } = useSelector((state) => state.jobApplication);
  const { employer, status: employerStatus } = useSelector((state) => state.singleEmployerSlice);
  const { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(getSingleJob(jobId));
  }, [dispatch, jobId]);

  useEffect(() => {
    if (job?.job?.employerId) {
      dispatch(getEmployerById(job.job.employerId));
    }
  }, [dispatch, job]);

  const onFinish = (values) => {
    dispatch(createJobApplication({ ...values, jobId, employerId: employer?.id, jobSeekerId: user.id }));
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

  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]} style={{ minHeight: "100vh" }}>
        {/* Left Side: Job Details */}
        <Col xs={24} md={12}>
          <Card
            title="Job Details"
            loading={jobStatus === "loading"}
            className={styles.jobDetails}
          >
            {job?.job ? (
              <>
                <Title level={3}>{job.job.title}</Title>
                <div className={styles.employerInfo}>
                  <Avatar
                    size={64}
                    src={employer?.profileImageUrl || "https://via.placeholder.com/64"}
                    alt="Employer Profile"
                  />
                  <div className={styles.employerDetails}>
                    <Text strong>{employer?.companyName || "Unknown Employer"}</Text>
                    <Paragraph>{employer?.industry || "No industry information"}</Paragraph>
                    <Paragraph>{employer?.description || "No description available"}</Paragraph>
                  </div>
                </div>
                <Divider />
                <Paragraph>
                  <Text strong>Location:</Text> {job.job.location}
                </Paragraph>
                <Paragraph>
                  <Text strong>Type:</Text> {job.job.eType === 0 ? "Full-Time" : "Part-Time"}
                </Paragraph>
                <Paragraph>
                  <Text strong>Remote:</Text> {job.job.isRemote ? "Yes" : "No"}
                </Paragraph>
                <Paragraph>
                  <Text strong>Salary:</Text> {job.job.salaryRange ? `$${job.job.salaryRange}k` : "Not disclosed"}
                </Paragraph>
                <Paragraph>
                  <Text strong>Posted Date:</Text> {new Date(job.job.postedDate).toLocaleDateString()}
                </Paragraph>
                <Paragraph>
                  <Text strong>Expiration Date:</Text> {new Date(job.job.expirationDate).toLocaleDateString()}
                </Paragraph>
              </>
            ) : (
              <Paragraph>Loading job details...</Paragraph>
            )}
          </Card>
        </Col>

        {/* Right Side: Job Application Form */}
        <Col xs={24} md={12}>
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
                <Input.TextArea rows={6} placeholder="Write your cover letter here" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={applicationStatus === "loading"}
                  block
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