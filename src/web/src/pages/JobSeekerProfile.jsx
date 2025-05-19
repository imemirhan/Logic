import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

// Solid icons (UI icons like plus, pen, upload)
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
} from "antd";
import Swal from "sweetalert2";
import styles from "./styles/Profile.module.css";
import { setUser, updateJobSeekerInfo } from "../store/slices/userSlice";
import { addSkill, deleteSkill } from '../store/slices/skillsSlice';
import { addEducation, deleteEducation } from '../store/slices/educationSlice';
import { addExperience, deleteExperience } from '../store/slices/experienceSlice';
import { uploadJobSeekerImage } from "../store/slices/jobSeekerImageSlice";

const { Title, Paragraph, Text, Link } = Typography;

function Profile() {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
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
  const uploadInputRef = useRef();

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
        handleAddSkill(values);
      } else if (activeModal === "Experience") {
        handleAddExperience(values);
      } else if (activeModal === "Education") {
        handleAddEducation(values);
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
      // Optionally, refresh user info here
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
            {/* Edit Icon in Top Right */}
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

        {/* Skills Section */}
        <Divider className={styles.divider} />
        {renderSectionHeader("Skills", "Skill")}
        <div className={styles.sectionContent}>
          {skills && skills.length > 0 ? (
            skills.map((skill, idx) => (
              <Tag
                className={styles.skillTag}
                key={idx}
                color="blue"
                closable
                onClose={() => dispatch(deleteSkill(skill.id))}
              >
                {skill.name}
              </Tag>
            ))
          ) : (
            <span style={{ color: "#888" }}>No skills added yet.</span>
          )}
        </div>

        {/* Education Section */}
        <Divider className={styles.divider} />
        {renderSectionHeader("Education", "Education")}
        <div className={styles.sectionContent}>
          {educations && educations.length > 0 ? (
            educations.map((edu, idx) => (
              <div key={idx} className={styles.educationItem}>
                <Text strong>{edu.schoolName || "School"}</Text>
                {edu.degree && <> - {edu.degree}</>}
                {edu.fieldOfStudy && <> ({edu.fieldOfStudy})</>}
                {edu.startDate && <> | {edu.startDate}</>}
                {edu.endDate && <> - {edu.endDate}</>}
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
            ))
          ) : (
            <span style={{ color: "#888" }}>No education information added yet.</span>
          )}
        </div>

        {/* Experience Section */}
        <Divider className={styles.divider} />
        {renderSectionHeader("Experience", "Experience")}
        <div className={styles.sectionContent}>
          {experiences && experiences.length > 0 ? (
            experiences.map((exp, idx) => (
              <div key={idx} className={styles.experienceItem}>
                <Text strong>{exp.companyName || "Company"}</Text>
                {exp.position && <> - {exp.position}</>}
                {exp.startDate && <> | {exp.startDate}</>}
                {exp.endDate && <> - {exp.endDate}</>}
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
            ))
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

        {/* Edit Modal */}
        <Modal
          title="Edit Profile"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
          <Form form={form} layout="vertical">
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

      {/* ...rest of your modals and sections... */}
      {/* (Keep your skills, experience, education, and edit modals as before) */}
    </div>
  );
}

export default Profile;