import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
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
} from "antd";
import Swal from "sweetalert2";
import styles from "./styles/Profile.module.css";
import { updateJobSeekerInfo } from "../store/slices/userSlice";

const { Title, Paragraph, Link } = Typography;

function Profile() {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [form] = Form.useForm();

  const handleEdit = () => {
    form.setFieldsValue({ ...user });
    setIsModalOpen(true);
    setActiveModal("editProfile");
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await dispatch(
        updateJobSeekerInfo({ jobSeekerId: user.id, data: values })
      ).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Your profile has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setIsModalOpen(false);
      setActiveModal(null);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update your profile. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setActiveModal(null);
  };

  const openAddModal = (type) => {
    form.resetFields();
    setIsModalOpen(true);
    setActiveModal(type);
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
          <Col xs={24} sm={6}>
            <Avatar
              size={120}
              src={user?.profileImageUrl || "https://picsum.photos/200/300"}
              alt={`${user.name} ${user.lastName}`}
            />
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

        <Divider />

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
            </div>
          </Col>
        </Row>

        <Divider />

        <Row justify="center">
          <Col>
            {user.resumeUrl ? (
              <Button type="primary" href={user.resumeUrl} target="_blank">
                View Resume
              </Button>
            ) : (
              <Paragraph>No resume uploaded yet.</Paragraph>
            )}
          </Col>
        </Row>

        <Divider />

        {/* Skills Section */}
        {renderSectionHeader("Skills", "Skill")}
        <Paragraph>{user.skills.length > 0 ? user.skills.join(", ") : "No skills added yet."}</Paragraph>

        <Divider />

        {/* Experiences Section */}
        {renderSectionHeader("Experience", "Experience")}
        {user.experiences.length > 0 ? (
          user.experiences.map((exp, i) => (
            <Paragraph key={i}>{exp.title || "Experience info"}</Paragraph>
          ))
        ) : (
          <Paragraph>No experience added yet.</Paragraph>
        )}

        <Divider />

        {/* Education Section */}
        {renderSectionHeader("Education", "Education")}
        {user.educations.length > 0 ? (
          user.educations.map((edu, i) => (
            <Paragraph key={i}>{edu.schoolName || "Education info"}</Paragraph>
          ))
        ) : (
          <Paragraph>No education added yet.</Paragraph>
        )}
      </Card>

      <Modal
        title={`Add ${activeModal === "editProfile" ? "Profile" : activeModal}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          {activeModal === "editProfile" && (
            <>
              <Form.Item label="Name" name="name" rules={[{ required: true }]}> <Input /> </Form.Item>
              <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}> <Input /> </Form.Item>
              <Form.Item label="About Me" name="aboutMe"> <Input.TextArea rows={4} /> </Form.Item>
              <Form.Item label="LinkedIn" name="linkedIn"> <Input /> </Form.Item>
              <Form.Item label="GitHub" name="gitHub"> <Input /> </Form.Item>
              <Form.Item label="Twitter" name="twitter"> <Input /> </Form.Item>
              <Form.Item label="Facebook" name="facebook"> <Input /> </Form.Item>
              <Form.Item label="Instagram" name="instagram"> <Input /> </Form.Item>
            </>
          )}
          {activeModal === "Skill" && (
            <Form.Item label="Skill" name="skill" rules={[{ required: true }]}> <Input /> </Form.Item>
          )}
          {activeModal === "Experience" && (
            <>
              <Form.Item label="Job Title" name="title" rules={[{ required: true }]}> <Input /> </Form.Item>
              <Form.Item label="Company" name="company"> <Input /> </Form.Item>
              <Form.Item label="Description" name="description"> <Input.TextArea rows={3} /> </Form.Item>
            </>
          )}
          {activeModal === "Education" && (
            <>
              <Form.Item label="School Name" name="schoolName" rules={[{ required: true }]}> <Input /> </Form.Item>
              <Form.Item label="Degree" name="degree"> <Input /> </Form.Item>
              <Form.Item label="Field of Study" name="field"> <Input /> </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
}

export default Profile;
