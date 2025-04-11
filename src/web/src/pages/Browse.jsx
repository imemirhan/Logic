import React, { useState } from "react";
import { Layout, Input, Button, Row, Col, Card, Checkbox, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./styles/Browse.module.css";

const { Content, Sider } = Layout;
const { Option } = Select;

function Browse() {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: [],
  });

  const jobOffers = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      description: "Build and maintain user interfaces for web applications.",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "InnovateX",
      location: "New York, NY",
      description: "Develop and maintain server-side logic and APIs.",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Designify",
      location: "Remote",
      description: "Create user-friendly designs and improve user experiences.",
    },
  ];

  const handleSearch = () => {
    console.log("Filters applied:", filters);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Layout className={styles.layout}>
      <Content className={styles.container}>
        {/* Search Bar */}
        <div className={styles.searchBar}>
          <Input
            placeholder="Search for jobs..."
            prefix={<SearchOutlined />}
            value={filters.keyword}
            onChange={(e) => handleFilterChange("keyword", e.target.value)}
            className={styles.searchInput}
          />
          <Button type="primary" onClick={handleSearch} className={styles.searchButton}>
            Search
          </Button>
        </div>

        <Layout>
          {/* Sidebar for Filters */}
          <Sider width={300} className={styles.sidebar}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Location</h3>
              <Input
                placeholder="Enter location"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Job Type</h3>
              <Checkbox.Group
                options={["Full-Time", "Part-Time", "Remote"]}
                value={filters.jobType}
                onChange={(value) => handleFilterChange("jobType", value)}
              />
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Salary Range</h3>
              <Select
                placeholder="Select range"
                style={{ width: "100%" }}
                onChange={(value) => handleFilterChange("salaryRange", value)}
              >
                <Option value="0-50k">$0 - $50k</Option>
                <Option value="50k-100k">$50k - $100k</Option>
                <Option value="100k+">$100k+</Option>
              </Select>
            </div>
          </Sider>

          {/* Job Listings */}
          <Content className={styles.jobList}>
            <Row gutter={[16, 16]}>
              {jobOffers.map((job) => (
                <Col span={24} key={job.id}>
                  <Card className={styles.jobCard} hoverable>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <p className={styles.jobCompany}>{job.company}</p>
                    <p className={styles.jobLocation}>{job.location}</p>
                    <p className={styles.jobDescription}>{job.description}</p>
                    <Button type="primary" className={styles.applyButton}>
                      Apply Now
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default Browse;