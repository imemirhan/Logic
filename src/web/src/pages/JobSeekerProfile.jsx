import React, { useState } from "react";
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
} from "antd";
import Swal from "sweetalert2";
import styles from "./styles/Profile.module.css";
import { updateJobSeekerInfo } from "../store/slices/userSlice"; // adjust the path if needed

const { Title, Paragraph, Text, Link } = Typography;

function Profile() {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    form.setFieldsValue({ ...user });
    setIsModalOpen(true);
  };
  console.log(user);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await dispatch(updateJobSeekerInfo({ jobSeekerId: user.id, data: values })).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Your profile has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setIsModalOpen(false);
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
  };
  console.log("Jobs: " + user.jobSeeker);
  return (
    <div className={styles.profileContainer}>
      <Card className={styles.profileCard}>
        {/* Profile Header */}
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={6}>
            <Avatar
              size={120}
              src={user?.profileImageUrl || "https://picsum.photos/200/300"}
              alt={`${user.name} ${user.lastName}`}
            />
          </Col>
          <Col xs={24} sm={18}>
            <Title level={2} className={styles.profileName}>
              {user.name} {user.lastName}
            </Title>
            <Button type="primary" onClick={handleEdit}>
              Edit Profile
            </Button>
            {user.aboutMe ? (
              <Paragraph className={styles.aboutMe}>{user.aboutMe}</Paragraph>
            ) : (
              <Paragraph className={styles.aboutMe}>No "About Me" information provided.</Paragraph>
            )}
          </Col>
        </Row>

        <Divider />

        {/* Social Media Links */}
        <Row>
          <Col span={24}>
            <Title level={4}>Social Media</Title>
            <div className={styles.socialLinks}>
              {user.facebook && <Link href={user.facebook} target="_blank">Facebook</Link>}
              {user.twitter && <Link href={user.twitter} target="_blank">Twitter</Link>}
              {user.instagram && <Link href={user.instagram} target="_blank">Instagram</Link>}
              {user.linkedIn && <Link href={user.linkedIn} target="_blank">LinkedIn</Link>}
              {user.gitHub && <Link href={user.gitHub} target="_blank">GitHub</Link>}
            </div>
          </Col>
        </Row>

        <Divider />

        {/* Resume Section */}
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
      </Card>

      {/* Modal for Editing Profile */}
      <Modal title="Edit Profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="About Me" name="aboutMe">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Resume URL" name="resumeUrl">
            <Input />
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
    </div>
  );
}

export default Profile;