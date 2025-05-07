import React, { useState } from "react";
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
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { updateEmployerInfo } from "../store/slices/userSlice";
import styles from "./styles/EmployerProfile.module.css";

const { Title, Paragraph, Text, Link } = Typography;

function EmployerProfile() {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const handleEdit = () => {
    form.setFieldsValue(user); // pre-fill form
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      dispatch(updateEmployerInfo({ employerId: user.id, data: values }));
      setIsModalOpen(false);
    });
  };

  return (
    <div className={styles.profileContainer}>
      <Card className={styles.profileCard}>
        {/* Edit Icon */}
        <Tooltip title={`Update Information`}>
        <div style={{ position: "absolute", top: 60, right: 35,fontSize: "24px", cursor: "pointer" }}>
          <FontAwesomeIcon icon={faPen} onClick={handleEdit} />
        </div>
        </Tooltip>

        {/* Employer Header */}
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={6}>
            <Avatar
              size={120}
              src={user?.profileImageUrl || "https://via.placeholder.com/120"}
              alt={user.companyName || "Company Logo"}
            />
          </Col>
          <Col xs={24} sm={18}>
            <Title level={2}>{user.companyName || "Company Name"}</Title>
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
              {user.facebook && <Link href={user.facebook}>Facebook</Link>}
              {user.twitter && <Link href={user.twitter}>Twitter</Link>}
              {user.instagram && <Link href={user.instagram}>Instagram</Link>}
              {user.linkedIn && <Link href={user.linkedIn}>LinkedIn</Link>}
              {user.gitHub && <Link href={user.gitHub}>GitHub</Link>}
            </div>
          </Col>
        </Row>

        <Divider />

        {/* Job Postings */}
        <Row>
          <Col span={24}>
            <Title level={4}>Job Postings</Title>
            {user.jobPostings && user.jobPostings.length > 0 ? (
              <Row gutter={[16, 16]}>
                {user.jobPostings.map((job) => (
                  <Col xs={24} sm={12} md={8} key={job.id}>
                    <Card hoverable>
                      <Title level={5}>{job.title}</Title>
                      <Paragraph>
                        <Text strong>Location:</Text> {job.location || "N/A"}
                      </Paragraph>
                      <Paragraph>
                        <Text strong>Type:</Text> {job.eType === 1 ? "Full-Time" : "Part-Time"}
                      </Paragraph>
                      <Paragraph>
                        <Text strong>Applicants:</Text> {job.applicantCount || 0}
                      </Paragraph>
                      <Button type="primary" href={`/jobs/${job.id}`}>
                        View Job
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Paragraph>No job postings available.</Paragraph>
            )}
          </Col>
        </Row>
      </Card>

      {/* Edit Modal */}
      <Modal
        title="Edit Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="First Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="surname" label="Last Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="companyName" label="Company Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="industry" label="Industry">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="profileImageUrl" label="Profile Image URL">
            <Input />
          </Form.Item>
          <Form.Item name="linkedIn" label="LinkedIn">
            <Input />
          </Form.Item>
          <Form.Item name="gitHub" label="GitHub">
            <Input />
          </Form.Item>
          <Form.Item name="twitter" label="Twitter">
            <Input />
          </Form.Item>
          <Form.Item name="facebook" label="Facebook">
            <Input />
          </Form.Item>
          <Form.Item name="instagram" label="Instagram">
            <Input />
          </Form.Item>
          <Form.Item name="websiteUrl" label="Website URL">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EmployerProfile;
