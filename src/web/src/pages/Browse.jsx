import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Layout, Input, Button, Row, Col, Card, Checkbox, Spin, Pagination,
} from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../store/slices/jobsSlice";
import BrowseJobItem from "../components/BrowseJobItem";
import styles from "./styles/Browse.module.css";

const { Content, Sider } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;


function Browse() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs, status, error, totalItems } = useSelector((state) => state.jobs);

  // Parse URL query on first mount
  const queryParams = new URLSearchParams(location.search);
  const initialFilters = {
    title: queryParams.get("title") || "",
    location: queryParams.get("location") || "",
    jobType: queryParams.get("jobType") ? queryParams.get("jobType").split(",") : [],
  };

  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    page: Number(queryParams.get("page")) || 1,
    pageSize: Number(queryParams.get("pageSize")) || 6,
  });

  useEffect(() => {
    dispatch(getJobs({
      title: filters.title,
      location: filters.location,
      jobType: filters.jobType.find(type => type !== "Remote"),
      isRemote: filters.jobType.includes("Remote"),
      page: pagination.page,
      pageSize: pagination.pageSize,
    }));
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (filters.title) params.set("title", filters.title);
    if (filters.location) params.set("location", filters.location);
    if (filters.jobType.length) params.set("jobType", filters.jobType.join(","));
    params.set("page", "1");
    params.set("pageSize", pagination.pageSize.toString());

    navigate(`/browse?${params.toString()}`);
    setPagination((prev) => ({ ...prev, page: 1 }));

    dispatch(getJobs({
      ...filters,
      jobType: filters.jobType.find((type) => type !== "Remote"),
      isRemote: filters.jobType.includes("Remote"),
      page: 1,
      pageSize: pagination.pageSize,
    }));
  };

  const clearFilters = () => {
    const reset = { title: "", location: "", jobType: [] };
    setFilters(reset);
    setPagination({ page: 1, pageSize: 6 });
    navigate(`/browse`);
    dispatch(getJobs({ ...reset, page: 1, pageSize: 6 }));
  };

  const handlePageChange = (page, pageSize) => {
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    params.set("pageSize", pageSize.toString());
    navigate(`/browse?${params.toString()}`);
    setPagination({ page, pageSize });

    dispatch(getJobs({
      title: filters.title,
      location: filters.location,
      jobType: filters.jobType.find(type => type !== "Remote"),
      isRemote: filters.jobType.includes("Remote"),
      page,
      pageSize,
    }));
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
        </div>

        <Layout>
          {/* Sidebar for Filters */}
          <Sider width={300} className={styles.sidebar}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Enter Your Dream Job</h3>
              <Input
                placeholder="Search for jobs..."
                prefix={<SearchOutlined />}
                value={filters.title}
                onChange={(e) => handleFilterChange("title", e.target.value)}
                className={styles.searchInput}
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
                  "Full-Time", "Part-Time", "Contract", "Internship", "Remote", "Hybrid"
                ]}
                value={filters.jobType}
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
                      <BrowseJobItem job={job} />
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
