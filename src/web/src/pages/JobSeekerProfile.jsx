import React, { useState, useEffect } from "react";
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
} from "antd";
import Swal from "sweetalert2";
import styles from "./styles/Profile.module.css";
import { setUser, updateJobSeekerInfo } from "../store/slices/userSlice";
import { addSkill, deleteSkill } from '../store/slices/skillsSlice';
import { addEducation, deleteEducation } from '../store/slices/educationSlice';
import { addExperience, deleteExperience } from '../store/slices/experienceSlice';

const { Title, Paragraph, Text, Link } = Typography;

function Profile() {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.skills);
  const { educations } = useSelector((state) => state.education);
  const { experiences } = useSelector((state) => state.experience);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [form] = Form.useForm();

  const handleEdit = () => {
    setIsModalOpen(true);
    setActiveModal("editProfile");
  };
  
  useEffect(() => {
    if (isModalOpen && activeModal === "editProfile" && user) {
      // Delay setting fields to ensure modal renders
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
  }, [isModalOpen, activeModal, user]);

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

  const handleAddSkill = async (formData) => {
    try {
      console.log(formData);
      const skillResponse = await dispatch(
        addSkill({
          jobSeekerId: user.id,
          title: formData.title,
          description: formData.description,
          skillType: formData.skillType,
        })
      );
  
      if (skillResponse.meta.requestStatus === "fulfilled") {
        dispatch(setUser({ ...user, skills: [...user.skills, skillResponse.payload] }));
        Swal.fire({
          title: "Success!",
          text: "Skill added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add skill. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  
  const handleAddEducation = async (data) => {
    try {
      const educationResponse = await dispatch(addEducation({ ...data, jobSeekerId: user.id }));
      if (educationResponse.meta.requestStatus === "fulfilled") {
        dispatch(setUser({ ...user, educations: [...user.educations, data] }));
        Swal.fire({
          title: "Success!",
          text: "Education added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add education. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  
  const handleAddExperience = async (data) => {
    try {
      const experienceResponse = await dispatch(addExperience({ ...data, jobSeekerId: user.id }));
      if (experienceResponse.meta.requestStatus === "fulfilled") {
        dispatch(setUser({ ...user, experiences: [...user.experiences, data] }));
        Swal.fire({
          title: "Success!",
          text: "Experience added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add experience. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  

  const handleDeleteSkill = (id) => dispatch(deleteSkill(id));
  const handleDeleteEducation = (id) => dispatch(deleteEducation(id));
  const handleDeleteExperience = (id) => dispatch(deleteExperience(id));
  console.log(user);
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
  console.log(user);
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
        {user.skills.length > 0 ? (
          <Row gutter={[16, 16]}>
            {user.skills.map((skill, i) => (
              <Col xs={24} sm={12} md={8} key={i}>
                <div className={styles.skillBox}>
                  <Paragraph>
                    <Text strong>Title:</Text> {skill.title || "N/A"}
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Description:</Text> {skill.description || "N/A"}
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Type:</Text>{" "}
                    {skill.skillType === "0"
                      ? "Intermediate"
                      : skill.skillType === "1"
                      ? "Average"
                      : "Beginner"}
                  </Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <Paragraph>No skills added yet.</Paragraph>
        )}

        <Divider />

        {/* Experiences Section */}
        {renderSectionHeader("Experience", "Experience")}
        {user.experiences.length > 0 ? (
          <Row gutter={[16, 16]}>
            {user.experiences.map((exp, i) => (
              <Col xs={24} sm={12} md={8} key={i}>
                <div className={styles.experienceBox}>
                  <Paragraph>
                    <Text strong>Job Title:</Text> {exp.title || "N/A"}
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Company:</Text> {exp.company || "N/A"}
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Description:</Text> {exp.description || "N/A"}
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Years:</Text> {exp.years || "N/A"}
                  </Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <Paragraph>No experience added yet.</Paragraph>
        )}

        <Divider />

        {/* Education Section */}
        {renderSectionHeader("Education", "Education")}
        {user.educations.length > 0 ? (
          <Row gutter={[16, 16]}>
            {user.educations.map((edu, i) => (
              <Col xs={24} sm={12} md={8} key={i}>
                <div className={styles.educationBox}>
                  <Paragraph>
                    <Text strong>Degree:</Text> {edu.degree || "N/A"}
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Institution:</Text> {edu.institution || "N/A"}
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Start Year:</Text> {edu.startYear || "N/A"}
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Graduation Year:</Text> {edu.graduationYear || edu.endYear || "N/A"}
                  </Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <Paragraph>No education added yet.</Paragraph>
        )}
      </Card>

      <Modal
      title={
        activeModal === "editProfile"
          ? "Edit Profile"
          : `Add ${activeModal}`
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {activeModal === "editProfile" && (
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
      )}

      {activeModal === "Skill" && (
        <Form form={form} layout="vertical">
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="Skill Type" name="skillType" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="2">Beginner</Select.Option>
              <Select.Option value="1">Average</Select.Option>
              <Select.Option value="0">Intermediate</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      )}

      {activeModal === "Experience" && (
        <Form form={form} layout="vertical">
          <Form.Item label="Job Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Company" name="company" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="Years" name="years" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      )}


        {activeModal === "Education" && (
          <Form form={form} layout="vertical">
            <Form.Item label="Institution" name="institution" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Degree" name="degree">
              <Input />
            </Form.Item>
            <Form.Item label="Start Year" name="startYear" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Graduation Year" name="graduationYear" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Form>
        )}


    </Modal>

    </div>
  );
}

export default Profile;