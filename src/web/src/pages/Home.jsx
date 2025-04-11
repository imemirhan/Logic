import React from "react";
import { Button, Typography, Row, Col, Card } from "antd"; 
import { RocketOutlined, CloudOutlined, TeamOutlined } from "@ant-design/icons";
import Testimonial from "../components/Testimonial"; // Import the Testimonial component
import styles from "./styles/Home.module.css";

const { Title, Paragraph } = Typography;

function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <Title className={styles.heroTitle}>Welcome to the Future</Title>
          <Paragraph className={styles.heroSubtitle}>
            Discover the next generation of innovation and technology. Join us to explore endless possibilities.
          </Paragraph>
          <Button type="primary" size="large" className={styles.heroButton}>
            Get Started
          </Button>
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
      <div className={styles.ctaSection}>
        <Title className={styles.ctaTitle}>Ready to Get Started?</Title>
        <Paragraph className={styles.ctaSubtitle}>
          Join us today and be part of the future.
        </Paragraph>
        <Button type="primary" size="large" className={styles.ctaButton}>
          Sign Up Now
        </Button>
      </div>
    </div>
  );
}

export default Home;
