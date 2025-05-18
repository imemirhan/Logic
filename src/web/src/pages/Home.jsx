import React from "react";
import { Typography, Space, Input, Row, Col, Button, Carousel } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../store/slices/jobsSlice";
import { useSelector, useDispatch } from "react-redux";
import ComponentCard from "../components/ComponentCard";
import styles from "./styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkerAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import feature1 from "../assets/feature1.jpg";
import feature2 from "../assets/feature2.jpg";
import feature3 from "../assets/feature3.jpg";

const { Title, Paragraph } = Typography;

function Home() {
   const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (title) queryParams.append("title", title);
    if (location) queryParams.append("location", location);
    dispatch(getJobs({
      title,
      location,
    }));

    // Optionally, navigate to browse page with the query string
    navigate(`/browse?${queryParams.toString()}`);
  };
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                prefix={<FontAwesomeIcon icon={faSearch} />}
              />
              <Input
                style={{ width: "30%" }}
                placeholder="City, state, or zip code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                prefix={<FontAwesomeIcon icon={faMapMarkerAlt} />}
              />
              <Button type="primary" onClick={handleSearch} className={styles.searchButton}>
                Find Jobs
              </Button>
            </Space.Compact>

          </div>
            <br />
            <br />
            <br />
            <br />
            {user?.role === 1 && (
              <div style={{ marginTop: 24, textAlign: "center" }}>
                <Paragraph
                  style={{
                    fontSize: 18,
                    color: "#1a237e",
                    marginBottom: 20,
                    fontWeight: 600,
                    letterSpacing: 0.2,
                    lineHeight: 1.6,
                    background: "linear-gradient(90deg, #e3ffe8 0%, #f7faff 100%)",
                    borderRadius: 8,
                    padding: "18px 24px",
                    display: "inline-block",
                    boxShadow: "0 2px 12px 0 rgba(30, 136, 229, 0.08)"
                  }}
                >
                  🚀 <span style={{ color: "#43a047" }}>Ready to grow your team and shape the future?</span> <br />
                  <span style={{ color: "#1565c0" }}>
                    Post your job opening and connect with talented professionals eager to make an impact.<br />
                    <span style={{ color: "#ff9800", fontWeight: 700 }}>Your next great hire could be just a click away!</span>
                  </span>
                </Paragraph>
                <Button
                  type="dashed"
                  size="large"
                  onClick={() => navigate("/createjob")}
                  icon={<FontAwesomeIcon icon={faPlus} />}
                  style={{
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    background: "linear-gradient(90deg, #e3ffe8 0%, #f7faff 100%)",
                    border: "1.5px solid #43a047",
                    color: "#1565c0"
                  }}
                >
                  Create a New Job Posting
                </Button>
              </div>
            )}
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