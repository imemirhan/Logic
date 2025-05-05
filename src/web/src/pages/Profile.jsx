import React from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col, Typography, Avatar, Button, Divider } from "antd";
import styles from "./styles/Profile.module.css";

const { Title, Paragraph, Text, Link } = Typography;

function Profile() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className={styles.profileContainer}>
      <Card className={styles.profileCard}>
        {/* Profile Header */}
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={6}>
            <Avatar
              size={120}
              src={user.profileImageUrl || "https://via.placeholder.com/120"}
              alt={`${user.name} ${user.lastName}`}
            />
          </Col>
          <Col xs={24} sm={18}>
            <Title level={2} className={styles.profileName}>
              {user.name} {user.lastName}
            </Title>
            {user.aboutMe ? (
              <Paragraph className={styles.aboutMe}>{user.aboutMe}</Paragraph>
            ) : (
              <Paragraph className={styles.aboutMe}>No "About Me" information provided.</Paragraph>
            )}
          </Col>
        </Row>

        <Divider />

        {/* Skills Section */}
        <Row>
          <Col span={24}>
            <Title level={4}>Skills</Title>
            {user.skills && user.skills.length > 0 ? (
              <div className={styles.skills}>
                {user.skills.map((skill, index) => (
                  <Tag key={index} className={styles.skillTag}>
                    {skill}
                  </Tag>
                ))}
              </div>
            ) : (
              <Paragraph>No skills added yet.</Paragraph>
            )}
          </Col>
        </Row>

        <Divider />

        {/* Experiences Section */}
        <Row>
          <Col span={24}>
            <Title level={4}>Experiences</Title>
            {user.experiences && user.experiences.length > 0 ? (
              <ul className={styles.experienceList}>
                {user.experiences.map((experience, index) => (
                  <li key={index}>
                    <Text strong>{experience.title}</Text> at {experience.company} (
                    {experience.startDate} - {experience.endDate || "Present"})
                  </li>
                ))}
              </ul>
            ) : (
              <Paragraph>No experiences added yet.</Paragraph>
            )}
          </Col>
        </Row>

        <Divider />

        {/* Education Section */}
        <Row>
          <Col span={24}>
            <Title level={4}>Education</Title>
            {user.educations && user.educations.length > 0 ? (
              <ul className={styles.educationList}>
                {user.educations.map((education, index) => (
                  <li key={index}>
                    <Text strong>{education.degree}</Text> from {education.institution} (
                    {education.startDate} - {education.endDate || "Present"})
                  </li>
                ))}
              </ul>
            ) : (
              <Paragraph>No education history added yet.</Paragraph>
            )}
          </Col>
        </Row>

        <Divider />

        {/* Social Media Links */}
        <Row>
          <Col span={24}>
            <Title level={4}>Social Media</Title>
            <div className={styles.socialLinks}>
              {user.facebook && (
                <Link href={user.facebook} target="_blank">
                  Facebook
                </Link>
              )}
              {user.twitter && (
                <Link href={user.twitter} target="_blank">
                  Twitter
                </Link>
              )}
              {user.instagram && (
                <Link href={user.instagram} target="_blank">
                  Instagram
                </Link>
              )}
              {user.linkedIn && (
                <Link href={user.linkedIn} target="_blank">
                  LinkedIn
                </Link>
              )}
              {user.gitHub && (
                <Link href={user.gitHub} target="_blank">
                  GitHub
                </Link>
              )}
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
    </div>
  );
}

export default Profile;