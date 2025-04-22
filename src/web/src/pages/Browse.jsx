import React, { useState, useEffect } from "react";
import { Layout, Input, Button, Row, Col, Card, Checkbox, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../store/slices/jobsSlice"; // Import the async thunk to fetch jobs
import styles from "./styles/Browse.module.css";

const { Content, Sider } = Layout;
const { Option } = Select;

function Browse() {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: [],
  });

  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getJobs()); // Fetch jobs when component mounts
  }, [dispatch]);

  const handleSearch = () => {
    console.log("Filters applied:", filters);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  let jobsArray = [];

if (Array.isArray(jobs)) {
  if (typeof jobs[0] === "object" && !Array.isArray(jobs[0])) {
    jobsArray = Object.values(jobs[0]);
  } else {
    jobsArray = jobs;
  }
} else if (typeof jobs === "object") {
  jobsArray = Object.values(jobs);
}


const filteredJobs = jobsArray.filter((job) => {
  const keywordMatch =
    !filters.keyword ||
    job.title?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
    job.description?.toLowerCase().includes(filters.keyword.toLowerCase());

  const locationMatch =
    !filters.location ||
    job.location?.toLowerCase().includes(filters.location.toLowerCase());

  const jobTypeMatch =
    filters.jobType.length === 0 ||
    filters.jobType.some((type) => {
      if (type === "Remote") return job.isRemote;
      return job.etype?.toLowerCase().includes(type.toLowerCase());
    });

  return keywordMatch && locationMatch && jobTypeMatch;
});


  // Log the filtered jobs
  console.log("Filtered Jobs:", filteredJobs);
  console.log("Jobs:", jobs);

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
            {status === "loading" ? (
              <p>Loading jobs...</p>
            ) : status === "failed" ? (
              <p>Error: {error}</p>
            ) : (
              <Row gutter={[16, 16]}>
                {Object.values(filteredJobs).map((job, index) => (
                  <Col span={24} key={job.id || index}>
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
                {filteredJobs.length === 0 && (
                  <Col span={24}>
                    <p>No jobs found.</p>
                  </Col>
                )}

              </Row>
            )}
          </Content>

        </Layout>
      </Content>
    </Layout>
  );
}

export default Browse;