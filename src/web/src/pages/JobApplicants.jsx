import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplicationsByEmployerId, updateJobApplication } from "../store/slices/jobApplicationSlice";
import { createInterview } from "../store/slices/interviewSlice";
import { useParams, useNavigate } from "react-router-dom";
import {
  List, Card, Typography, Spin, Alert, Tag, Avatar, Divider, Modal, Form, Input, DatePicker, Select, Button, message
} from "antd";
import { createJobSeekerNotification } from "../store/slices/notificationSlice";
import styles from "./styles/JobApplicants.module.css";
import GoBack from "../components/GoBack";
import Skill from "../components/Skill";
import Education from "../components/Education";
import Experience from "../components/Experience";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faGithub,
  faXTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
const { Option } = Select;
const { Title, Paragraph, Text } = Typography;

const statusLabels = {
  0: { text: "Submitted", color: "gold" },
  1: { text: "Under Review", color: "green" },
  2: { text: "Interview Scheduled", color: "red" },
  3: { text: "Interview Completed", color: "red" },
  4: { text: "Offered", color: "red" },
  5: { text: "Rejected", color: "red" },
};

function JobApplicants() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showInterviewFields, setShowInterviewFields] = useState(false);
  const [interviewLink, setInterviewLink] = useState("");
  const [interviewDate, setInterviewDate] = useState(null);

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

  const handleEvaluate = (app) => {
    setSelectedApp(app);
    setModalVisible(true);
    setShowInterviewFields(app.status === 2);
    setInterviewLink("");
    setInterviewDate(null);
    form.setFieldsValue({
      coverLetter: app.coverLetter || "",
      status: app.status ?? 0,
      interviewScheduledDate: app.interviewScheduledDate ? dayjs(app.interviewScheduledDate) : null,
      interviewNotes: app.interviewNotes || "",
      employerFeedback: app.employerFeedback || "",
    });
  };

  const handleModalOk = async () => {
  try {
    setLoading(true);
    const values = await form.validateFields();

    // If status is Interview Scheduled (2), create interview and notification (forInterview)
    if (values.status === 2) {
      if (!interviewLink || !interviewDate) {
        message.error("Please provide both interview link and date.");
        setLoading(false);
        return;
      }
      // Create interview
      const interview = await dispatch(
        createInterview({
          jobId: selectedApp?.jobId,  
          employerId: user?.id,
          jobSeekerId: selectedApp?.jobSeekerId,
          interViewLink: interviewLink,
          interviewScheduledDate: interviewDate.toISOString(),
        })
      ).unwrap();

      await dispatch(
        createJobSeekerNotification({
          jobId: selectedApp?.jobId,
          employerId: user?.id,
          jobSeekerId: selectedApp?.jobSeekerId,
          forStatus: false,
          forInterview: true,
          interviewId: interview?.id || interview?.data?.id,
        })
      );
      message.success("Interview scheduled!");
    } else {
      // For any other status change, create notification for status
      await dispatch(
        createJobSeekerNotification({
          jobId: selectedApp?.jobId,
          jobSeekerId: selectedApp?.jobSeekerId,
          employerId: user?.id,
          status: values.status,
          forStatus: true,
          forInterview: false,
        })
      );
    }

    // Always update the job application (but don't send interviewLink/interviewDate)
    await dispatch(updateJobApplication({
      id: selectedApp.id,
      updateData: {
        coverLetter: values.coverLetter,
        status: values.status,
      }
    })).unwrap();

    message.success("Application updated!");
    setModalVisible(false);
    setSelectedApp(null);
    setLoading(false);
    dispatch(fetchApplicationsByEmployerId(user.id));
  } catch (err) {
    setLoading(false);
    message.error("Failed to update application.");
  }
};

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedApp(null);
    setShowInterviewFields(false);
    setInterviewLink("");
    setInterviewDate(null);
    form.resetFields();
  };
  return (
    <>
      <div className={styles.applicantsWrapper}>
        <GoBack />
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
                                <Education
                                  institution={edu.institution || "Institution"}
                                  degree={edu.degree || "Degree"}
                                  startYear={edu.startYear || "Start Year"}
                                  endYear={edu.graduationYear || "End Year"}
                                > 
                                </Education>
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
                                <Experience
                                  company={exp.company || "Company"}
                                  title={exp.title || "Title"}
                                  years={exp.years}
                                >
                                  </Experience>
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
                              <div key={idx}>
                                <Skill
                                  title={skill.title}
                                  description={skill.description}
                                  skillType={skill.skillType}
                                  ></Skill>
                              </div>
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
                              <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: 20, marginRight: 8 }} />
                            </a>
                          )}
                          {seeker.gitHub && (
                            <>
                              <a href={seeker.gitHub} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faGithub} style={{ fontSize: 20, marginRight: 8, color: "black" }} />
                              </a>
                            </>
                          )}
                          {seeker.twitter && (
                            <>
                              <a href={`https://twitter.com/${seeker.twitter}`} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faXTwitter} style={{ fontSize: 20, marginRight: 8, color: "black" }} />
                              </a>
                            </>
                          )}
                          {seeker.instagram && (
                            <>
                              <a href={`https://instagram.com/${seeker.instagram}`} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} style={{ fontSize: 20, marginRight: 8, color: "white", backgroundColor: "black" }} />
                              </a>
                            </>
                          )}
                          {seeker.instagram && (
                            <>
                              <a href={`https://facebook.com/${seeker.facebook}`} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} style={{ fontSize: 20, marginRight: 8 }} />
                              </a>
                            </>
                          )}
                          {!seeker.linkedIn && !seeker.gitHub && !seeker.twitter && !seeker.facebook && !seeker.instagram && (
                            <span style={{ color: "#888" }}>No social links.</span>
                          )}
                        </div>
                        <Divider style={{ margin: "12px 0" }} />
                        <div className={styles.applicantField}>
                          <Text strong>Employer:</Text>{" "}
                          {app.employer?.companyName || "-"}
                        </div>
                        <Button type="primary" onClick={() => handleEvaluate(app)} style={{ marginTop: 12 }}>
                          Evaluate
                        </Button>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              );
            }}
          />
        )}
      </div>
      <Modal
        open={modalVisible}
        title="Evaluate Applicant"
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={loading}
        okText="Save"
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Cover Letter" name="coverLetter">
            <Input.TextArea rows={2} disabled />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select
              onChange={(value) => {
                setShowInterviewFields(value === 2);
                if (value !== 2) {
                  setInterviewLink("");
                  setInterviewDate(null);
                }
              }}
            >
              <Option value={0}>Submitted</Option>
              <Option value={1}>Under Review</Option>
              <Option value={2}>Interview Scheduled</Option>
              <Option value={3}>Interview Completed</Option>
              <Option value={4}>Offered</Option>
              <Option value={5}>Rejected</Option>
            </Select>
          </Form.Item>
          {showInterviewFields && (
            <>
              <Form.Item
                label="Interview Link"
                required
                rules={[{ required: true, message: "Please enter the interview link" }]}
              >
                <Input
                  value={interviewLink}
                  onChange={e => setInterviewLink(e.target.value)}
                  placeholder="Enter interview link"
                />
              </Form.Item>
              <Form.Item
                label="Interview Date"
                required
                rules={[{ required: true, message: "Please select the interview date" }]}
              >
                <DatePicker
                  showTime
                  value={interviewDate}
                  onChange={setInterviewDate}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default JobApplicants;