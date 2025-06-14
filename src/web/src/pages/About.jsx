import React from "react";
import { Typography, Row, Col, Card, Divider } from "antd";
import { TeamOutlined, SmileOutlined, BulbOutlined, StarFilled } from "@ant-design/icons";
import styles from "./styles/About.module.css";
import emir from "../assets/emir.jpg"
import berke from "../assets/berke.jpg"

const { Title, Paragraph, Text } = Typography;

function About() {
  return (
    <div className={styles.aboutContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <Title className={styles.headerTitle}>About Logic</Title>
        <Paragraph className={styles.headerSubtitle}>
          <span style={{ fontWeight: 500, color: "#1976d2" }}>
            Empowering Careers, Connecting Talent.
          </span>
        </Paragraph>
      </div>

      {/* Description Section */}
      <div className={styles.descriptionSection}>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.infoCard} hoverable>
              <TeamOutlined className={styles.infoIcon} />
              <Title level={3} className={styles.infoTitle}>Our Team</Title>
              <Paragraph className={styles.infoDescription}>
                We are a group of passionate software engineers and innovators, dedicated to building a smarter, more connected job platform for everyone.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.infoCard} hoverable>
              <SmileOutlined className={styles.infoIcon} />
              <Title level={3} className={styles.infoTitle}>Our Mission</Title>
              <Paragraph className={styles.infoDescription}>
                To deliver exceptional solutions that empower job seekers and employers, making the hiring process seamless, transparent, and rewarding.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.infoCard} hoverable>
              <BulbOutlined className={styles.infoIcon} />
              <Title level={3} className={styles.infoTitle}>Our Vision</Title>
              <Paragraph className={styles.infoDescription}>
                To be a global leader in career innovation, helping millions find their dream jobs and companies build their dream teams.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      <Divider className={styles.sectionDivider} />

      {/* Values Section */}
      <div className={styles.valuesSection}>
        <Title level={2} className={styles.sectionTitle}>Our Values</Title>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={6}>
            <Card className={styles.valueCard} bordered={false}>
              <StarFilled style={{ color: "#ffd700", fontSize: 32, marginBottom: 8 }} />
              <Title level={4} className={styles.valueTitle}>Integrity</Title>
              <Paragraph className={styles.valueDesc}>
                We believe in honesty, transparency, and always doing the right thing for our users.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className={styles.valueCard} bordered={false}>
              <StarFilled style={{ color: "#43a047", fontSize: 32, marginBottom: 8 }} />
              <Title level={4} className={styles.valueTitle}>Innovation</Title>
              <Paragraph className={styles.valueDesc}>
                We embrace new ideas and technologies to deliver the best experience possible.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className={styles.valueCard} bordered={false}>
              <StarFilled style={{ color: "#1976d2", fontSize: 32, marginBottom: 8 }} />
              <Title level={4} className={styles.valueTitle}>Community</Title>
              <Paragraph className={styles.valueDesc}>
                We foster a supportive environment where everyone can grow and succeed together.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      <Divider className={styles.sectionDivider} />

      {/* Team Showcase Section */}
      <div className={styles.teamSection}>
        <Title level={2} className={styles.sectionTitle}>Meet Our Team</Title>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={6}>
            <Card className={styles.teamCard} hoverable>
              <img
                  src={emir}
                  alt="Emirhan Ataman"
                  className={styles.teamImage}
                  style={{ borderRadius: "50%", width: 120, height: 120, objectFit: "cover", margin: "0 auto" }}
              />
              <Title level={4} className={styles.teamName}>Emirhan Ataman</Title>
              <Paragraph className={styles.teamRole}>Jr. Software Developer</Paragraph>
              <Paragraph className={styles.teamBio}>
                Focused on backend and frontend development, Emirhan is passionate about building scalable and user-friendly applications.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className={styles.teamCard} hoverable>
              <img
                  src={berke}
                  alt="Berke Özeken"
                  className={styles.teamImage}
                  style={{ borderRadius: "50%", width: 120, height: 120, objectFit: "cover", margin: "0 auto" }}
              />
              <Title level={4} className={styles.teamName}>Berke Özeken</Title>
              <Paragraph className={styles.teamRole}>Software Engineering Student</Paragraph>
              <Paragraph className={styles.teamBio}>
                Berke brings fresh ideas and a strong enthusiasm for learning, contributing to both the technical and creative sides of the project.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default About;