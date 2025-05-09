import React from "react";
import { Typography, Space, Input, Row, Col, Button, Carousel } from "antd";
import { useSelector } from "react-redux";
import ComponentCard from "../components/ComponentCard";
import styles from "./styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import feature1 from "../assets/feature1.jpg";
import feature2 from "../assets/feature2.jpg";
import feature3 from "../assets/feature3.jpg";

const { Title, Paragraph } = Typography;

function Home() {
  const { user } = useSelector((state) => state.userSlice);
  const recentJobs = [
    {
      title: "Software Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      description: "Develop and maintain cutting-edge software solutions.",
    },
    {
      title: "Product Manager",
      company: "Innovate Inc.",
      location: "New York, NY",
      description: "Lead product development and strategy for innovative solutions.",
    },
    {
      title: "Data Scientist",
      company: "DataWorks",
      location: "Austin, TX",
      description: "Analyze complex datasets to drive business decisions.",
    },
  ];
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
            <Space.Compact compact>
              <Input
                style={{ width: "60%" }}
                placeholder="Job title, keywords, or company"
                className={styles.searchInput}
                prefix={<FontAwesomeIcon icon={faSearch} />}
              />
              <Input
                style={{ width: "30%" }}
                placeholder="City, state, or zip code"
                className={styles.searchInput}
                prefix={<FontAwesomeIcon icon={faMapMarkerAlt} />}
              />
              <Button type="primary" className={styles.searchButton}>
                Find Jobs
              </Button>
            </Space.Compact>

          </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {/* Recent Jobs Carousel */}
      <div className={styles.carouselSection}>
        <Title level={2} className={styles.carouselTitle}>
          Recent Jobs
        </Title>
        <Carousel autoplay className={styles.carousel}>
          {recentJobs.map((job, index) => (
            <div key={index} className={styles.carouselItem}>
              <Title level={4} className={styles.jobTitle}>
                {job.title}
              </Title>
              <Paragraph className={styles.jobCompany}>
                <strong>Company:</strong> {job.company}
              </Paragraph>
              <Paragraph className={styles.jobLocation}>
                <strong>Location:</strong> {job.location}
              </Paragraph>
              <Paragraph className={styles.jobDescription}>
                {job.description}
              </Paragraph>
            </div>
          ))}
        </Carousel>
      </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className={styles.featuresSection}>
        <Title level={2} className={styles.sectionTitle}>
          Why Choose Us?
        </Title>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24}>
            <ComponentCard
              image={feature1}
              title="Cutting-Edge Technology"
              description="Our platform leverages the latest advancements in artificial intelligence, machine learning, and cloud computing to provide you with the best tools for your career growth. Stay ahead of the curve with our innovative solutions."
            />
          </Col>
          <Col xs={24}>
            <ComponentCard
              image={feature2}
              title="Seamless Integration"
              description="Easily integrate our platform into your existing workflows. Whether you're a job seeker or an employer, our tools are designed to work seamlessly with your current systems, saving you time and effort."
              reverse
            />
          </Col>
          <Col xs={24}>
            <ComponentCard
              image={feature3}
              title="Community Support"
              description="Join a vibrant community of professionals, innovators, and creators. Share insights, collaborate on projects, and grow your network with like-minded individuals who are as passionate as you are."
            />
          </Col>
        </Row>
      </div>

      {/* Call-to-Action Section */}
      {user === null && (
        <div className={styles.ctaSection}>
          <Title className={styles.ctaTitle}>Ready to Get Started?</Title>
          <p className={styles.ctaSubtitle}>
            Join us today and be part of the future.
          </p>
          <a href="/signup" className={styles.ctaButton}>
            Sign Up Now
          </a>
        </div>
      )}
    </div>
  );
}

export default Home;