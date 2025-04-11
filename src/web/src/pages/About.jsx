import React from "react";
import { Typography, Row, Col, Card } from "antd";
import { TeamOutlined, SmileOutlined, BulbOutlined } from "@ant-design/icons";
import styles from "./styles/About.module.css";

const { Title, Paragraph } = Typography;

function About() {
  return (
    <div className={styles.aboutContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <Title className={styles.headerTitle}>About Us</Title>
        <Paragraph className={styles.headerSubtitle}>
          We are a team of passionate individuals dedicated to innovation and excellence.
        </Paragraph>
      </div>

      {/* Description Section */}
      <div className={styles.descriptionSection}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.infoCard} hoverable>
              <TeamOutlined className={styles.infoIcon} />
              <Title level={3} className={styles.infoTitle}>Our Team</Title>
              <Paragraph className={styles.infoDescription}>
                A group of talented professionals working together to achieve greatness.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.infoCard} hoverable>
              <SmileOutlined className={styles.infoIcon} />
              <Title level={3} className={styles.infoTitle}>Our Mission</Title>
              <Paragraph className={styles.infoDescription}>
                To deliver exceptional solutions that empower businesses and individuals.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.infoCard} hoverable>
              <BulbOutlined className={styles.infoIcon} />
              <Title level={3} className={styles.infoTitle}>Our Vision</Title>
              <Paragraph className={styles.infoDescription}>
                To be a global leader in innovation and technology.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Team Showcase Section */}
      <div className={styles.teamSection}>
        <Title level={2} className={styles.sectionTitle}>Meet Our Team</Title>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={6}>
            <Card className={styles.teamCard} hoverable>
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className={styles.teamImage}
              />
              <Title level={4} className={styles.teamName}>Alex Johnson</Title>
              <Paragraph className={styles.teamRole}>CTO</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className={styles.teamCard} hoverable>
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className={styles.teamImage}
              />
              <Title level={4} className={styles.teamName}>Samantha Lee</Title>
              <Paragraph className={styles.teamRole}>Product Manager</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className={styles.teamCard} hoverable>
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className={styles.teamImage}
              />
              <Title level={4} className={styles.teamName}>Michael Brown</Title>
              <Paragraph className={styles.teamRole}>Lead Developer</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default About;