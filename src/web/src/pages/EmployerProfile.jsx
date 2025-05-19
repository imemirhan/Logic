import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Row,
  Col,
  Typography,
  Avatar,
  Divider,
  Button,
  Modal,
  Form,
  Input,
  Tooltip,
  Upload,
} from "antd";
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
import Swal from "sweetalert2";
import { updateEmployerInfo } from "../store/slices/userSlice";
import { uploadEmployerImage } from "../store/slices/employerImageSlice";
import styles from "./styles/EmployerProfile.module.css";

const { Title, Paragraph, Text, Link } = Typography;

function EmployerProfile() {
  const { user } = useSelector((state) => state.userSlice);
  const { loading: imageLoading } = useSelector((state) => state.employerImage || {});
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [form] = Form.useForm();

  // Pre-fill form fields when modal opens
  useEffect(() => {
    if (isModalOpen && user) {
      setTimeout(() => {
        form.setFieldsValue({
          name: user.name || "",
          surname: user.surname || "",
          companyName: user.companyName || "",
          industry: user.industry || "",
          description: user.description || "",
          linkedIn: user.linkedIn || "",
          gitHub: user.gitHub || "",
          twitter: user.twitter || "",
          facebook: user.facebook || "",
          instagram: user.instagram || "",
          websiteUrl: user.websiteUrl || "",
        });
      }, 0);
    }
  }, [isModalOpen, user, form]);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await dispatch(updateEmployerInfo({ employerId: user.id, data: values })).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Your profile has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setIsModalOpen(false);
    } catch (error) {
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
      await dispatch(uploadEmployerImage({ employerId: user.id, file: avatarFile })).unwrap();
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

  return (
    <div className={styles.profileContainer}>
      <Card className={styles.profileCard}>
        {/* Edit Icon */}
        <Tooltip title="Update Information">
          <div
            onClick={handleEdit}
            style={{
              position: "absolute",
              top: 60,
              right: 35,
              fontSize: "24px",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </div>
        </Tooltip>

        {/* Employer Header */}
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
                alt={user.companyName || "Company Logo"}
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
          <Col xs={24} sm={18}>
            <Title level={2} className={styles.profileName}>
              {user.companyName || "Company Name"}
            </Title>
            <Paragraph>
              <Text strong>Industry:</Text> {user.industry || "N/A"}
            </Paragraph>
            <Paragraph>
              <Text strong>Description:</Text> {user.description || "No description provided."}
            </Paragraph>
          </Col>
        </Row>

        <Divider />

        {/* Social Media Links */}
        <Row>
          <Col span={24}>
            <Title level={4}>Social Media</Title>
            <div className={styles.socialLinks}>
              {user.facebook && (
                <Link href={user.facebook} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} style={{ marginRight: 8, fontSize: "24px" }} />
                </Link>
              )}
              {user.twitter && (
                <Link href={user.twitter} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faXTwitter} style={{ marginRight: 8, fontSize: "24px", color: "black" }} />
                </Link>
              )}
              {user.instagram && (
                <Link href={user.instagram} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} style={{ marginRight: 8, fontSize: "24px" }} />
                </Link>
              )}
              {user.linkedIn && (
                <Link href={user.linkedIn} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} style={{ marginRight: 8, fontSize: "24px" }} />
                </Link>
              )}
              {user.gitHub && (
                <Link href={user.gitHub} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} style={{ marginRight: 8, fontSize: "24px", color: "black" }} />
                </Link>
              )}
              {user.websiteUrl && (
                <Link href={user.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <Button type="link" style={{ fontSize: "18px", padding: 0 }}>Website</Button>
                </Link>
              )}
            </div>
          </Col>
        </Row>
      </Card>

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
          <Form.Item label="Last Name" name="surname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Company Name" name="companyName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Industry" name="industry">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
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
          <Form.Item label="Website URL" name="websiteUrl">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EmployerProfile;