import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplicationsByEmployerId } from "../store/slices/jobApplicationSlice";
import { useParams } from "react-router-dom";
import { List, Card, Typography, Spin, Alert, Tag, Avatar, Divider } from "antd";
import styles from "./styles/JobApplicants.module.css";

const { Title, Paragraph, Text } = Typography;

const statusLabels = {
  0: { text: "Pending", color: "gold" },
  1: { text: "Accepted", color: "green" },
  2: { text: "Rejected", color: "red" },
};

function JobApplicants() {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const { user } = useSelector((state) => state.userSlice);
  const {
    applicationsByEmployer,
    employerApplicationsStatus,
    employerApplicationsError,
  } = useSelector((state) => state.jobApplication);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchApplicationsByEmployerId(user.id));
    }
  }, [dispatch, user]);

  if (employerApplicationsStatus === "loading") {
    return (
      <div style={{ minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (employerApplicationsError) {
    return <Alert type="error" message={employerApplicationsError} />;
  }

  // Defensive: handle undefined or unexpected structure
  const jobApplicationsArr = Array.isArray(applicationsByEmployer?.jobApplications)
    ? applicationsByEmployer.jobApplications
    : [];

  const jobApplicants = jobApplicationsArr.filter(app => String(app.jobId) === String(jobId));

  return (
    <div className={styles.applicantsWrapper}>
      <Title level={2} className={styles.title}>Applicants for This Job</Title>
      {jobApplicants.length === 0 ? (
        <Paragraph className={styles.emptyText}>
          No one has applied to this job yet.
        </Paragraph>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={jobApplicants}
          renderItem={app => {
            const seeker = app.jobSeeker || {};
            const profileImage = seeker.profileImageUrl
              ? seeker.profileImageUrl
              : `https://picsum.photos/200/300?random=${seeker.id || Math.random()}`;
            return (
              <List.Item>
                <Card className={styles.applicantCard}>
                  <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                    {/* Left: Profile and Main Info */}
                    <div style={{ minWidth: 120, textAlign: "center" }}>
                      <Avatar
                        className={styles.avatar}
                        src={profileImage}
                        size={100}
                      />
                      <div className={styles.applicantField}>
                        <Text strong>Name:</Text>{" "}
                        {seeker.name || "-"} {seeker.lastName || seeker.surname || ""}
                      </div>
                      <div className={styles.applicantField}>
                        <Text strong>Status:</Text>{" "}
                        <Tag
                        className={styles.statusTag} 
                        color={statusLabels[app.status]?.color || "default"}>
                          {statusLabels[app.status]?.text || "Unknown"}
                        </Tag>
                      </div>
                      <div className={styles.applicantField}>
                        <Text strong>Applied At:</Text>{" "}
                        {app.createdAt ? new Date(app.createdAt).toLocaleString() : "N/A"}
                      </div>
                    </div>
                    {/* Right: Details */}
                    <div style={{ flex: 1 }}>
                      <div className={styles.applicantField}>
                        <Text strong>Cover Letter:</Text>{" "}
                        {app.coverLetter || <span style={{ color: "#888" }}>No cover letter provided.</span>}
                      </div>
                      <div className={styles.applicantField}>
                        <Text strong>Resume:</Text>{" "}
                        {seeker.resumeUrl ? (
                          <a href={seeker.resumeUrl} target="_blank" rel="noopener noreferrer">
                            View Resume
                          </a>
                        ) : (
                          <span style={{ color: "#888" }}>No resume uploaded.</span>
                        )}
                      </div>
                      <div className={styles.applicantField}>
                        <Text strong>About:</Text>{" "}
                        {seeker.aboutMe || <span style={{ color: "#888" }}>-</span>}
                      </div>
                      <Divider style={{ margin: "12px 0" }}>Education</Divider>
                      <div className={styles.applicantField}>
                        {Array.isArray(seeker.educations) && seeker.educations.length > 0 ? (
                          seeker.educations.map((edu, idx) => (
                            <div key={idx}>
                              <Text strong>{edu.schoolName || "School"}</Text>
                              {edu.degree && <> - {edu.degree}</>}
                              {edu.fieldOfStudy && <> ({edu.fieldOfStudy})</>}
                              {edu.startDate && <> | {edu.startDate}</>}
                              {edu.endDate && <> - {edu.endDate}</>}
                            </div>
                          ))
                        ) : (
                          <span style={{ color: "#888" }}>Applicant didn't enter any education information.</span>
                        )}
                      </div>
                      <Divider style={{ margin: "12px 0" }}>Experience</Divider>
                      <div className={styles.applicantField}>
                        {Array.isArray(seeker.experiences) && seeker.experiences.length > 0 ? (
                          seeker.experiences.map((exp, idx) => (
                            <div key={idx}>
                              <Text strong>{exp.companyName || "Company"}</Text>
                              {exp.position && <> - {exp.position}</>}
                              {exp.startDate && <> | {exp.startDate}</>}
                              {exp.endDate && <> - {exp.endDate}</>}
                            </div>
                          ))
                        ) : (
                          <span style={{ color: "#888" }}>Applicant didn't enter any experience information.</span>
                        )}
                      </div>
                      <Divider style={{ margin: "12px 0" }}>Skills</Divider>
                      <div className={styles.applicantField}>
                        {Array.isArray(seeker.skills) && seeker.skills.length > 0 ? (
                          seeker.skills.map((skill, idx) => (
                            <Tag
                            className={styles.skillTag} 
                            key={idx} color="blue" style={{ marginBottom: 4 }}>{skill}</Tag>
                          ))
                        ) : (
                          <span style={{ color: "#888" }}>Applicant didn't enter any skills information.</span>
                        )}
                      </div>
                      <Divider
                      className={styles.divider} 
                      style={{ margin: "12px 0" }}>Socials</Divider>
                      <div className={styles.socialLinks}>
                        {seeker.linkedIn && (
                          <a href={seeker.linkedIn} target="_blank" rel="noopener noreferrer">
                            LinkedIn
                          </a>
                        )}
                        {seeker.gitHub && (
                          <>
                            {" | "}
                            <a href={seeker.gitHub} target="_blank" rel="noopener noreferrer">
                              GitHub
                            </a>
                          </>
                        )}
                        {seeker.twitter && (
                          <>
                            {" | "}
                            <a href={`https://twitter.com/${seeker.twitter}`} target="_blank" rel="noopener noreferrer">
                              Twitter
                            </a>
                          </>
                        )}
                        {!seeker.linkedIn && !seeker.gitHub && !seeker.twitter && (
                          <span style={{ color: "#888" }}>No social links.</span>
                        )}
                      </div>
                      <Divider style={{ margin: "12px 0" }} />
                      <div className={styles.applicantField}>
                        <Text strong>Employer:</Text>{" "}
                        {app.employer?.companyName || "-"}
                      </div>
                    </div>
                  </div>
                </Card>
              </List.Item>
            );
          }}
        />
      )}
    </div>
  );
}

export default JobApplicants;