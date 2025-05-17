import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobApplicationsByJobSeeker } from "../store/slices/getJobApplicationsSlice";
import { Card, Row, Col, Tag, Avatar, Typography, Spin, Tooltip, Button, Divider } from "antd";
import { FilePdfOutlined, LinkedinOutlined, GithubOutlined, FacebookOutlined, TwitterOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const statusMap = {
  0: { color: "blue", text: "Pending" },
  1: { color: "green", text: "Accepted" },
  2: { color: "red", text: "Rejected" },
  3: { color: "orange", text: "Interview Scheduled" },
};

function AppliedJobs() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const { applications, status, error } = useSelector(
  (state) => state.getJobApplications
);

  useEffect(() => {
    if (user?.id) {
      dispatch(getJobApplicationsByJobSeeker(user.id));
    }
  }, [dispatch, user]);
  console.log("Applications:", applications);
  if (status === "loading") {
    return (
      <div style={{ minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (status === "failed") {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (!applications || applications.length === 0) {
    return <div style={{ textAlign: "center", marginTop: 48 }}>You haven't applied to any jobs yet.</div>;
  }

  return (
    <div style={{ padding: 32 }}>
      <Title level={2}>My Job Applications</Title>
      <Row gutter={[24, 24]}>
        {applications.jobApplications.map((app) => (
          <Col xs={24} key={app.id}>
            <Card
              title={
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Avatar
                    size={56}
                    src={app.employer?.profileImageUrl}
                    style={{ backgroundColor: "#e6f7ff", color: "#1890ff" }}
                  >
                    {app.employer?.companyName?.[0] || "?"}
                  </Avatar>
                  <div>
                    <Text strong style={{ fontSize: 18 }}>{app.employer?.companyName}</Text>
                    <div>
                      <Tag color="geekblue">{app.employer?.industry}</Tag>
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <Tag color={statusMap[app.status]?.color || "default"}>
                      {statusMap[app.status]?.text || "Unknown"}
                    </Tag>
                  </div>
                </div>
              }
              bordered
              style={{ boxShadow: "0 2px 12px #f0f1f2" }}
            >
              <Row gutter={16}>
                <Col xs={24} md={16}>
                  <Title level={4} style={{ marginBottom: 0 }}>
                    Application Details
                  </Title>
                  <Paragraph>
                    <Text strong>Applied On:</Text>{" "}
                    {new Date(app.createdAt).toLocaleString()}
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Cover Letter:</Text> {app.coverLetter}
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Status:</Text>{" "}
                    <Tag color={statusMap[app.status]?.color || "default"}>
                      {statusMap[app.status]?.text || "Unknown"}
                    </Tag>
                  </Paragraph>
                  {app.interviewScheduledDate && (
                    <Paragraph>
                      <Text strong>Interview Date:</Text>{" "}
                      {new Date(app.interviewScheduledDate).toLocaleString()}
                    </Paragraph>
                  )}
                  {app.interviewNotes && (
                    <Paragraph>
                      <Text strong>Interview Notes:</Text> {app.interviewNotes}
                    </Paragraph>
                  )}
                  {app.employerFeedback && (
                    <Paragraph>
                      <Text strong>Employer Feedback:</Text> {app.employerFeedback}
                    </Paragraph>
                  )}
                  <Divider />
                  <Title level={5} style={{ marginBottom: 0 }}>
                    Employer Contact
                  </Title>
                  <Paragraph>
                    <Text strong>Contact Person:</Text>{" "}
                    {app.employer?.name} {app.employer?.surname}
                  </Paragraph>
                  {app.employer?.websiteUrl && (
                    <Paragraph>
                      <a href={app.employer.websiteUrl} target="_blank" rel="noopener noreferrer">
                        Company Website
                      </a>
                    </Paragraph>
                  )}
                  <div style={{ display: "flex", gap: 12 }}>
                    {app.employer?.linkedIn && (
                      <Tooltip title="LinkedIn">
                        <a href={app.employer.linkedIn} target="_blank" rel="noopener noreferrer">
                          <LinkedinOutlined style={{ fontSize: 20 }} />
                        </a>
                      </Tooltip>
                    )}
                    {app.employer?.gitHub && (
                      <Tooltip title="GitHub">
                        <a href={app.employer.gitHub} target="_blank" rel="noopener noreferrer">
                          <GithubOutlined style={{ fontSize: 20 }} />
                        </a>
                      </Tooltip>
                    )}
                    {app.employer?.twitter && (
                      <Tooltip title="Twitter">
                        <a href={app.employer.twitter} target="_blank" rel="noopener noreferrer">
                          <TwitterOutlined style={{ fontSize: 20 }} />
                        </a>
                      </Tooltip>
                    )}
                    {app.employer?.facebook && (
                      <Tooltip title="Facebook">
                        <a href={app.employer.facebook} target="_blank" rel="noopener noreferrer">
                          <FacebookOutlined style={{ fontSize: 20 }} />
                        </a>
                      </Tooltip>
                    )}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default AppliedJobs;