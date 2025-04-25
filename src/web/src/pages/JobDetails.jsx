import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleJob } from "../store/slices/singleJobSlice";
import { getEmployerById } from "../store/slices/singleEmployerSlice";
import { Card, Row, Col, Button, Typography, Divider, Avatar } from "antd";
import styles from "./styles/JodDetails.module.css";

const { Title, Paragraph, Text, Link } = Typography;

function JobDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { job, status, error } = useSelector((state) => state.singleJobSlice);
  const { employer, status: employerStatus, error: employerError } = useSelector((state) => state.singleEmployerSlice);

  useEffect(() => {
    if (id) {
      dispatch(getSingleJob(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (job && job.job && job.job.employerId) {
      dispatch(getEmployerById(job.job.employerId));
    }
  }, [dispatch, job]);

  // Handle loading, error, and no job found
  if (status === "loading" || employerStatus === "loading") return <p className={styles.message}>Loading job details...</p>;
  if (status === "failed") return <p className={styles.message}>Error: {error}</p>;
  if (!job || !job.job) return <p className={styles.message}>Job not found.</p>;

  return (
    <div className={styles.jobDetailsContainer}>
      <Card className={styles.jobCard}>
        {/* Job Title and Employer */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={2} className={styles.jobTitle}>{job.job.title}</Title>
            <Text className={styles.jobCompany}>
              {employer ? employer.companyName || `${employer.name} ${employer.surname}` : "Unknown Employer"}
            </Text>
          </Col>
        </Row>

        {/* Job Details */}
        <Row gutter={[16, 16]} className={styles.jobDetails}>
          <Col xs={24} sm={12}>
            <Paragraph>
              <Text strong>Location:</Text> {job.job.location}
            </Paragraph>
            <Paragraph>
              <Text strong>Type:</Text> {job.job.eType === 1 ? "Full-Time" : "Part-Time"}
            </Paragraph>
            <Paragraph>
              <Text strong>Remote:</Text> {job.job.isRemote ? "Yes" : "No"}
            </Paragraph>
          </Col>
          <Col xs={24} sm={12}>
            <Paragraph>
              <Text strong>Salary Range:</Text> ${job.job.salaryRange}k
            </Paragraph>
            <Paragraph>
              <Text strong>Applicants:</Text> {job.job.applicantCount}
            </Paragraph>
            <Paragraph>
              <Text strong>Posted Date:</Text> {new Date(job.job.postedDate).toLocaleDateString()}
            </Paragraph>
            <Paragraph>
              <Text strong>Expiration Date:</Text> {new Date(job.job.expirationDate).toLocaleDateString()}
            </Paragraph>
          </Col>
        </Row>

        <Divider />

        {/* Job Description */}
        <Row>
          <Col span={24}>
            <Title level={4}>Job Description</Title>
            <Paragraph>{job.job.description}</Paragraph>
          </Col>
        </Row>

        <Divider />

        {/* Employer Details */}
        {employer && (
          <>
            <Row>
              <Col span={24}>
                <Title level={4}>About the Employer</Title>
              </Col>
            </Row>
            <Row gutter={[16, 16]} className={styles.employerDetails}>
              <Col xs={24} sm={6}>
                <Avatar
                  size={100}
                  src={employer.profileImageUrl || "https://via.placeholder.com/100"}
                  alt={`${employer.name} ${employer.surname}`}
                />
              </Col>
              <Col xs={24} sm={18}>
                <Paragraph>
                  <Text strong>Company Name:</Text> {employer.companyName || "N/A"}
                </Paragraph>
                <Paragraph>
                  <Text strong>Industry:</Text> {employer.industry || "N/A"}
                </Paragraph>
                <Paragraph>
                  <Text strong>Description:</Text> {employer.description || "No description available."}
                </Paragraph>
                <Paragraph>
                  <Text strong>Website:</Text>{" "}
                  {employer.websiteUrl ? (
                    <Link href={employer.websiteUrl} target="_blank">
                      {employer.websiteUrl}
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </Paragraph>
              </Col>
            </Row>

            {/* Social Media Links */}
            <Row gutter={[16, 16]} className={styles.socialLinks}>
              <Col>
                {employer.facebook && (
                  <Link href={employer.facebook} target="_blank">
                    Facebook
                  </Link>
                )}
              </Col>
              <Col>
                {employer.twitter && (
                  <Link href={employer.twitter} target="_blank">
                    Twitter
                  </Link>
                )}
              </Col>
              <Col>
                {employer.instagram && (
                  <Link href={employer.instagram} target="_blank">
                    Instagram
                  </Link>
                )}
              </Col>
              <Col>
                {employer.linkedIn && (
                  <Link href={employer.linkedIn} target="_blank">
                    LinkedIn
                  </Link>
                )}
              </Col>
              <Col>
                {employer.gitHub && (
                  <Link href={employer.gitHub} target="_blank">
                    GitHub
                  </Link>
                )}
              </Col>
            </Row>
          </>
        )}

        <Divider />

        {/* Apply Button */}
        <Row justify="center">
          <Col>
            <Button type="primary" size="large" className={styles.applyButton}>
              Apply to Job
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default JobDetails;