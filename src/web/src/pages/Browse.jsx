import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Layout, Input, Button, Row, Col, Card, Checkbox, Select, Spin, Pagination,
  Divider,
} from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../store/slices/jobsSlice";
import styles from "./styles/Browse.module.css";

const { Content, Sider } = Layout;
const { Option } = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

function Browse() {
  const dispatch = useDispatch();
  const { jobs, status, error, totalItems } = useSelector((state) => state.jobs);

  const [filters, setFilters] = useState({
    title: "",
    location: "",
    jobType: [],
  });

  const [pagination, setPagination] = useState({ page: 1, pageSize: 6 });
  const queryRef = useRef({}); // Hold the latest query

  // Initial fetch on mount
  useEffect(() => {
    dispatch(getJobs({ page: 1, pageSize: 6 }));
  }, []);

  // Update queryRef whenever filters or pagination change
  useEffect(() => {
    const newQuery = {
      title: filters.title,
      location: filters.location,
      jobType: filters.jobType.find((type) => type !== "Remote"),
      isRemote: filters.jobType.includes("Remote"),
      page: pagination.page,
      pageSize: pagination.pageSize,
    };
    queryRef.current = newQuery;
  }, [filters, pagination]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    const newQuery = {
      title: filters.title,
      location: filters.location,
      jobType: filters.jobType.find((type) => type !== "Remote"),
      isRemote: filters.jobType.includes("Remote"),
      page: 1,
      pageSize: pagination.pageSize,
    };
    queryRef.current = newQuery;
    setPagination((prev) => ({ ...prev, page: 1 }));
    dispatch(getJobs(newQuery));
  };

  const clearFilters = () => {
    const reset = { page: 1, pageSize: 6 };
    setFilters({ title: "", location: "", jobType: [] });
    setPagination(reset);
    queryRef.current = reset;
    dispatch(getJobs(reset));
  };

  const handlePageChange = (page, pageSize) => {
    const updatedQuery = { ...queryRef.current, page, pageSize };
    setPagination({ page, pageSize });
    dispatch(getJobs(updatedQuery));
  };
console.log(jobs, "jobs")
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
        </div>

        <Layout>
          {/* Sidebar for Filters */}
          <Sider width={300} className={styles.sidebar}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Enter Your Dream Job</h3>
              <Input
                placeholder="Enter Title, Keywords, or Company"
                value={filters.title}
                onChange={(e) => handleFilterChange("title", e.target.value)}
              />
            </div>
            
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Location</h3>
              <Input
                placeholder="Enter location"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Employment Type</h3>
              <Checkbox.Group
                options={[
                  "Full-Time",
                  "Part-Time",
                  "Contract",
                  "Internship",
                  "Remote",
                  "Hybrid",
                ]}
                value={filters.jobType.map((type) => Object.keys(employmentTypeMap).find((key) => employmentTypeMap[key] === type))}
                onChange={(value) => handleFilterChange("jobType", value)}
              />
            </div>

            <div className={styles.filterSection}>
              <Button
                type="primary"
                onClick={handleApplyFilters} // Trigger dispatch when button is clicked
                className={styles.applyButton}
              >
                Apply Filters
              </Button>
              <Button
                type="default"
                onClick={clearFilters}
                className={styles.clearButton}
              >
                Clear Filters
              </Button>
            </div>
          </Sider>

          {/* Job Listings */}
          <Content className={styles.jobList}>
            {status === "loading" ? (
              <div className={styles.loadingContainer}>
                <Spin indicator={antIcon} />
                <p className={styles.loadingText}>Loading jobs...</p>
              </div>
            ) : status === "failed" ? (
              <p>Error: {error}</p>
            ) : (
              <>
                <Row gutter={[16, 16]}>
                  {jobs.map((job) => (
                    <Col span={24} key={job.id}>
                      <Link to={`/browse/${job.id}`}>
                        <Card className={styles.jobCard} hoverable>
                          <h3 className={styles.jobTitle}>{job.title}</h3>
                          <p className={styles.jobLocation}>{job.location}</p>
                          <p className={styles.jobDescription}>{job.description}</p>
                          <Button type="primary" className={styles.applyButton}>
                            See Details
                          </Button>
                        </Card>
                      </Link>
                    </Col>
                  ))}
                  {jobs.length === 0 && (
                    <Col span={24}>
                      <p>No jobs found.</p>
                    </Col>
                  )}
                </Row>

                <div className={styles.paginationContainer}>
                  <Pagination
                    current={pagination.page}
                    pageSize={pagination.pageSize}
                    total={totalItems}
                    onChange={handlePageChange}
                    showSizeChanger
                    pageSizeOptions={["6", "10", "20"]}
                  />
                </div>
              </>
            )}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default Browse;
