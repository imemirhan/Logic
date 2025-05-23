import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { uploadResume, deleteResume } from "../store/slices/jobSeekerResumeSlice";
import {
  faPlus,
  faPen,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Select,
  Row,
  Col,
  Typography,
  Avatar,
  Button,
  Divider,
  Modal,
  Form,
  Input,
  Tooltip,
  Upload,
  Spin,
  Tag,
} from "antd";
import Swal from "sweetalert2";
import styles from "./styles/Profile.module.css";
import { setUser, updateJobSeekerInfo } from "../store/slices/userSlice";
import { addSkill, deleteSkill } from '../store/slices/skillsSlice';
import { addEducation, deleteEducation } from '../store/slices/educationSlice';
import { addExperience, deleteExperience } from '../store/slices/experienceSlice';
import { uploadJobSeekerImage } from "../store/slices/jobSeekerImageSlice";
import { getJobSeekerById } from "../store/slices/jobSeekerSlice";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

function Profile() {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const { resumeUrl, status: resumeStatus } = useSelector((state) => state.jobSeekerResume);
  const [resumeFile, setResumeFile] = useState(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const { skills } = useSelector((state) => state.skills);
  const { educations } = useSelector((state) => state.education);
  const { experiences } = useSelector((state) => state.experience);
  const { loading: imageLoading } = useSelector((state) => state.jobSeekerImage || {});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [form] = Form.useForm();

  // Avatar upload state
  const [avatarHover, setAvatarHover] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleEdit = () => {
    setIsModalOpen(true);
    setActiveModal("editProfile");
  };

  useEffect(() => {
    if (isModalOpen && activeModal === "editProfile" && user) {
      setTimeout(() => {
        form.setFieldsValue({
          name: user.name || "",
          lastName: user.lastName || "",
          aboutMe: user.aboutMe || "",
          linkedIn: user.linkedIn || "",
          gitHub: user.gitHub || "",
          twitter: user.twitter || "",
          facebook: user.facebook || "",
          instagram: user.instagram || "",
        });
      }, 0);
    }
  }, [isModalOpen, activeModal, user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (activeModal === "editProfile") {
        await dispatch(updateJobSeekerInfo({ jobSeekerId: user.id, data: values })).unwrap();
        Swal.fire({
          title: "Success!",
          text: "Your profile has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else if (activeModal === "Skill") {
        await dispatch(addSkill({
          jobSeekerId: user.id,
          title: values.title,
          description: values.description,
          skillType: Number(values.skillType),
        })).unwrap();
        Swal.fire({
          title: "Success!",
          text: "Skill added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else if (activeModal === "Experience") {
        await dispatch(addExperience({
          jobSeekerId: user.id,
          companyName: values.companyName,
          position: values.position,
          startDate: values.startDate,
          endDate: values.endDate,
        })).unwrap();
        Swal.fire({
          title: "Success!",
          text: "Experience added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else if (activeModal === "Education") {
        await dispatch(addEducation({
          jobSeekerId: user.id,
          schoolName: values.schoolName,
          degree: values.degree,
          fieldOfStudy: values.fieldOfStudy,
          startDate: values.startDate,
          endDate: values.endDate,
        })).unwrap();
        Swal.fire({
          title: "Success!",
          text: "Education added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      setIsModalOpen(false);
      setActiveModal(null);
      form.resetFields();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      Swal.fire({
        title: "No file selected",
        text: "Please select a resume to upload.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    try {
      var response = await dispatch(uploadResume({ jobSeekerId: user.id, file: resumeFile })).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Resume uploaded successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setIsResumeModalOpen(false);
      setResumeFile(null);
      await dispatch(setUser({ ...user, resumeUrl: response.data }));
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to upload resume. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleRemoveResume = async () => {
    try {
      await dispatch(deleteResume(user.id)).unwrap();
      Swal.fire({
        title: "Removed!",
        text: "Your resume has been removed.",
        icon: "success",
        confirmButtonText: "OK",
      });
      await dispatch(setUser({ ...user, resumeUrl: null }));
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to remove resume. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setActiveModal(null);
  };

  const openAddModal = (type) => {
    form.resetFields();
    setIsModalOpen(true);
    setActiveModal(type);
  };

  // Avatar upload logic
  const handleAvatarClick = () => {
    setIsAvatarModalOpen(true);
    setAvatarFile(null);
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      Swal.fire({
        title: "No file selected",
        text: "Please select an image to upload.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    try {
      await dispatch(uploadJobSeekerImage({ jobSeekerId: user.id, file: avatarFile })).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Profile picture updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setIsAvatarModalOpen(false);
      setAvatarFile(null);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to upload image. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const renderSectionHeader = (title, type) => (
    <Row justify="space-between" align="middle">
      <Col>
        <Title level={4}>{title}</Title>
      </Col>
      <Col>
        <Tooltip title={`Add ${type}`}>
          <Button
            type="text"
            icon={<FontAwesomeIcon icon={faPlus} style={{ fontSize: 18 }} />}
            onClick={() => openAddModal(type)}
          />
        </Tooltip>
      </Col>
    </Row>
  );  
  console.log("User:", user);

  // Modal form content based on activeModal
  const renderModalForm = () => {
    if (activeModal === "Skill") {
      return (
        <>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a skill title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item
            label="Skill Type"
            name="skillType"
            rules={[{ required: true, message: "Please select a skill type" }]}
            initialValue={0}
          >
            <Select>
              <Option value={0}>Intermediate</Option>
              <Option value={1}>Average</Option>
              <Option value={2}>Beginner</Option>
            </Select>
          </Form.Item>
        </>
      );
    }
    if (activeModal === "Education") {
      return (
        <>
          <Form.Item
            label="School Name"
            name="schoolName"
            rules={[{ required: true, message: "Please enter the school name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Degree"
            name="degree"
            rules={[{ required: true, message: "Please enter the degree" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Field of Study"
            name="fieldOfStudy"
            rules={[{ required: true, message: "Please enter the field of study" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Please select the start date" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: "Please select the end date" }]}
          >
            <Input type="date" />
          </Form.Item>
        </>
      );
    }
    if (activeModal === "Experience") {
      return (
        <>
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true, message: "Please enter the company name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: "Please enter the position" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Please select the start date" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: "Please select the end date" }]}
          >
            <Input type="date" />
          </Form.Item>
        </>
      );
    }
    // Default: edit profile
    return (
      <>
        <Form.Item label="First Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="About Me" name="aboutMe">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="LinkedIn" name="linkedIn">
          <Input />
        </Form.Item>
        <Form.Item label="GitHub" name="gitHub">
          <Input />
        </Form.Item>
        <Form.Item label="Twitter" name="twitter">
          <Input />
        </Form.Item>
        <Form.Item label="Facebook" name="facebook">
          <Input />
        </Form.Item>
        <Form.Item label="Instagram" name="instagram">
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <div className={styles.profileContainer}>
      <Card className={styles.profileCard}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={6} style={{ position: "relative" }}>
            <div
              className={styles.avatarWrapper}
              onMouseEnter={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
              style={{ width: 120, margin: "0 auto" }}
            >
              <Avatar
                size={120}
                src={user?.profileImageUrl || "https://picsum.photos/200/300"}
                alt={`${user.name} ${user.lastName}`}
                className={styles.avatar}
                style={{ border: "3px solid #e3eafc", boxShadow: "0 2px 8px #e3eafc" }}
              />
              {avatarHover && (
                <div
                  className={styles.avatarOverlay}
                  onClick={handleAvatarClick}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 120,
                    height: 120,
                    background: "rgba(30, 136, 229, 0.65)",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                >
                  <FontAwesomeIcon icon={faPen} style={{ fontSize: 22, marginBottom: 6 }} />
                  <span style={{ fontWeight: 500, fontSize: 15 }}>Upload Picture</span>
                </div>
              )}
            </div>
          </Col>
          <Col xs={24} sm={18} style={{ position: "relative" }}>
            <Title level={2} className={styles.profileName}>
              {user.name} {user.lastName}
            </Title>
            <Tooltip title={`Update Information`}>
              <div
                onClick={handleEdit}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  cursor: "pointer",
                  padding: "8px",
                }}
              >
                <FontAwesomeIcon icon={faPen} size="lg" />
              </div>
            </Tooltip>
            {user.aboutMe ? (
              <Paragraph className={styles.aboutMe}>{user.aboutMe}</Paragraph>
            ) : (
              <Paragraph className={styles.aboutMe}>No "About Me" information provided.</Paragraph>
            )}
          </Col>
        </Row>

        {/* Resume Section */}
        <Divider className={styles.divider} />
        <Title level={4}>Resume</Title>
        <div className={styles.sectionContent}>
          {user.resumeUrl ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Button
                type="primary"
                icon={<FontAwesomeIcon icon={faUpload} />}
                href={user.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center" }}
              >
                View Uploaded Resume
              </Button>
              <Button
                danger
                type="default"
                icon={<FontAwesomeIcon icon={faPen} />}
                onClick={handleRemoveResume}
                style={{ display: "flex", alignItems: "center" }}
                loading={resumeStatus === "loading"}
              >
                Remove Resume
              </Button>
            </div>
          ) : (
            <div>
              <Paragraph style={{ color: "#888" }}>
                You have not uploaded a resume yet.
              </Paragraph>
              <Button
                type="primary"
                icon={<FontAwesomeIcon icon={faUpload} />}
                onClick={() => setIsResumeModalOpen(true)}
              >
                Upload Resume
              </Button>
            </div>
          )}
        </div>

        <Modal
          title="Upload Resume"
          open={isResumeModalOpen}
          onOk={handleResumeUpload}
          onCancel={() => setIsResumeModalOpen(false)}
          okText="Upload"
          confirmLoading={resumeStatus === "loading"}
        >
          <Upload.Dragger
            accept=".pdf,.doc,.docx"
            beforeUpload={file => {
              setResumeFile(file);
              return false; // prevent auto upload
            }}
            showUploadList={resumeFile ? [{ name: resumeFile.name }] : false}
            fileList={resumeFile ? [resumeFile] : []}
            maxCount={1}
            style={{ marginBottom: 16 }}
          >
            <p className="ant-upload-drag-icon">
              <FontAwesomeIcon icon={faUpload} style={{ fontSize: 32, color: "#1976d2" }} />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Only PDF, DOC, and DOCX files are accepted.</p>
          </Upload.Dragger>
          {resumeFile && (
            <div style={{ marginTop: 12 }}>
              <Text type="secondary">Selected: {resumeFile.name}</Text>
            </div>
          )}
        </Modal>

        {/* Skills Section */}
        <Divider className={styles.divider} />
        {renderSectionHeader("Skills", "Skill")}
        <div className={styles.sectionContent}>
          {user.skills && user.skills.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {user.skills.map((skill, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#f4f8fd",
                    borderRadius: 8,
                    padding: "8px 16px",
                    marginBottom: 8,
                    boxShadow: "0 1px 4px #e3eafc",
                    minWidth: 220,
                    maxWidth: 340,
                  }}
                >
                  <Tag
                    className={styles.skillTag}
                    color="blue"
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      marginRight: 10,
                      marginBottom: 0,
                      padding: "4px 12px",
                      borderRadius: 6,
                    }}
                    closable
                    onClose={() => dispatch(deleteSkill(skill.id))}
                  >
                    {skill.title}
                  </Tag>
                  <div style={{ marginLeft: 6, flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#1976d2", fontWeight: 500 }}>
                      {typeof skill.skillType === "number" &&
                        ["Intermediate", "Average", "Beginner"][skill.skillType]}
                    </div>
                    {skill.description && (
                      <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                        {skill.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span style={{ color: "#888" }}>No skills added yet.</span>
          )}
        </div>

        {/* Education Section */}
        <Divider className={styles.divider} />
        {renderSectionHeader("Education", "Education")}
        <div className={styles.sectionContent}>
          {user.educations && user.educations.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {user.educations.map((edu, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#f4f8fd",
                    borderRadius: 8,
                    padding: "8px 16px",
                    marginBottom: 8,
                    boxShadow: "0 1px 4px #e3eafc",
                    minWidth: 220,
                    maxWidth: 400,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#1976d2" }}>
                      At: {edu.institution || "School"}
                      {edu.degree && <><br/> AGNO: {edu.degree}</>}
                    </div>
                    <div style={{ fontSize: 13, color: "#888" }}>
                      {edu.startYear && <>| {edu.startYear}</>}
                      {edu.graduationYear && <> - {edu.graduationYear}</>}
                    </div>
                  </div>
                  <Button
                    type="link"
                    danger
                    size="small"
                    onClick={() => dispatch(deleteEducation(edu.id))}
                    style={{ marginLeft: 8 }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <span style={{ color: "#888" }}>No education information added yet.</span>
          )}
        </div>

        {/* Experience Section */}
        <Divider className={styles.divider} />
        {renderSectionHeader("Experience", "Experience")}
        <div className={styles.sectionContent}>
          {user.experiences && user.experiences.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {user.experiences.map((exp, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#f4f8fd",
                    borderRadius: 8,
                    padding: "8px 16px",
                    marginBottom: 8,
                    boxShadow: "0 1px 4px #e3eafc",
                    minWidth: 220,
                    maxWidth: 400,
                  }}
                >
                  {console.log("Experience:", exp.id)}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#1976d2" }}>
                      Şirket: {exp.company || "Company"}
                      {exp.title && <><br/>Konum: {exp.title}</>}
                    </div>
                    <div style={{ fontSize: 13, color: "#888" }}>
                      {exp.years && <>Geçirilien yıl: {exp.years}</>}
                      {exp.endDate && <> - {exp.endDate}</>}
                    </div>
                  </div>
                  <Button
                    type="link"
                    danger
                    size="small"
                    onClick={() => dispatch(deleteExperience(exp.id))}
                    style={{ marginLeft: 8 }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <span style={{ color: "#888" }}>No experience information added yet.</span>
          )}
        </div>

        {/* Social Links */}
        <Divider className={styles.divider} />
        <Title level={4}>Social Media</Title>
        <div className={styles.socialLinks}>
          {user.linkedIn && (
            <a href={user.linkedIn} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} style={{ marginRight: 8, fontSize: "22px" }} />
            </a>
          )}
          {user.gitHub && (
            <a href={user.gitHub} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: 8, fontSize: "22px" }} />
            </a>
          )}
          {user.twitter && (
            <a href={user.twitter} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faXTwitter} style={{ marginRight: 8, fontSize: "22px", color: "black" }} />
            </a>
          )}
          {user.facebook && (
            <a href={user.facebook} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} style={{ marginRight: 8, fontSize: "22px" }} />
            </a>
          )}
          {user.instagram && (
            <a href={user.instagram} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} style={{ marginRight: 8, fontSize: "22px" }} />
            </a>
          )}
        </div>

        {/* Add/Edit Modal */}
        <Modal
          title={
            activeModal === "Skill"
              ? "Add Skill"
              : activeModal === "Education"
              ? "Add Education"
              : activeModal === "Experience"
              ? "Add Experience"
              : "Edit Profile"
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
          <Form form={form} layout="vertical">
            {renderModalForm()}
          </Form>
        </Modal>

        {/* Avatar Upload Modal */}
        <Modal
          title="Upload Profile Picture"
          open={isAvatarModalOpen}
          onOk={handleAvatarUpload}
          onCancel={() => setIsAvatarModalOpen(false)}
          okText="Upload"
          confirmLoading={imageLoading}
        >
          <div style={{ textAlign: "center" }}>
            <Upload.Dragger
              accept="image/*"
              beforeUpload={file => {
                setAvatarFile(file);
                return false; // prevent auto upload
              }}
              showUploadList={avatarFile ? [{ name: avatarFile.name }] : false}
              fileList={avatarFile ? [avatarFile] : []}
              maxCount={1}
              style={{ marginBottom: 16 }}
            >
              <p className="ant-upload-drag-icon">
                <FontAwesomeIcon icon={faUpload} style={{ fontSize: 32, color: "#1976d2" }} />
              </p>
              <p className="ant-upload-text">Click or drag image to this area to upload</p>
              <p className="ant-upload-hint">Only image files are accepted.</p>
            </Upload.Dragger>
            {avatarFile && (
              <div style={{ marginTop: 12 }}>
                <Text type="secondary">Selected: {avatarFile.name}</Text>
              </div>
            )}
          </div>
        </Modal>
      </Card>
    </div>
  );
}

export default Profile;