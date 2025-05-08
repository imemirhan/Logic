import React from "react";
import { Button, Typography, Row, Col, Card, Input } from "antd";
import { RocketOutlined, CloudOutlined, TeamOutlined } from "@ant-design/icons";
import Testimonial from "../components/Testimonial";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./styles/Home.module.css";

const { Title, Paragraph } = Typography;
function Home() {
const { user } = useSelector((state) => state.userSlice);

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <Title className={styles.heroTitle}>LOGIC</Title>
          <Paragraph className={styles.heroSubtitle}>
            Make the Best Decision for Your Career.
          </Paragraph>
          <div className={styles.searchBar}>
            <Input.Group compact>
              <Input
                style={{ width: "60%" }}
                placeholder="Job title, keywords, or company"
                className={styles.searchInput}
              />
              <Input
                style={{ width: "30%" }}
                placeholder="City, state, or zip code"
                className={styles.searchInput}
              />
              <Button type="primary" className={styles.searchButton}>
                Find Jobs
              </Button>
            </Input.Group>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={styles.featuresSection}>
        <Title level={2} className={styles.sectionTitle}>
          Why Choose Us?
        </Title>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.featureCard} hoverable>
              <RocketOutlined className={styles.featureIcon} />
              <Title level={3} className={styles.featureTitle}>
                Cutting-Edge Technology
              </Title>
              <Paragraph className={styles.featureDescription}>
                Experience the latest advancements in AI, cloud computing, and more.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.featureCard} hoverable>
              <CloudOutlined className={styles.featureIcon} />
              <Title level={3} className={styles.featureTitle}>
                Seamless Integration
              </Title>
              <Paragraph className={styles.featureDescription}>
                Easily integrate our solutions into your existing workflows.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.featureCard} hoverable>
              <TeamOutlined className={styles.featureIcon} />
              <Title level={3} className={styles.featureTitle}>
                Community Support
              </Title>
              <Paragraph className={styles.featureDescription}>
                Join a vibrant community of innovators and creators.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Testimonials Section */}
      <div className={styles.testimonialsSection}>
        <Title level={2} className={styles.sectionTitle}>
          What Our Users Say
        </Title>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Testimonial 
              testimonial="“This platform transformed the way we work. It's sleek, fast, and futuristic.”"
              name="Alex Johnson"
              role="CTO, FutureTech"
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Testimonial 
              testimonial="“The integration was seamless and the support team is top-notch. Highly recommended!”"
              name="Samantha Lee"
              role="Product Manager, InnovateX"
            />
          </Col>
        </Row>
      </div>
      {/* Call-to-Action Section */}
      {user === null && ( // Render only if user is null
        <div className={styles.ctaSection}>
          <Title className={styles.ctaTitle}>Ready to Get Started?</Title>
          <Paragraph className={styles.ctaSubtitle}>
            Join us today and be part of the future.
          </Paragraph>
          <Link to="/signup">
            <Button type="primary" size="large" className={styles.ctaButton}>
              Sign Up Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
